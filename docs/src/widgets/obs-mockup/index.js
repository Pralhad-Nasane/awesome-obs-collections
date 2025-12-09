// Export styles path for reference
export const styles = './ui/OBSMockup.css';

// Export initialization function
export function initOBSMockup() {
    const mockup = document.querySelector('.obs-mockup');
    if (!mockup) return null;

    // Add hover effect listener
    mockup.addEventListener('mouseenter', () => {
        mockup.style.transform = 'translateY(-50%) perspective(1200px) rotateY(-8deg) rotateX(2deg) scale(0.80)';
    });

    mockup.addEventListener('mouseleave', () => {
        mockup.style.transform = 'translateY(-50%) perspective(1200px) rotateY(-10deg) rotateX(3deg) scale(0.78)';
    });

    return mockup;
}

export default initOBSMockup;
