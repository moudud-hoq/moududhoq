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

    // Hover effect for project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.project-card-overlay');
            overlay.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.project-card-overlay');
            overlay.style.opacity = '0';
        });
    });
});

// Function to create project card HTML
function createProjectCard(project) {
    return `
        <div class="project-card" data-category="${project.category}">
            <div class="project-card-image">
                <img src="${project.image}" alt="${project.title} ">
                <div class="project-card-overlay">
                    <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">
                        View Details <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2 text-gray-800">${project.title}</h3>
                ${project.figmaLink ? `<div class="my-3"><a href="${project.figmaLink}" target="_blank" rel="noopener noreferrer">Figma File</a></div>` : ''}
                <div class="flex flex-wrap gap-2">
                    ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
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

        // Initialize project filters
        initializeProjectFilters();
    } catch (error) {
        console.error('Error loading projects:', error);
    }
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