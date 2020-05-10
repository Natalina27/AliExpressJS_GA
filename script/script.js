document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('.search');
        //console.log('search: ', search);
        //console.dir('search');

    const cartBtn = document.getElementById('cart');
    const wishlistBtn = document.getElementById('wishlist');

    const goodsWrapper = document.querySelector('.goods-wrapper');


    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
            //console.log(card);
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = `<div class="card">
                            <div class="card-img-wrapper">
                                <img class="card-img-top" src="${img}" alt="">
                                <button class="card-add-wishlist"
                                data-goods-id="${id}"></button>
                            </div>
                            <div class="card-body justify-content-between">
                                <a href="#" class="card-title">${title}</a>
                                <div class="card-price">${price} руб.</div>
                                <div>
                                    <button class="card-add-cart"
                                    data-goods-id="${id}">Добавить в корзину</button>
                                </div>
                            </div>
                        </div>`;

            //console.log(card);
        return card;
    };

    goodsWrapper.append(createCardGoods(1, 'Дартс', 2000, "./img/temp/Archer.jpg"));
    goodsWrapper.append(createCardGoods(2, 'Фламинго', 2000, "./img/temp/Flamingo.jpg"));
    goodsWrapper.append(createCardGoods(3,'Носки', 333, 'img/temp/Socks.jpg'));

    const closeCart = (event) => {
        const target = event.target;

        if(target === cart || target.classList.contains('cart-close')){
            cart.style.display = '';
        }

        console.log(target.classList.contains('cart-close'));
        console.log(target.classList.contains('active'));

    };

    const openCart = () => {
        cart.style.display = 'flex';
    };

    cartBtn.addEventListener('click', openCart);
    cartBtn.addEventListener('click', closeCart);
});
