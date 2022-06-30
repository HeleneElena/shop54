export default function addCart() {
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