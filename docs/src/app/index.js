// Import widgets
import { initNavbar } from '../widgets/navbar/index.js';
import { initHeroSection } from '../widgets/hero-section/index.js';
import { initOBSMockup } from '../widgets/obs-mockup/index.js';

// Application initialization
class App {
    constructor() {
        this.widgets = {};
        this.features = {};
    }

    init() {
        console.log('🚀 OBSverse App initialized');

        // Initialize widgets
        this.widgets.navbar = initNavbar();
        this.widgets.hero = initHeroSection();
        this.widgets.obsMockup = initOBSMockup();

        // Initialize cursor effects (loaded separately for performance)
        this.initCursorEffects();

        console.log('✅ All widgets loaded');
    }

    initCursorEffects() {
        // Only on desktop
        if (window.innerWidth > 1024) {
            // Cursor effects are initialized in their own script
            console.log('🎯 Cursor effects enabled');
        }
    }
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
    window.OBSverseApp = app;
});

export default App;
