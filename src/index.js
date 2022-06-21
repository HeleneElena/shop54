'use strict';

//checkbox
function toggleCheckbox() {
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
}

// end checkbox

//warenkorb
function toggleCard() {
    const cart = document.querySelector('.cart'),
        btnCart = document.querySelector('#cart'),
        cartClose = document.querySelector('.cart-close');

    btnCart.addEventListener('click', () => {
        cart.style.display = 'flex';

        cartClose.addEventListener('click', () => {
            cart.style.display = 'none';
        });
    });
}
// end warenkorb

//waren im warenkorb
function addCart() {
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
        removeBtn.textContent = 'Aus dem Warenkorb entfernen';
        removeBtn.addEventListener('click', () => {
        cardClone.remove();
            showData();
        });
        });
    });
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
    cardsCart.length !== 0 ? cartEmpty.innerHTML = '' : cartEmpty.innerHTML = 'Ihr Warenkorb ist leer';
    }
}
// end waren im warenkorb

// фильтр Акции и поиск тоже
function actionPage() {
    const cards = document.querySelectorAll('.goods .card'),
          discountCheckbox = document.querySelector('#discount-checkbox');

          discountCheckbox.addEventListener('click', () => {
            cards.forEach(el => {
                if (discountCheckbox.checked) {
                    if (!el.querySelector('.card-sale')) {
                        el.parentNode.style.display = 'none';
                    } 
                } else {
                        el.parentNode.style.display = '';
                }
            });
          });
}
// end фильтр Акции
toggleCheckbox();
toggleCard();
addCart();
actionPage();