let allProjects = [];
let visibleProjects = 0;
const projectsPerLoad = {
  mobile: 1,
  tablet: 2,
  desktop: 3
};

function showProjectDetailsModal(project) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity duration-300 opacity-0';
    modal.innerHTML = `
        <div class="bg-white px-8 pt-4 rounded-lg w-full max-w-3xl shadow-lg transform transition-all duration-300 scale-95 max-h-[100vh] flex flex-col" @click.stop>
            <div class="flex justify-between items-center mb-2">
                <h2 class="text-3xl font-bold text-gray-800">${project.title}</h2>
                <button class="close-modal-button text-gray-500 hover:text-gray-800 text-6xl transition-transform hover:rotate-90">&times;</button>
            </div>
            
            <div class=""><p class="text-gray-600 text-lg">${project.description || 'No detailed description available.'}</p></div>
            <hr class="my-2 border-gray-200">

            <div class="flex-1 overflow-y-auto">
                <div class="project-modal-image-container mb-4 rounded-xl overflow-y-auto" style="max-height: 80vh">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-auto">
                </div>
                
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Trigger animations
    setTimeout(() => {
        modal.classList.add('opacity-100');
        modal.querySelector('div').classList.remove('scale-95');
    }, 10);

    const closeModal = () => {
        modal.classList.remove('opacity-100');
        modal.querySelector('div').classList.add('scale-95');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };

    modal.querySelector('.close-modal-button').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Modal Section End




function getProjectsPerLoad() {
    if (window.innerWidth >= 1024) return projectsPerLoad.desktop;
    if (window.innerWidth >= 768) return projectsPerLoad.tablet;
    return projectsPerLoad.mobile;
}

function initializeCardHover(card) {
    const backgroundImage = card.querySelector('.project-background-image');
    const image = card.querySelector('.project-image');
    
    let scrollInterval;
    
    card.addEventListener('mouseenter', () => {
        if (backgroundImage && image.offsetHeight > backgroundImage.offsetHeight) {
            const scrollDistance = image.offsetHeight - backgroundImage.offsetHeight;
            let currentScroll = 0;
            
            scrollInterval = setInterval(() => {
                currentScroll = Math.min(currentScroll + 1, scrollDistance);
                image.style.transform = `translateY(-${currentScroll}px)`;
                
                if (currentScroll >= scrollDistance) {
                    clearInterval(scrollInterval);
                    setTimeout(() => {
                        image.style.transform = 'translateY(0)';
                        currentScroll = 0;
                    }, 1000);
                }
            }, 30);
        }
    });

    card.addEventListener('mouseleave', () => {
        clearInterval(scrollInterval);
        if (image) {
            image.style.transform = 'translateY(0)';
        }
    });
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = `project-card hidden opacity-0 translate-y-6 transition-all duration-500 ease-out delay-[${index * 50}ms]`;
    card.setAttribute('data-category', project.category);
    card.innerHTML = `
        <div class="project-card-container h-full flex flex-col">
            <div class="project-background-image rounded-t-lg overflow-hidden h-64 relative">
                <img src="${project.image}" alt="${project.title}" class="project-image w-full h-auto object-cover absolute top-0 left-0 transition-transform duration-10000 ease-linear">
            </div>
            <div class="project-info p-5 bg-white rounded-b-lg flex flex-col">
                <h3 class="project-title text-xl font-bold mb-4 text-gray-800">${project.title}</h3>
                <div class="flex gap-2 mt-auto">
                    <button class="project-details-button flex-1 bg-slate-700 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded transition-colors" 
                            data-project-id="${project.id}">
                        Project Details
                    </button>
                    <a href="${project.link}" target="_blank" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded text-center transition-colors">
                        Visit Website
                    </a>
                </div>
                ${project.figmaLink && project.figmaLink !== '#' ? `
                <a href="${project.figmaLink}" target="_blank" class="w-full mt-2 bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded text-center transition-colors">
                    Design Link
                </a>
                ` : ''}
            </div>
        </div>
    `;
    return card;
}

function loadMoreProjects(filter = 'all') {
    const projectsGrid = document.querySelector('.projects-grid');
    const projectsToShow = getProjectsPerLoad();
    let loadedCount = 0;
    
    // Filter projects based on category
    const filteredProjects = filter === 'all' 
        ? allProjects 
        : allProjects.filter(project => project.category === filter);
    
    // Show projects with staggered animation
    for (let i = visibleProjects; i < Math.min(visibleProjects + projectsToShow, filteredProjects.length); i++) {
        const project = filteredProjects[i];
        const card = createProjectCard(project, i);
        projectsGrid.appendChild(card);
        
        // Trigger animation
        setTimeout(() => {
            card.classList.remove('hidden');
            card.classList.remove('opacity-0');
            card.classList.remove('translate-y-6');
        }, 10);
        
        loadedCount++;
        
        // Initialize hover effects and click handler
        setTimeout(() => {
            initializeCardHover(card);
            card.querySelector('.project-details-button').addEventListener('click', () => {
                showProjectDetailsModal(project);
            });
        }, 50);
    }
    
    visibleProjects += loadedCount;
    
    // Update load more button state
    const loadMoreBtn = document.querySelector('#load-more-projects');
    if (loadMoreBtn) {
        if (visibleProjects >= filteredProjects.length) {
            loadMoreBtn.classList.add('hidden');
        } else {
            loadMoreBtn.classList.remove('hidden');
        }
    }
    
    return loadedCount;
}

function resetProjects(filter = 'all') {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';
    visibleProjects = 0;
    loadMoreProjects(filter);
}

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Reset and load projects with new filter
            const filter = button.getAttribute('data-filter');
            resetProjects(filter);
        });
    });
}

function initializeLoadMoreButton() {
    const loadMoreBtn = document.querySelector('#load-more-projects');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const activeFilter = document.querySelector('.project-filter.active').getAttribute('data-filter');
            loadMoreProjects(activeFilter);
        });
    }
}

async function loadProjects() {
    try {
        const response = await fetch('./src/data/projects.json');
        const data = await response.json();
        allProjects = data.projects;
        
        // Initialize with all projects
        resetProjects();
        
        // Initialize filters and load more button
        initializeProjectFilters();
        initializeLoadMoreButton();
        
        // Reinitialize on window resize
        window.addEventListener('resize', () => {
            const activeFilter = document.querySelector('.project-filter.active').getAttribute('data-filter');
            resetProjects(activeFilter);
        });
        
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadProjects);