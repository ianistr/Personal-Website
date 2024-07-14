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








