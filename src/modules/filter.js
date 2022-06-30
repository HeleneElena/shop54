 export default function filter() {
    const cards = document.querySelectorAll('.goods .card'),
          discountCheckbox = document.querySelector('#discount-checkbox'),
          min = document.querySelector('#min'),
          max = document.querySelector('#max'),
          activeLi = document.querySelector('.catalog-list li.active');

        cards.forEach(el => {
            const cardPrice = el.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            const discount = el.querySelector('.card-sale');

        el.parentNode.style.display = '';// сначала все карточки видимы

        if ((min.value && price < min.value) || (max.value && price > max.value)) { // потом скрываем ненужные
                el.parentNode.style.display = 'none';
            }  else if (discountCheckbox.checked && !discount) {
                el.parentNode.style.display = 'none'; 
            } else if (activeLi) {
                if (el.dataset.category !== activeLi.textContent) {
                    el.parentNode.style.display = 'none'; 
                } 
            }
        });
}