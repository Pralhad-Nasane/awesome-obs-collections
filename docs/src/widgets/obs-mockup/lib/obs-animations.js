/**
 * Audio Meter Animation
 * Simulates realistic audio level meters with random fluctuations
 */
const AudioMeterAnimation = {
    meters: [],
    isActive: true,
    frameId: null,

    init() {
        // Get all meter segments
        this.meters = Array.from(document.querySelectorAll('.obs-mixer-meter'));

        if (this.meters.length === 0) {
            console.log('No audio meters found');
            return;
        }

        // Start animation
        this.animate();
        console.log('Audio meter animation initialized');
    },

    animate() {
        if (!this.isActive) return;

        this.meters.forEach((meter, index) => {
            // Random audio level between 20% and 90%
            const baseLevel = 50 + Math.sin(Date.now() / 500 + index) * 30;
            const randomFluctuation = Math.random() * 20 - 10;
            const level = Math.max(20, Math.min(95, baseLevel + randomFluctuation));

            // Get meter segments
            const green = meter.querySelector('.obs-meter-green');
            const yellow = meter.querySelector('.obs-meter-yellow');
            const red = meter.querySelector('.obs-meter-red');

            if (green && yellow && red) {
                // Animate by adjusting opacity based on level
                const greenOpacity = level > 20 ? 1 : 0.3;
                const yellowOpacity = level > 60 ? (level - 60) / 30 : 0.1;
                const redOpacity = level > 85 ? (level - 85) / 15 : 0;

                green.style.opacity = greenOpacity;
                green.style.transform = `scaleX(${Math.min(1, level / 60)})`;
                yellow.style.opacity = yellowOpacity;
                red.style.opacity = redOpacity;
            }
        });

        this.frameId = requestAnimationFrame(() => this.animate());
    },

    destroy() {
        this.isActive = false;
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
        }
    }
};

/**
 * Recording Indicator Animation
 * Blinks the recording dot to simulate active recording
 */
const RecordingIndicator = {
    dot: null,
    timer: null,
    timeDisplay: null,
    seconds: 0,

    init() {
        // Find recording status dot
        this.dot = document.querySelector('.obs-status-dot--rec');
        this.timeDisplay = document.querySelectorAll('.obs-status-item')[1];

        if (!this.dot) {
            console.log('Recording indicator not found');
            return;
        }

        // Start blinking animation
        this.startBlinking();
        // Start timer
        this.startTimer();
        console.log('Recording indicator animation initialized');
    },

    startBlinking() {
        // Add CSS animation for blinking
        this.dot.style.animation = 'recBlink 1s infinite';
        this.dot.style.background = '#ef4444';
    },

    startTimer() {
        this.timer = setInterval(() => {
            this.seconds++;
            this.updateDisplay();
        }, 1000);
    },

    updateDisplay() {
        if (!this.timeDisplay) return;

        const hours = Math.floor(this.seconds / 3600);
        const minutes = Math.floor((this.seconds % 3600) / 60);
        const secs = this.seconds % 60;

        const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        // Update the second status item (recording time)
        const statusItems = document.querySelectorAll('.obs-status-item');
        if (statusItems[1]) {
            statusItems[1].innerHTML = `<span class="obs-status-dot obs-status-dot--rec" style="animation: recBlink 1s infinite; background: #ef4444;"></span>${timeStr}`;
        }
    },

    destroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
};

/**
 * CPU/FPS Counter Animation
 * Simulates realistic CPU and FPS fluctuations
 */
const StatusBarAnimation = {
    cpuElement: null,
    fpsElement: null,
    frameId: null,
    isActive: true,

    init() {
        const statusItems = document.querySelectorAll('.obs-status-item');

        // CPU is typically 3rd item, FPS is 4th
        if (statusItems.length >= 4) {
            this.cpuElement = statusItems[2];
            this.fpsElement = statusItems[3];
        }

        if (!this.cpuElement) {
            console.log('Status bar elements not found');
            return;
        }

        this.animate();
        console.log('Status bar animation initialized');
    },

    animate() {
        if (!this.isActive) return;

        // Random CPU between 1% and 5%
        const cpu = (1 + Math.random() * 4).toFixed(1);

        // FPS fluctuating around 60
        const fps = (59.5 + Math.random() * 1).toFixed(2);

        if (this.cpuElement) {
            this.cpuElement.textContent = `CPU: ${cpu}%`;
        }

        if (this.fpsElement) {
            this.fpsElement.textContent = `${fps} / 60.00 FPS`;
        }

        // Update every 500ms
        setTimeout(() => {
            this.frameId = requestAnimationFrame(() => this.animate());
        }, 500);
    },

    destroy() {
        this.isActive = false;
    }
};

/**
 * Mockup Hover Effect
 * Provides subtle 3D hover interaction on the mockup
 */
const MockupHoverEffect = {
    mockup: null,
    defaultTransform: 'translateY(-50%) perspective(1200px) rotateY(-10deg) rotateX(3deg) scale(0.95)',
    hoverTransform: 'translateY(-50%) perspective(1200px) rotateY(-8deg) rotateX(2deg) scale(0.97)',

    init() {
        this.mockup = document.querySelector('.obs-mockup');
        if (!this.mockup) return;

        this.mockup.addEventListener('mouseenter', () => {
            this.mockup.style.transform = this.hoverTransform;
        });

        this.mockup.addEventListener('mouseleave', () => {
            this.mockup.style.transform = this.defaultTransform;
        });

        console.log('Mockup hover effect initialized');
    }
};

/**
 * Plugin Carousel Animation
 * Rotates through featured plugins in the Sources panel
 */
const PluginCarousel = {
    items: [],
    currentIndex: 0,
    intervalId: null,
    interval: 3000, // 3 seconds

    init() {
        this.items = Array.from(document.querySelectorAll('.obs-plugin-item'));
        if (this.items.length === 0) return;

        // Start carousel
        this.start();
        console.log('Plugin carousel initialized');
    },

    start() {
        this.intervalId = setInterval(() => this.next(), this.interval);
    },

    next() {
        // Remove active from current
        this.items[this.currentIndex].classList.remove('obs-plugin-item--active');

        // Move to next
        this.currentIndex = (this.currentIndex + 1) % this.items.length;

        // Add active to new current
        this.items[this.currentIndex].classList.add('obs-plugin-item--active');
    },

    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
};

/**
 * Initialize all OBS animations on DOM ready
 */
function initOBSAnimations() {
    // Only on desktop
    if (window.innerWidth <= 1024) return;

    AudioMeterAnimation.init();
    RecordingIndicator.init();
    StatusBarAnimation.init();
    MockupHoverEffect.init();
    PluginCarousel.init();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initOBSAnimations);

// Export for external use
window.OBSAnimations = {
    AudioMeterAnimation,
    RecordingIndicator,
    StatusBarAnimation,
    MockupHoverEffect,
    PluginCarousel,
    init: initOBSAnimations
};
