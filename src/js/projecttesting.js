document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.querySelector('.projects-grid');
    const viewAllButton = document.querySelector('#view-all-projects');
    let isShowingAll = false;

    // Function to handle responsive visibility
    function handleResponsiveVisibility() {
        if (!isShowingAll) {
            projectsGrid.classList.remove('show-all');
        }
    }

    // Initialize visibility
    handleResponsiveVisibility();

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Reset show-all state
            isShowingAll = false;
            projectsGrid.classList.remove('show-all');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // After filtering, apply responsive visibility
            handleResponsiveVisibility();
        });
    });

    // Handle "View All Projects" button
    if (viewAllButton) {
        viewAllButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Toggle show-all state
            isShowingAll = !isShowingAll;

            if (isShowingAll) {
                // Show all projects
                projectsGrid.classList.add('show-all');
                viewAllButton.innerHTML = 'Show Less <i class="fas fa-arrow-up ml-2"></i>';
            } else {
                // Hide extra projects
                projectsGrid.classList.remove('show-all');
                viewAllButton.innerHTML = 'View All Projects <i class="fas fa-arrow-right ml-2"></i>';
                // Scroll back to projects section
                document.querySelector('#work').scrollIntoView({ behavior: 'smooth' });
            }

            // Reset filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            const allButton = document.querySelector('[data-filter="all"]');
            if (allButton) allButton.classList.add('active');
        });
    }

    // Handle window resize
    window.addEventListener('resize', handleResponsiveVisibility);

    // Initialize Intersection Observer for fade-in animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe all project cards
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Enhanced hover effects for project cards
    projectCards.forEach(card => {
        const techBadges = card.querySelector('.tech-badges');
        const backgroundImage = card.querySelector('.project-background-image');
        
        card.addEventListener('mouseenter', () => {
            // Hide tech badges
            if (techBadges) {
                techBadges.style.opacity = '0';
                techBadges.style.transform = 'translateY(-20px)';
            }
            
            // Start image scroll animation
            if (backgroundImage) {
                backgroundImage.style.transform = 'translateY(-30%)';
            }
        });

        card.addEventListener('mouseleave', () => {
            // Show tech badges
            if (techBadges) {
                techBadges.style.opacity = '1';
                techBadges.style.transform = 'translateY(0)';
            }
            
            // Reset image position
            if (backgroundImage) {
                backgroundImage.style.transform = 'translateY(0)';
            }
        });
    });
});

// Function to create project card HTML
function createProjectCard(project) {
    return `
        <div class="project-card" data-category="${project.category}">
            <div class="project-card-container">
                <div class="project-background-image" style="background-image: url('${project.image}')">
                    <div class="tech-badges">
                        ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-buttons">
                        <a href="${project.link}" class="project-button primary-button" target="_blank" rel="noopener noreferrer">
                            View Details <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                        ${project.figmaLink ? `
                            <a href="${project.figmaLink}" class="project-button secondary-button" target="_blank" rel="noopener noreferrer">
                                Figma File <i class="fab fa-figma ml-2"></i>
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to load and display projects
async function loadProjects() {
    try {
        const response = await fetch('./src/data/projects.json');
        const data = await response.json();
        const projectsGrid = document.querySelector('.projects-grid');

        // Clear existing projects
        projectsGrid.innerHTML = '';

        // Add all projects
        data.projects.forEach(project => {
            projectsGrid.innerHTML += createProjectCard(project);
        });

        // Re-initialize event listeners for dynamically created cards
        initializeCardHoverEffects();
        
        // Initialize project filters
        initializeProjectFilters();
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Function to initialize hover effects for dynamically created cards
function initializeCardHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const techBadges = card.querySelector('.tech-badges');
        const backgroundImage = card.querySelector('.project-background-image');
        
        // Remove existing event listeners to avoid duplicates
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
        
        card.addEventListener('mouseenter', () => {
            // Hide tech badges
            if (techBadges) {
                techBadges.style.opacity = '0';
                techBadges.style.transform = 'translateY(-20px)';
            }
            
            // Start image scroll animation
            if (backgroundImage) {
                backgroundImage.style.transform = 'translateY(-30%)';
            }
        });

        card.addEventListener('mouseleave', () => {
            // Show tech badges
            if (techBadges) {
                techBadges.style.opacity = '1';
                techBadges.style.transform = 'translateY(0)';
            }
            
            // Reset image position
            if (backgroundImage) {
                backgroundImage.style.transform = 'translateY(0)';
            }
        });
    });
}

// Function to initialize project filters
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Load projects when the document is ready
document.addEventListener('DOMContentLoaded', loadProjects);