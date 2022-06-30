export default function toggleCard() {
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