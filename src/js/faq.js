// Load and display FAQ data
async function loadFAQs() {
    try {
        const response = await fetch('/src/data/faq.json');
        const data = await response.json();
        const faqContainer = document.getElementById('faq-container');
        
        // Clear existing content
        faqContainer.innerHTML = '';
        
        // Create FAQ items
        data.faqs.forEach((faq, index) => {
            const faqItem = document.createElement('div');
            faqItem.className = 'bg-gray-800/50 rounded-xl border border-gray-700/50 mb-4 overflow-hidden';
            
            faqItem.innerHTML = `
                <button class="faq-toggle w-full px-6 py-4 text-left focus:outline-none">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-white">${faq.question}</h3>
                        <span class="rotate-icon transform transition-transform duration-300">
                            <i class="fas fa-chevron-down text-blue-400"></i>
                        </span>
                    </div>
                </button>
                <div class="faq-content hidden px-6 pb-5">
                    <p class="text-gray-300">${faq.answer}</p>
                </div>
            `;
            
            faqContainer.appendChild(faqItem);
        });

        // Initialize FAQ accordion functionality
        initializeFAQAccordion();
    } catch (error) {
        console.error('Error loading FAQs:', error);
    }
}

// FAQ Accordion functionality
function initializeFAQAccordion() {
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('.rotate-icon');

            // Toggle current item
            toggle.classList.toggle('active');
            content.classList.toggle('hidden');
            content.classList.toggle('active');
            icon.style.transform = toggle.classList.contains('active') ? 'rotate(180deg)' : '';

            // Close other items
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.classList.remove('active');
                    const otherContent = otherToggle.nextElementSibling;
                    const otherIcon = otherToggle.querySelector('.rotate-icon');
                    otherContent.classList.add('hidden');
                    otherContent.classList.remove('active');
                    otherIcon.style.transform = '';
                }
            });
        });
    });
}

// Load FAQs when the DOM is ready
document.addEventListener('DOMContentLoaded', loadFAQs);