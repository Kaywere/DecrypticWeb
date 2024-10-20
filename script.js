document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const iframe = document.querySelector('.iframe-container iframe'); 
    const fullscreenBtn = document.getElementById('fullscreen-btn'); 

    // Splash screen fade-out
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
    }, 3000); 

    splashScreen.addEventListener('animationend', () => {
        splashScreen.style.display = 'none';
        document.body.classList.add('show-content');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Scroll to top on page refresh
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Fullscreen toggle function
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            iframe.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // Fullscreen button click event
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Try the Game button event (no fullscreen trigger)
    const tryGameBtn = document.querySelector('a[href="#try-game"]');
    tryGameBtn.addEventListener('click', function (e) {
        iframe.contentWindow.focus(); // Only focus the iframe, no fullscreen
    });

    // Prevent automatic fullscreen on iframe load
    iframe.onload = () => {
        iframe.contentWindow.focus(); // Only focus the iframe after loading
    };

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // IntersectionObserver for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    document.getElementById('startGameBtn').addEventListener('click', function() {
        document.getElementById('blurOverlay').style.display = 'none';
        this.style.display = 'none';
    });
    // Lazy load the game iframe and prevent automatic fullscreen
    const gameObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                iframe.src = 'Web/index.html'; // Load the game
                iframe.onload = () => {
                    iframe.contentWindow.focus(); // Focus only, no fullscreen
                };
                gameObserver.unobserve(iframe);
            }
        });
    }, {
        threshold: 0.75
    });

    gameObserver.observe(iframe);
});

const style = document.createElement('style');
style.innerHTML = `
    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }
`;
document.head.appendChild(style);

// Disable horizontal overflow
document.body.style.overflowX = 'hidden';

// Particle.js configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 100, 
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff' 
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.9,
            random: false, 
            anim: {
                enable: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false
            }
        },
        line_linked: {
            enable: false
        },
        move: {
            enable: true,
            speed: 1.5,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas', 
        events: {
            onhover: {
                enable: false,
                mode: 'repulse' 
            },
            onclick: {
                enable: false,
                mode: 'push' 
            }
        },
        modes: {
            repulse: {
                distance: 150,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});
