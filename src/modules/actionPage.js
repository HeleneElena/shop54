import filter from './filter';

export default function actionPage() {
    const cards = document.querySelectorAll('.goods .card'),
          discountCheckbox = document.querySelector('#discount-checkbox'),
          min = document.querySelector('#min'),
          max = document.querySelector('#max'),
          search = document.querySelector('.search-wrapper_input'),
          searchBtn = document.querySelector('.search-btn'),
          logo = document.querySelector('.logo');

          logo.addEventListener('click', () => {
            cards.forEach(el => {
                el.parentNode.style.display = '';
            });
          });

    function searchGoods() {
        searchBtn.addEventListener('click', () => {
            const searchText = new RegExp(search.value.trim(), 'i');
            cards.forEach(el => {
                const title = el.querySelector('.card-title');
                if (!searchText.test(title.textContent)) {
                    el.parentNode.style.display = 'none';
                } else {
                    el.parentNode.style.display = '';
                }
            });
            search.value = ''; 

        });
    }
    searchGoods();

    discountCheckbox.addEventListener('click', filter);
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);
}