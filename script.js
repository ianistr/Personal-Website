const logo = document.querySelectorAll('.logo');

        // Add an event listener to each object
        logo.forEach(object => {
            object.addEventListener('click', () => {
                // Redirect to the specified URL
                window.location.href = 'index.html';
            });
        });














function changeClasses() {
    var oldElements = document.querySelectorAll('.timeline-item.right'); // Select all elements with old-class
    var newClassElement = document.querySelector('.timeline-item.left'); // Select an element with new-class

    if (window.innerWidth<800) {
        var newClassName = newClassElement.className; // Get the class name of the new-class element

        oldElements.forEach(function(element) {
            element.className = newClassName; // Replace old-class with new-class
        });
    }
    
}

const buttons = document.querySelectorAll('.talk-button');

        // Add an event listener to each button
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Redirect to the specified URL
                window.location.href = 'contact.html';
            });
        });



function toggleClasses() {
    const elements = document.querySelectorAll('.timeline-item.right, .timeline-item.left');
    const screenWidth = window.innerWidth;

    elements.forEach(element => {
        if (screenWidth < 768) {
            if (element.classList.contains('timeline-item') && element.classList.contains('right')) {
                element.classList.remove('timeline-item', 'right');
                element.classList.add('timeline-item', 'left');
            }
        } else {
            if (element.classList.contains('timeline-item') && element.classList.contains('left')) {
                element.classList.remove('timeline-item', 'left');
                element.classList.add('timeline-item', 'right');
            }
        }
    });
}

//window.addEventListener('resize', toggleClasses);
//window.addEventListener('load', toggleClasses);

function toggleClassesPro() {
    const elements = document.querySelectorAll('.timeline-item.right');
    const screenWidth = window.innerWidth;

    elements.forEach(element => {
        if (screenWidth < 868) {
            if (element.classList.contains('timeline-item') && element.classList.contains('right')) {
                element.classList.remove('timeline-item', 'right');
                element.classList.add('timeline-item', 'left');
            }
        } else {
            if (element.classList.contains('timeline-item') && element.classList.contains('left')) {
                element.classList.remove('timeline-item', 'left');
                element.classList.add('timeline-item', 'right');
            }
        }
    });
}

window.addEventListener('resize', toggleClassesPro);
window.addEventListener('load', toggleClassesPro);



function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

function toggleAvailabilityMenu(){
    const menu=document.getElementById("availability-menu")
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}




document.addEventListener('DOMContentLoaded', function() {
    var currentYear = new Date().getFullYear();
    document.getElementById('copyright-year').textContent = currentYear;
});




function getNextThreeMonths() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const availablePlaces = [0, 1, 1]; // Example available places for the next three months

    const today = new Date();
    let currentMonth = today.getMonth();
    let monthList = [];

    for (let i = 0; i < 3; i++) {
        currentMonth = (today.getMonth() + i) % 12; // Ensure month index wraps around after December
        let monthName = months[currentMonth];
        monthList.push({ name: monthName, places: availablePlaces[i] });
    }

    return monthList;
}

// Function to display the next three months in the list
function displayNextThreeMonths() {
    const monthsList = getNextThreeMonths();
    const monthsListElement = document.getElementById('monthsList');

    monthsList.forEach(month => {
        if(month.places==0){
        const listItem = document.createElement('li');
        listItem.textContent = `${month.name}: Busy`;
        monthsListElement.appendChild(listItem);
        }
        else{
            const listItem = document.createElement('li');
        listItem.textContent = `${month.name}: ${month.places} spot`;
        monthsListElement.appendChild(listItem);
        }
        
    });
}

// Execute the function to display the months
displayNextThreeMonths();



const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Directly manipulate the element's style to trigger the animation
            entry.target.style.transform = 'translateX(0)';
            entry.target.style.transform = 'translateY(9rem)';
            
            // Stop observing the element after the animation is applied
            observer.unobserve(entry.target);
        }
    });
});

// Select all elements to be observed
document.querySelectorAll('.timeline-item').forEach(element => {
    observer.observe(element);
});


const objects = document.querySelectorAll('.link-container');

        // Add an event listener to each object
        objects.forEach(object => {
            object.addEventListener('click', () => {
                // Redirect to the specified URL
                window.location.href = 'services.html';
            });
        });












