// Chart.js configuration for CBS results visualization
document.addEventListener('DOMContentLoaded', function() {
    // Get the canvas element
    const ctx = document.getElementById('cbsChart');
    
    if (ctx) {
        // Create the chart
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Port 8', 'Port 9', 'Port 10', 'Port 11'],
                datasets: [
                    {
                        label: 'RX Packets',
                        data: [141310, 74, 1131457, 796331],
                        backgroundColor: 'rgba(102, 126, 234, 0.5)',
                        borderColor: 'rgba(102, 126, 234, 1)',
                        borderWidth: 2
                    },
                    {
                        label: 'TX Packets',
                        data: [274, 1158538, 220, 171],
                        backgroundColor: 'rgba(118, 75, 162, 0.5)',
                        borderColor: 'rgba(118, 75, 162, 1)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'CBS Performance: RX vs TX Packets by Port',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.parsed.y.toLocaleString();
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'Packets (log scale)'
                        },
                        ticks: {
                            callback: function(value) {
                                if (value === 10 || value === 100 || value === 1000 || 
                                    value === 10000 || value === 100000 || value === 1000000) {
                                    return value.toLocaleString();
                                }
                                return null;
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Port Number'
                        }
                    }
                }
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add fade-in animation for sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
    
    // Highlight active navigation item based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.style.color = '#667eea';
                        link.style.fontWeight = 'bold';
                    } else {
                        link.style.color = '#333';
                        link.style.fontWeight = '500';
                    }
                });
            }
        });
    });
    
    // Add performance metrics animation
    const bigNumbers = document.querySelectorAll('.big-number');
    bigNumbers.forEach(number => {
        const value = number.textContent;
        number.textContent = '0';
        
        const animateNumber = () => {
            const targetValue = parseFloat(value.replace(/,/g, ''));
            const isPercent = value.includes('%');
            const duration = 2000;
            const startTime = Date.now();
            
            const updateNumber = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentValue = progress * targetValue;
                
                if (isPercent) {
                    number.textContent = currentValue.toFixed(2) + '%';
                } else {
                    number.textContent = Math.floor(currentValue).toLocaleString();
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    number.textContent = value;
                }
            };
            
            updateNumber();
        };
        
        // Trigger animation when element comes into view
        const numberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber();
                    numberObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        numberObserver.observe(number);
    });
});