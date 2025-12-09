// Export styles path
export const styles = './ui/HeroSection.css';

// Export initialization
export function initHeroSection() {
    const hero = document.querySelector('.hero');
    if (!hero) return null;

    // Initialize floating symbols animation check
    const symbols = hero.querySelectorAll('.hero__symbol');
    console.log(`Hero section initialized with ${symbols.length} floating symbols`);

    return hero;
}

export default initHeroSection;
