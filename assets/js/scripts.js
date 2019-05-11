"use strict";

document.addEventListener('DOMContentLoaded', function() {

    /*
     * Navbar mobile button
     */
    const navSidebar = document.querySelector('.navbar--sidebar');
    const navOverlay = document.querySelector('.navbar--overlay');
    const navBtn = document.getElementById('navbar-btn');
    const navSidebarBtn = document.getElementById('sidebar-btn');

    // Navbar button
    navBtn.addEventListener('click', function() {
        navSidebar.classList.add('is-active');
        navOverlay.classList.add('is-active');
    });

    // Sidebar button
    navSidebarBtn.addEventListener('click', function() {
        navSidebar.classList.remove('is-active');
        navOverlay.classList.remove('is-active');
    });

    // Overlay
    navOverlay.addEventListener('click', function() {
        this.classList.remove('is-active');
        navSidebar.classList.remove('is-active');
        navBtn.classList.remove('is-active');
    });

    /*
     * Tabs
     */
    const tabsNav = document.querySelector('.tabs--nav');

    if (tabsNav) {
        const tabsNavElements = tabsNav.querySelectorAll('.nav--link');
        const tabsContainer = document.querySelector('.tabs--content');
        const tabsPanels = tabsContainer.querySelectorAll('.tabs--panel');

        // Set container height
        tabsContainer.style.height = tabsPanels[0].offsetHeight + 20 + 'px';

        tabsNavElements.forEach((navEl) => {
            navEl.addEventListener('click', function(e) {
                e.preventDefault();

                const id = this.getAttribute('href');
                const activePanel = tabsContainer.querySelector(id);

                // Set container height
                tabsContainer.style.height = activePanel.offsetHeight + 20 + 'px';

                // Remove active class from links
                tabsNavElements.forEach((el)=> {
                    el.classList.remove('is-active');
                });

                // Remove active class from panels
                tabsPanels.forEach((el)=> {
                    el.classList.remove('is-active');
                });

                // Show active panel
                this.classList.add('is-active');
                activePanel.classList.add('is-active');
            });
        });
    }

    /*
     * Forms
     */
    const forms = document.querySelectorAll('.form');

    if (forms) {
        forms.forEach((form) => {
            const formGroups = form.querySelectorAll('.form--group');
            const formCheckBoxes = form.querySelectorAll('.form--checkbox');
            const formSubmitBtn = form.querySelector('.form--submit');

            // Labels
            formGroups.forEach((formGroup) => {
                const formLabel = formGroup.querySelector('.form--label');
                const formInput = formGroup.querySelector('.form--input');

                if (!formInput) return;

                // On init
                if (formInput.value) {
                    formLabel.classList.add('is-active');
                }
    
                // On focus
                formInput.addEventListener('focus', () => {
                    formLabel.classList.add('is-active');
                });
    
                // On focus out
                formInput.addEventListener('focusout', function() {
                    if (!this.value) {
                        formLabel.classList.remove('is-active');
                    }
                });
            });

            // Checkboxes
            formCheckBoxes.forEach((checkbox) => {
                const checkboxLabel = checkbox.parentElement.querySelector('.form--checkbox-label');

                // On toggle checkbox
                checkbox.addEventListener('change', () => {
                    toggleCheckboxClass();
                });

                // On keypress on the checkbox label
                checkboxLabel.addEventListener('keypress', (e) => {
                    if (e.keyCode == '13') {
                        if (checkbox.checked) {
                            checkbox.checked = false;
                        } else {
                            checkbox.checked = true;
                        }

                        toggleCheckboxClass();
                    }
                });

                // On click form submit button
                formSubmitBtn.addEventListener('click', () => {
                    toggleCheckboxClass();
                });

                // Toggle checkbox class
                function toggleCheckboxClass() {
                    if (checkbox.checked) {
                        checkboxLabel.classList.remove('is-required');
                    } else {
                        checkboxLabel.classList.add('is-required');
                    }
                }
            });
        });
    }

    /**
     * Back to top
     */
    const footerBtn = document.getElementById('footer-btn');

    if (footerBtn) {
        footerBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Scroll to the element
            const windowOffset = window.pageYOffset;
            const duration = 1000; // 1s
            let start = null;

            // Scroll animation - easeInOutQuad
            const animate = (t) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

            window.requestAnimationFrame(function step(timestamp) {
                if (!start) {
                    start = timestamp;
                }

                let time = timestamp - start;
                let percent = Math.min(time / duration, 1);
                percent = animate(percent);

                window.scrollTo(0, windowOffset + (-windowOffset * percent));

                if (time < duration) {
                    window.requestAnimationFrame(step);
                }
            });
        });
    }
});