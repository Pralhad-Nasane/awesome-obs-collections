export class Navbar {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.scrollThreshold = 50;
        this.init();
    }

    init() {
        if (!this.navbar) return;

        this.bindEvents();
        this.checkScroll();
    }

    bindEvents() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        requestAnimationFrame(() => this.checkScroll());
    }

    checkScroll() {
        const isScrolled = window.scrollY > this.scrollThreshold;
        this.navbar.classList.toggle('navbar--scrolled', isScrolled);
    }
}

// Export factory function
export function initNavbar() {
    return new Navbar();
}

export default Navbar;
