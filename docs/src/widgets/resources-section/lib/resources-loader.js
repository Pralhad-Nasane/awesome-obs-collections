const ResourcesLoader = {
    data: null,
    container: null,
    activeFilter: 'all',
    activeSubcategory: null,
    searchQuery: '',
    sortBy: 'name',

    /**
     * Initialize the resources section
     */
    async init() {
        this.container = document.getElementById('resources-grid');
        if (!this.container) {
            console.log('Resources grid container not found');
            return;
        }

        // Show loading state
        this.showLoading();

        try {
            // Load data from JSON
            await this.loadData();

            // Render initial view
            this.render();

            // Setup filter listeners
            this.setupFilters();

            // Update stats
            this.updateStats();

            // Update sidebar counts dynamically
            this.updateSidebarCounts();

            console.log('Resources loaded:', this.data.resources.length, 'items');
        } catch (error) {
            console.error('Failed to load resources:', error);
            this.showError();
        }
    },

    /**
     * Load resources from JSON file
     */
    async loadData() {
        const response = await fetch('src/entities/resource/data/resources.json');
        if (!response.ok) throw new Error('Failed to fetch resources');
        this.data = await response.json();
    },

    /**
     * Show loading spinner
     */
    showLoading() {
        this.container.innerHTML = `
            <div class="resources-section__loading">
                <div class="resources-section__spinner"></div>
            </div>
        `;
    },

    /**
     * Show error state
     */
    showError() {
        this.container.innerHTML = `
            <div class="resources-section__empty">
                <div class="resources-section__empty-icon">⚠️</div>
                <p>Failed to load resources. Please try again.</p>
            </div>
        `;
    },

    /**
     * Render resource cards
     */
    render() {
        const resources = this.getFilteredResources();

        if (resources.length === 0) {
            this.container.innerHTML = `
                <div class="resources-section__empty">
                    <div class="resources-section__empty-icon">📦</div>
                    <p>No resources found in this category.</p>
                </div>
            `;
            return;
        }

        this.container.innerHTML = resources.map(resource => this.createCard(resource)).join('');
    },

    /**
     * Get filtered resources based on active filter AND search query
     */
    getFilteredResources() {
        let resources = this.data.resources;

        // Apply category filter
        if (this.activeFilter === 'featured') {
            resources = resources.filter(r => r.featured);
        } else if (this.activeFilter !== 'all') {
            resources = resources.filter(r => r.category === this.activeFilter);
        }

        // Apply subcategory filter
        if (this.activeSubcategory) {
            resources = resources.filter(r => r.subcategory === this.activeSubcategory);
        }

        // Apply search filter
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            resources = resources.filter(r =>
                r.name.toLowerCase().includes(query) ||
                r.description.toLowerCase().includes(query) ||
                r.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Apply sorting
        switch (this.sortBy) {
            case 'stars':
                resources = [...resources].sort((a, b) => (b.stars || 0) - (a.stars || 0));
                break;
            case 'updated':
                resources = [...resources].sort((a, b) =>
                    new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0)
                );
                break;
            case 'name':
            default:
                resources = [...resources].sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return resources;
    },

    /**
     * Create a resource card HTML
     */
    createCard(resource) {
        const category = this.data.categories.find(c => c.id === resource.category);
        const starsFormatted = resource.stars > 1000
            ? (resource.stars / 1000).toFixed(1) + 'k'
            : resource.stars;
        const lastUpdated = this.formatDate(resource.lastUpdated);

        return `
            <article class="resource-card ${resource.featured ? 'resource-card--featured' : ''}" 
                     data-id="${resource.id}"
                     onclick="window.open('${resource.url}', '_blank')">
                <div class="resource-card__header">
                    <div class="resource-card__icon resource-card__icon--${resource.category}">
                        ${this.getCategoryIcon(resource.category)}
                    </div>
                    <div class="resource-card__title-group">
                        <h3 class="resource-card__title">${resource.name}</h3>
                        <span class="resource-card__author">by ${resource.author}</span>
                    </div>
                </div>
                
                <p class="resource-card__description">${resource.description}</p>
                
                <div class="resource-card__tags">
                    ${resource.tags.slice(0, 3).map(tag => `
                        <span class="resource-card__tag">${tag}</span>
                    `).join('')}
                </div>
                
                <div class="resource-card__footer">
                    <div class="resource-card__meta">
                        ${resource.stars > 0 ? `
                            <span class="resource-card__stat">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                ${starsFormatted}
                            </span>
                        ` : ''}
                        <span class="resource-card__date">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            ${lastUpdated}
                        </span>
                    </div>
                    <div class="resource-card__repo">
                        ${this.getRepoIcon(resource.repoType)}
                    </div>
                </div>
                
                <a href="${resource.url}" target="_blank" class="resource-card__link" onclick="event.stopPropagation()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                </a>
            </article>
        `;
    },

    /**
     * Format date to relative time
     */
    formatDate(dateStr) {
        if (!dateStr) return 'Unknown';
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays < 7) return `${diffDays}d ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
        return `${Math.floor(diffDays / 365)}y ago`;
    },

    /**
     * Get repository type icon
     */
    getRepoIcon(repoType) {
        const icons = {
            github: '<svg class="resource-card__repo-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
            gitlab: '<svg class="resource-card__repo-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/></svg>',
            docs: '<svg class="resource-card__repo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
        };
        return icons[repoType] || icons.github;
    },

    /**
     * Get category icon SVG
     */
    getCategoryIcon(category) {
        const icons = {
            plugins: '<svg viewBox="0 0 24 24"><path d="M20 11V8c0-1-1-2-2-2h-3V5c0-1.6-1.3-3-3-3s-3 1.4-3 3v1H6c-1 0-2 1-2 2v3c1.6 0 3 1.3 3 3s-1.4 3-3 3v3c0 1 1 2 2 2h3c0-1.6 1.3-3 3-3s3 1.4 3 3h3c1 0 2-1 2-2v-3c-1.6 0-3-1.3-3-3s1.4-3 3-3z"/></svg>',
            scripts: '<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
            tools: '<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
            themes: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20 4 4 0 0 0 0-8 2 2 0 0 1 0-4 10 10 0 0 0 0-8z"/></svg>',
            guides: '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
        };
        return icons[category] || icons.plugins;
    },

    /**
     * Get platform icons
     */
    getPlatformIcons(platforms) {
        const allPlatforms = ['windows', 'mac', 'linux'];
        return allPlatforms.map(p => `
            <span class="resource-card__platform ${platforms.includes(p) ? 'resource-card__platform--active' : ''}" title="${p}">
                ${this.getPlatformIcon(p)}
            </span>
        `).join('');
    },

    getPlatformIcon(platform) {
        const icons = {
            windows: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.5l9.9-1.4v9.6H0V3.5zm11 10.7l.1-9.8 8.9-1.3v11.1h-9zm0 1l-.1 9.5 9 1.3v-10.8h-8.9zm-11-1v8.1l9.9 1.4v-9.5H0z"/></svg>',
            mac: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.7 19.5c-.8 1.8-1.7 3.5-3 3.5s-1.6-.6-3.1-.6-2 .6-3.1.6c-1.4 0-2.3-1.7-3.1-3.5C5 16.3 4 12.5 5.5 9.8c.8-1.4 2.2-2.3 3.7-2.3 1.2 0 2.4.8 3.1.8s2-.9 3.3-.8c.6 0 2.2.2 3.3 1.9-.1.1-2 1.2-2 3.6 0 2.9 2.5 3.9 2.6 3.9-.1 0-.4 1.3-1.8 2.6zM13 3.5c.6-.8 1.6-1.4 2.4-1.5.1 1-.3 2-1 2.8-.6.8-1.5 1.4-2.4 1.4-.1-.9.4-1.9 1-2.7z"/></svg>',
            linux: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.5 2c-1.6 0-2.9 1.3-2.9 2.9 0 .3 0 .5.1.8-.7.4-1.2 1.2-1.2 2.1 0 .6.2 1.2.6 1.7-.3.5-.5 1.1-.5 1.7 0 1.5 1 2.8 2.4 3.1-.1.4-.2.8-.2 1.2 0 2 1.6 3.6 3.7 3.6s3.7-1.6 3.7-3.6c0-.4-.1-.8-.2-1.2 1.4-.4 2.4-1.6 2.4-3.1 0-.6-.2-1.2-.5-1.7.4-.5.6-1.1.6-1.7 0-.9-.5-1.7-1.2-2.1.1-.3.1-.5.1-.8 0-1.6-1.3-2.9-2.9-2.9z"/></svg>'
        };
        return icons[platform] || '';
    },

    /**
     * Setup sidebar category filters
     */
    setupFilters() {
        // Sidebar category buttons (not parent items that expand)
        const sidebarItems = document.querySelectorAll('.resources-section__sidebar-item:not(.resources-section__sidebar-item--parent)');
        sidebarItems.forEach(btn => {
            btn.addEventListener('click', () => {
                this.activeFilter = btn.dataset.category;
                this.activeSubcategory = null;

                // Update active state
                this.clearActiveStates();
                btn.classList.add('resources-section__sidebar-item--active');

                // Re-render and scroll to grid
                this.render();
                this.scrollToGrid();
            });
        });

        // Parent items (toggle expand/collapse AND filter)
        const parentItems = document.querySelectorAll('.resources-section__sidebar-item--parent');
        parentItems.forEach(btn => {
            btn.addEventListener('click', () => {
                const group = btn.closest('.resources-section__sidebar-group');

                // Toggle expand
                group.classList.toggle('resources-section__sidebar-group--expanded');

                // Also filter to this category
                this.activeFilter = btn.dataset.category;
                this.activeSubcategory = null;

                // Update active state
                this.clearActiveStates();
                btn.classList.add('resources-section__sidebar-item--active');

                // Re-render and scroll to grid
                this.render();
                this.scrollToGrid();
            });
        });

        // Subcategory items
        const subItems = document.querySelectorAll('.resources-section__sidebar-subitem');
        subItems.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();

                // Get subcategory and parent category
                this.activeSubcategory = btn.dataset.subcategory;
                const group = btn.closest('.resources-section__sidebar-group');
                this.activeFilter = group.dataset.group;

                // Update active state
                this.clearActiveStates();
                btn.classList.add('resources-section__sidebar-subitem--active');

                // Re-render and scroll to grid
                this.render();
                this.scrollToGrid();
            });
        });

        // Search input
        const searchInput = document.getElementById('resources-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.trim();
                this.render();
            });
        }

        // Sort dropdown
        const sortSelect = document.getElementById('resources-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.render();
            });
        }
    },

    /**
     * Clear all active states from sidebar
     */
    clearActiveStates() {
        document.querySelectorAll('.resources-section__sidebar-item').forEach(b =>
            b.classList.remove('resources-section__sidebar-item--active'));
        document.querySelectorAll('.resources-section__sidebar-subitem').forEach(b =>
            b.classList.remove('resources-section__sidebar-subitem--active'));
    },

    /**
     * Scroll to the resources grid smoothly
     */
    scrollToGrid() {
        const grid = document.querySelector('.resources-section__grid');
        if (grid) {
            const offset = 120; // Account for navbar height
            const top = grid.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    },

    /**
     * Update stats display
     */
    updateStats() {
        const totalEl = document.getElementById('stat-total');
        const starsEl = document.getElementById('stat-stars');

        if (totalEl) totalEl.textContent = this.data.resources.length;

        if (starsEl) {
            const totalStars = this.data.resources.reduce((sum, r) => sum + (r.stars || 0), 0);
            starsEl.textContent = totalStars > 1000
                ? (totalStars / 1000).toFixed(1) + 'k'
                : totalStars;
        }
    },

    /**
     * Update sidebar category counts dynamically
     */
    updateSidebarCounts() {
        const counts = {};
        this.data.resources.forEach(r => {
            counts[r.category] = (counts[r.category] || 0) + 1;
        });
        counts['all'] = this.data.resources.length;
        counts['featured'] = this.data.resources.filter(r => r.featured).length;

        document.querySelectorAll('.resources-section__sidebar-item').forEach(item => {
            const category = item.dataset.category;
            const countEl = item.querySelector('.resources-section__sidebar-count');
            if (countEl && counts[category] !== undefined) {
                countEl.textContent = counts[category];
            }
        });
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    ResourcesLoader.init();
});

// Export for external use
window.ResourcesLoader = ResourcesLoader;
