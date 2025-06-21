let allProjects = [];

function showProjectDetailsModal(project) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white p-6 rounded-lg max-w-xl w-full shadow-lg" @click.stop>
            
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold text-gray-800">${project.title}</h2>
                <button class="close-modal-button text-gray-500 hover:text-gray-800 text-4xl">&times;</button>
            </div>
            
            <div><p class=" text-gray-600">${project.description || 'No detailed description available.'}</p></div>
            <hr class="my-4 border-gray-700">

            <div class="max-h-[70vh] overflow-y-auto">
                <img src="${project.image}" alt="${project.title}" class="w-full h-auto object-cover rounded-md mb-4">
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModal = () => document.body.removeChild(modal);

    modal.querySelector('.close-modal-button').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.querySelector('.projects-grid');
    const viewAllButton = document.querySelector('#view-all-projects');
    let isShowingAll = false;

    projectsGrid.addEventListener('click', function (e) {
        const detailsButton = e.target.closest('.project-details-button');
        if (detailsButton) {
            const projectId = detailsButton.dataset.projectId;
            const project = allProjects.find(p => p.id.toString() === projectId);
            if (project) {
                showProjectDetailsModal(project);
            }
        }
    });

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

    // Handle "View All Project's" button
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
        initializeCardHover(card);
    });
});

// Function to create project card HTML
function createProjectCard(project) {
    return `
        <div class="project-card" data-category="${project.category}">
            <div class="project-card-container">
                <div class="project-background-image" style="background-image: url('${project.image}')">
                </div>

<div class="project-info">
    <h3 class="project-title mb-2">${project.title}</h3>
    <button class="project-details-button my-2 bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded" data-project-id="${project.id}">Project Details</button>
    <div class="project-buttons flex flex-row">

        <a href="${project.link}" class="project-button primary-button" target="_blank" rel="noopener noreferrer">
            Visit Website
        </a>

        ${project.figmaLink ? `
            <a href="${project.figmaLink}" class="project-button secondary-button" target="_blank" rel="noopener noreferrer">
                Design Link
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
        allProjects = data.projects;
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

// Function to initialize hover effects for a single card
function initializeCardHover(card) {
    const backgroundImage = card.querySelector('.project-background-image');

    card.addEventListener('mouseenter', () => {
        // Start image scroll animation
        if (backgroundImage) {
            backgroundImage.style.backgroundPosition = 'center bottom';
        }
    });

    card.addEventListener('mouseleave', () => {
        // Reset image position
        if (backgroundImage) {
            backgroundImage.style.backgroundPosition = 'center top';
        }
    });
}

// Function to initialize hover effects for dynamically created cards
function initializeCardHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        initializeCardHover(card);
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