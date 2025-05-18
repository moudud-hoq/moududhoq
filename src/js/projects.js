document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');

    // Make all projects visible by default
    projectCards.forEach(card => {
        card.classList.add('visible');
    });

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

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                card.classList.remove('hidden', 'visible');
                
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.add('visible');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Handle "View All Projects" button
    const viewAllButton = document.querySelector('#view-all-projects');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Show all projects
            filterButtons.forEach(btn => btn.classList.remove('active'));
            const allButton = document.querySelector('[data-filter="all"]');
            if (allButton) allButton.classList.add('active');
            
            projectCards.forEach(card => {
                card.classList.remove('hidden');
                card.classList.add('visible');
                card.style.display = 'block';
            });
            
            // Scroll to projects section
            document.querySelector('#work').scrollIntoView({ behavior: 'smooth' });
        });
    }

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