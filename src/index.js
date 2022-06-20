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
    cart.style.display = 'flex';

    cartClose.addEventListener('click', () => {
        cart.style.display = 'none';
    });
});
// end warenkorb

//waren im warenkorb
const cards = document.querySelectorAll('.goods .card'),
      cartWrapper = document.querySelector('.cart-wrapper'),
      cartEmpty = document.querySelector('#cart-empty'),
      counterGoods = document.querySelector('.counter');

cards.forEach(el => {
    const btnCard = el.querySelector('.btn');
          
    btnCard.addEventListener('click', () => {
       const cardClone = el.cloneNode(true);
       cartWrapper.append(cardClone);
       showData();	
       
       const removeBtn = cardClone.querySelector('.btn');
       removeBtn.textContent = 'Удалить из корзины';
       removeBtn.addEventListener('click', () => {
       cardClone.remove();
        showData();
       });
     });
});
// end waren im warenkorb

// считаем у значка карзины, и отображаем, сколько там товаров
function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card'),
          cartPrice = cartWrapper.querySelectorAll('.card-price'),
          cardTotal = document.querySelector('.cart-total span');
    let sum = 0;
    counterGoods.textContent = cardsCart.length;

    cartPrice.forEach(el => {
        let price = parseFloat(el.textContent);
        sum += price;
    });
    cardTotal.textContent = sum;
    cardsCart.length !== 0 ? cartEmpty.innerHTML = '' : cartEmpty.innerHTML = 'Ваша корзина пуста';
}