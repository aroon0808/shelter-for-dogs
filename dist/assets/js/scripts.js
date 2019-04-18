"use strict";

document.addEventListener('DOMContentLoaded', function () {
  /*
   * Tabs
   */
  if (document.querySelector('.tabs--nav')) {
    var tabsNav = document.querySelector('.tabs--nav');
    var tabsNavElements = tabsNav.querySelectorAll('.nav--link');
    var tabsContainer = document.querySelector('.tabs--content');
    var tabsPanels = tabsContainer.querySelectorAll('.tabs--panel'); // Set container height

    tabsContainer.style.height = tabsPanels[0].offsetHeight + 20 + 'px';
    tabsNavElements.forEach(function (navEl) {
      navEl.addEventListener('click', function (e) {
        e.preventDefault();
        var id = this.getAttribute('href');
        var activePanel = tabsContainer.querySelector(id); // Set container height

        tabsContainer.style.height = activePanel.offsetHeight + 20 + 'px'; // Remove active class from links

        tabsNavElements.forEach(function (el) {
          el.classList.remove('is-active');
        }); // Remove active class from panels

        tabsPanels.forEach(function (el) {
          el.classList.remove('is-active');
        }); // Show active panel

        this.classList.add('is-active');
        activePanel.classList.add('is-active');
      });
    });
  }
  /*
   * Form labels
   */


  if (document.querySelector('.form')) {
    var forms = document.querySelectorAll('.form');
    forms.forEach(function (form) {
      var formGroups = form.querySelectorAll('.form--group');
      formGroups.forEach(function (formGroup) {
        var formLabel = formGroup.querySelector('.form--label');
        var formInput = formGroup.querySelector('.form--input'); // On init

        if (formInput.value) {
          formLabel.classList.add('is-active');
        } // On focus


        formInput.addEventListener('focus', function () {
          formLabel.classList.add('is-active');
        }); // On focus out

        formInput.addEventListener('focusout', function () {
          if (!this.value) {
            formLabel.classList.remove('is-active');
          }
        });
      });
    });
  }
});