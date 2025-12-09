class NavbarController {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navbarSearch = document.getElementById('navbar-search');
        this.navbarSearchInput = document.getElementById('navbar-search-input');
        this.navbarSort = document.getElementById('navbar-sort');
        this.resourcesSearch = document.getElementById('resources-search');
        this.resourcesSort = document.getElementById('resources-sort');
        this.resourcesSection = document.getElementById('resources');

        if (this.navbar) {
            this.setupScrollEffects();
            this.setupSearchSync();
            this.setupSortSync();
        }
    }

    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            // Toggle scrolled class
            this.navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);

            // Show/hide navbar search based on resources section position
            if (this.resourcesSection && this.navbarSearch) {
                const sectionTop = this.resourcesSection.offsetTop;
                const showThreshold = sectionTop - 150;

                if (window.scrollY > showThreshold) {
                    this.navbarSearch.classList.add('navbar__search--visible');
                } else {
                    this.navbarSearch.classList.remove('navbar__search--visible');
                }
            }
        }, { passive: true });
    }

    setupSearchSync() {
        if (this.navbarSearchInput && this.resourcesSearch) {
            this.navbarSearchInput.addEventListener('input', (e) => {
                this.resourcesSearch.value = e.target.value;
                this.resourcesSearch.dispatchEvent(new Event('input'));
            });

            this.resourcesSearch.addEventListener('input', (e) => {
                this.navbarSearchInput.value = e.target.value;
            });
        }
    }

    setupSortSync() {
        if (this.navbarSort && this.resourcesSort) {
            this.navbarSort.addEventListener('change', (e) => {
                this.resourcesSort.value = e.target.value;
                this.resourcesSort.dispatchEvent(new Event('change'));
            });

            this.resourcesSort.addEventListener('change', (e) => {
                this.navbarSort.value = e.target.value;
            });
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NavbarController();
});
