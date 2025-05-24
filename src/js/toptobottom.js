document.addEventListener('DOMContentLoaded', function() {
    // Get the button element
    const goToFooterBtn = document.getElementById('goToFooter');

    if (goToFooterBtn) {
        // Add click event listener to the button
        goToFooterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the footer element
            const footer = document.querySelector('footer');
            
            if (footer) {
                // Get the footer's position
                const footerPosition = footer.offsetTop;
                
                // Smooth scroll to footer
                window.scrollTo({
                    top: footerPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});
