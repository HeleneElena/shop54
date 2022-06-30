import filter from './filter';

export default function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card'),
          catalogList = document.querySelector('.catalog-list'),
          catalogBtn = document.querySelector('.catalog-button'),
          catalogWrapper = document.querySelector('.catalog'),
          filterTitle = document.querySelector('.filter-title h5');
    const categories = new Set();
    
    cards.forEach(el => {
        categories.add(el.dataset.category);
    });

    categories.forEach(el => {
        const li = document.createElement('li');
        li.textContent = el;
        catalogList.append(li);
    });

    const allLi = catalogList.querySelectorAll('li');

    catalogBtn.addEventListener('click', (e) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }
       
        if (e.target.tagName === 'LI') {
            cards.forEach(el => {
                if (el.dataset.category === e.target.textContent) {
                    el.parentNode.style.display = '';
                } else {
                    el.parentNode.style.display = 'none';
                }
            });
            allLi.forEach(el => {
                if (el === e.target) {
                    el.classList.add('active');
                } else {
                    el.classList.remove('active');
                }
            });
            filterTitle.textContent = e.target.textContent;
            filterTitle.classList.add('filtertitle');
            filter();
        }
    });
}