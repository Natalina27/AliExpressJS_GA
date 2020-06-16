document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('.search');
    const cartBtn = document.getElementById('cart');
    const wishlistBtn = document.getElementById('wishlist');
    const goodsWrapper = document.querySelector('.goods-wrapper');
    const cart = document.querySelector('.cart');
    const categoryPrnt = document.querySelector('.category');
    const cardCounter = cartBtn.querySelector('.counter');
    const wishlistCounter = wishlistBtn.querySelector('.counter');
    console.log('cardCounter', cardCounter);
    console.log('wishlistCounter', wishlistCounter);


    const wishlist = [];

    const loading = () => {
        goodsWrapper.innerHTML =
            `<div id="spinner">
                <div class="spinner-loading">
                <div><div><div></div>
                </div><div><div></div>
                </div><div><div></div>
                </div><div><div></div>
                </div></div></div></div>`
    };

    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        //console.log(card);
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = `<div class="card">
                            <div class="card-img-wrapper">
                                <img class="card-img-top" src="${img}" alt="">
                                <button class="card-add-wishlist ${wishlist.includes(id) ? 'active' : ''}"
                                data-goods-id="${id}"></button>
                            </div>
                            <div class="card-body justify-content-between">
                                <a href="#" class="card-title">${title}</a>
                                <div class="card-price">${+(price / 70).toFixed(2)} € </div>
                                <div>
                                    <button class="card-add-cart"
                                    data-goods-id="${id}">Добавить в корзину</button>
                                </div>
                            </div>
                        </div>`;

        //console.log(card);
        return card;
    };

    const renderCard = (goods) => {
        goodsWrapper.textContent = '';
        if (goods.length) {
            goods.forEach(({price, id, title, imgMin}) => {
                goodsWrapper.append(createCardGoods(id, title, price, imgMin));
            });
        } else {
            goodsWrapper.textContent = ' ❌ Sorry the goods are not found ....';
        }
    };


    const closeCart = (e) => {
        const target = e.target; // где был клик?

        if (target === cart || target.classList.contains('cart-close') || e.key === "Escape") {
            cart.style.display = '';
            document.removeEventListener('keyup', closeCart);
        }

        console.log(e.key);
    };

    const openCart = (e) => {
        e.preventDefault(); //запрет на переход по ссылке (запрет действий браузера по умолчанию)
        cart.style.display = 'flex';
        document.addEventListener('keyup', closeCart);
    };

    const getGoods = (handler, filter) => {
        loading();
        fetch('./db/db.json')
            .then(response => response.json())
            .then(filter)
            .then(handler);
    };

    //рандомная сортировка
    const randomSort = (items) => {
        return items.sort(() => Math.random() - 0.5)
    };

    //выбор категории
    const chooseCategory = e => {
        e.preventDefault();
        const target = e.target;
        const category = target.dataset.category;

        if (target.classList.contains('category-item')) {
            getGoods(renderCard, goods => goods.filter(item => item.category.includes(category)));
        }
    };

    //поиск товаров
    const searchGoods = e => {
        e.preventDefault();
        const input = e.target.elements.searchGoods;
        const inputValue = input.value.trim();

        if (inputValue !== '') {
            const searchStr = new RegExp(inputValue, 'i');
            getGoods(renderCard, goods => goods.filter(item => searchStr.test(item.title)));
        } else {
            search.classList.add('error');
            setTimeout(() => {
                search.classList.remove('error');
            }, 2000)
        }

        input.value = '';
    }

    //wish list
    const checkCount = () => {
        wishlistCounter.textContent = wishlist.length.toString();
        console.log(typeof wishlistCounter.textContent);
        console.log(typeof wishlist.length);

    };

    const storageQuery = (get) => {
        if (get) {
            if (localStorage.getItem('wishlist')) {
                JSON.parse(localStorage.getItem('wishlist')).forEach(id => wishlist.push(id));
            }
        } else {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
        checkCount();
    };

    const toggleWishList = (id, e) => {
        if (wishlist.includes(id)) {
            wishlist.splice(wishlist.indexOf(id), 1);
            e.classList.remove('active');
        } else {
            wishlist.push(id);
            e.classList.add('active');
        }

        checkCount();
        storageQuery();
        console.log(wishlist);
    }

    const handlerGoods = e => {
        const target = e.target;

        if (target.classList.contains('card-add-wishlist')) {
            toggleWishList(target.dataset.goodsId, target);

        }
    }

    const showWishlist = () => {

    }

    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);
    categoryPrnt.addEventListener('click', chooseCategory);
    search.addEventListener('submit', searchGoods);
    goodsWrapper.addEventListener('click', handlerGoods);
    wishlistBtn.addEventListener('click', showWishlist);


    getGoods(renderCard, randomSort);
    storageQuery(true);
});

