/* Responsive Hamburger Menu Logic */

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburgerMenu');
    const menuNavBar = document.getElementById('menuNavBar');

    if (hamburger && menuNavBar) {
        hamburger.addEventListener('click', () => {
            menuNavBar.classList.toggle('active');
        });

        // Close menu when clicking an option
        const menuItems = menuNavBar.querySelectorAll('p');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                menuNavBar.classList.remove('active');
            });
        });
    }
});
