"use strict";

document.addEventListener('DOMContentLoaded', function () {
  /*
   * Tabs
   */
  var tabsNav = document.querySelector('.tabs--nav');

  if (tabsNav) {
    var _tabsNav = document.querySelector('.tabs--nav');

    var tabsNavElements = _tabsNav.querySelectorAll('.nav--link');

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
   * Forms
   */


  var forms = document.querySelectorAll('.form');

  if (forms) {
    forms.forEach(function (form) {
      var formGroups = form.querySelectorAll('.form--group');
      var formCheckBoxes = form.querySelectorAll('.form--checkbox');
      var formSubmitBtn = form.querySelector('.form--submit'); // Labels

      formGroups.forEach(function (formGroup) {
        var formLabel = formGroup.querySelector('.form--label');
        var formInput = formGroup.querySelector('.form--input');
        if (!formInput) return; // On init

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
      }); // Checkboxes

      formCheckBoxes.forEach(function (checkbox) {
        var checkboxLabel = checkbox.parentElement.querySelector('.form--checkbox-label'); // On toggle checkbox

        checkbox.addEventListener('change', function () {
          toggleCheckboxClass();
        }); // On keypress on the checkbox label

        checkboxLabel.addEventListener('keypress', function (e) {
          if (e.keyCode == '13') {
            if (checkbox.checked) {
              checkbox.checked = false;
            } else {
              checkbox.checked = true;
            }

            toggleCheckboxClass();
          }
        }); // On click form submit button

        formSubmitBtn.addEventListener('click', function () {
          toggleCheckboxClass();
        }); // Toggle checkbox class

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
});