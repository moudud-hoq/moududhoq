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

        // Add scroll event listener to hide/show button
        window.addEventListener('scroll', function() {
            const footer = document.querySelector('footer');
            if (footer) {
                const footerPosition = footer.offsetTop;
                const scrollPosition = window.scrollY + window.innerHeight;
                
                // Hide button when within 200px of footer
                if (scrollPosition > footerPosition - 200) {
                    goToFooterBtn.style.opacity = '0';
                    goToFooterBtn.style.visibility = 'hidden';
                } else {
                    goToFooterBtn.style.opacity = '1';
                    goToFooterBtn.style.visibility = 'visible';
                }
            }
        });
    }
});
