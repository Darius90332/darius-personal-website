'use strict';

const DariusBlog = (() => {
  // Burger Menu
  const initBurgerMenu = () => {
    const burger = document.querySelector('.usr-burger');
    const menu = document.querySelector('.usr-menu');
    const overlay = document.querySelector('.w3-overlay');

    burger.onclick = () => {
      burger.classList.toggle('usr-burger--open');
      menu.classList.toggle('usr-hidden');
      overlay.classList.toggle('usr-show');
    };

    overlay.onclick = () => {
      burger.classList.remove('usr-burger--open');
      menu.classList.add('usr-hidden');
      overlay.classList.remove('usr-show');
    };

    window.onscroll = () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        burger.classList.remove('usr-burger--open');
        menu.classList.add('usr-hidden');
        overlay.classList.remove('usr-show');
      }
    };
  };

  // Scrollspy
  const initScrollSpy = () => {
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('nav a.w3-bar-item');

    const makeActive = (link) => menuLinks[link].classList.add('w3-black');
    const removeActive = (link) => menuLinks[link].classList.remove('w3-black');
    const removeAllActive = () => [...menuLinks].forEach((link) => link.classList.remove('w3-black'));

    let currentActive = 0;
    const sectionMargin = 100;

    window.addEventListener('scroll', () => {
      const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin) - 1;

      if (current !== currentActive) {
        removeAllActive();
        currentActive = current;
        if (menuLinks[current]) makeActive(current);
      }
    });
  };

  // Modal Handling
  const initModal = () => {
    const modalBtn = document.querySelector('.usr-modal-btn');
    const modal = document.querySelector('.w3-modal');
    const modalClose = document.querySelector('.usr-modal-btn-close');

    modalBtn.onclick = () => {
      modal.classList.add('usr-show');
    };

    modalClose.onclick = () => {
      modal.classList.remove('usr-show');
    };

    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('usr-show')) {
        modal.classList.remove('usr-show');
      }
    });
  };

  // Reply Modal Handling
  const initReplyModals = () => {
    const replyButtons = document.querySelectorAll('.usr-repl-btn');
    const replyModals = document.querySelectorAll('.usr-repl-modal');

    replyButtons.forEach((btn, index) => {
      btn.onclick = () => {
        replyModals[index].classList.toggle('usr-hidden');
      };
    });
  };

  // Modal Image Gallery
  const initImageGallery = () => {
    const gallery = document.querySelector('.usr-gallery');
    const images = document.querySelectorAll('.usr-gallery .w3-image');
    const overlayGallery = document.querySelector('.usr-gallery__overlay');

    images.forEach((image, i) => {
      image.onclick = () => {
        image.classList.toggle('w3-image--show');
        overlayGallery.classList.toggle('usr-gallery__overlay--hidden');

        overlayGallery.onclick = () => {
          overlayGallery.classList.add('usr-gallery__overlay--hidden');
          image.classList.remove('w3-image--show');
        };
      };

      image.onkeyup = (e) => {
        if (e.keyCode === 27) {
          overlayGallery.classList.add('usr-gallery__overlay--hidden');
          image.classList.remove('w3-image--show');
        } else if (e.keyCode === 13) {
          overlayGallery.classList.remove('usr-gallery__overlay--hidden');
          image.classList.add('w3-image--show');
        }
      };

      image.onblur = () => {
        overlayGallery.classList.add('usr-gallery__overlay--hidden');
        image.classList.remove('w3-image--show');
      };
    });
  };

  // Public API
  return {
    init: () => {
      initBurgerMenu();
      initScrollSpy();
      initModal();
      initReplyModals();
      initImageGallery();
    },
  };
})();

// Initialize Darius' Blog
document.addEventListener('DOMContentLoaded', () => {
  DariusBlog.init();
});
