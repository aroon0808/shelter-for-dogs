"use strict";

document.addEventListener('DOMContentLoaded', function() {

    /*
     * Tabs
     */
    if (document.querySelector('.tabs--nav')) {

        const tabsNav = document.querySelector('.tabs--nav');
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
     * Form labels
     */
    if (document.querySelector('.form')) {
        const forms = document.querySelectorAll('.form');
        
        forms.forEach((form) => {
            const formGroups = form.querySelectorAll('.form--group');

            formGroups.forEach((formGroup) => {
                const formLabel = formGroup.querySelector('.form--label');
                const formInput = formGroup.querySelector('.form--input');

                // On init
                if (formInput.value) {
                    formLabel.classList.add('is-active');
                }
    
                // On focus
                formInput.addEventListener('focus', function() {
                    formLabel.classList.add('is-active');
                });
    
                // On focus out
                formInput.addEventListener('focusout', function() {
                    if (!this.value) {
                        formLabel.classList.remove('is-active');
                    }
                });
            });
        });
    }
});