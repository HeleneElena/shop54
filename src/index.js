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

// фильтр Акции и поиск тоже, фильтр Price
function actionPage() {
    const cards = document.querySelectorAll('.goods .card'),
          discountCheckbox = document.querySelector('#discount-checkbox'),
          min = document.querySelector('#min'),
          max = document.querySelector('#max'),
          search = document.querySelector('.search-wrapper_input'),
          searchBtn = document.querySelector('.search-btn');

    function filter() {
        cards.forEach(el => {
            const cardPrice = el.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            const discount = el.querySelector('.card-sale');

        if ((min.value && price < min.value) || (max.value && price > max.value)) {
                el.parentNode.style.display = 'none';
            }  else if (discountCheckbox.checked && !discount) {
                el.parentNode.style.display = 'none';
            } else {
                el.parentNode.style.display = '';
            }
            
        });
    }

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
// end фильтр Акции, end фильтр Price

// получение данных с сервера
function getData() {
   const goodsWrapper = document.querySelector('.goods');
   return fetch('../db/db.json').then((response) => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error ('Es gibt einige Fehler: ' + response.status);
        }
    })
    .then(data => {
        return data;
    })
    .catch(err =>{
         console.warn(err); // об ошибке сообщение разработчику
         goodsWrapper.innerHTML = '<div style="color:red; font-size:2rem" >Etwas ist schief gelaufen</div>'; // об ошибке сообщение user
    });
}

// выводим карточки товара
function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach(el => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
				<div class="card" data-category="${el.category}">
                    ${el.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
					<div class="card-img-wrapper">
						<span class="card-img-top"
							style="background-image: url(${el.img})"></span>
					</div>
					<div class="card-body justify-content-between">
						<div class="card-price">${el.price} €</div>
						<h5 class="card-title">${el.title}</h5>
						<button class="btn btn-primary">In den Warenkorb</button>
					</div>
				</div>
        `;
        goodsWrapper.append(card);
    });
}
// end получение данных с сервера
// делаем каталог кнопку
function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card'),
          catalogList = document.querySelector('.catalog-list'),
          catalogBtn = document.querySelector('.catalog-button'),
          catalogWrapper = document.querySelector('.catalog');
    const categories = new Set();
    
    cards.forEach(el => {
        categories.add(el.dataset.category);
    });

    categories.forEach(el => {
        const li = document.createElement('li');
        li.textContent = el;
        catalogList.append(li);
    });

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
        }
    });
}

getData().then(data => {
    renderCards(data);
    toggleCheckbox();
    toggleCard();
    addCart();
    actionPage();
    renderCatalog();
});


