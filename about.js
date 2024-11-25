//For the about page

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const buttons = document.querySelectorAll('.talk-button');

    // Add an event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Redirect to the specified URL
            window.location.href = 'contact.html';
        });
    });

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    document.querySelectorAll('.progress-bar').forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.setProperty('--percent', `${percent}%`);
    });
});

const logo = document.querySelectorAll('.logo');

        // Add an event listener to each object
        logo.forEach(object => {
            object.addEventListener('click', () => {
                // Redirect to the specified URL
                window.location.href = 'index.html';
            });
        });

        function toggleMenu() {
            const menu = document.getElementById('menu');
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
        }