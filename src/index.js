'use strict';

//checkbox
const checkboxs = document.querySelectorAll('#discount-checkbox');

checkboxs.forEach(el => {
    el.addEventListener('change', function() {
        if (this.checked) {
            this.nextElementSibling.classList.add('checked');
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
        });
});
// end checkbox

//warenkorb
const cart = document.querySelector('.cart'),
      btnCart = document.querySelector('#cart'),
      cartClose = document.querySelector('.cart-close');

btnCart.addEventListener('click', () => {
    cart.style.display = 'block';

    cartClose.addEventListener('click', () => {
        cart.style.display = 'none';
    });
});

// end warenkorb


