document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('.search');
    const cartBtn = document.getElementById('cart');
    const wishlistBtn = document.getElementById('wishlist');
    const goodsWrapper = document.querySelector('.goods-wrapper');
    let cart = document.querySelector('.cart');

    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        //console.log(card);
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = `<div class="card">
                            <div class="card-img-wrapper">
                                <img class="card-img-top" src="${img}" alt="">
                                <button class="card-add-wishlist"
                                data-goods-id="${id}"></button>
                            </div>
                            <div class="card-body justify-content-between">
                                <a href="#" class="card-title">${title}</a>
                                <div class="card-price">${price} € </div>
                                <div>
                                    <button class="card-add-cart"
                                    data-goods-id="${id}">Добавить в корзину</button>
                                </div>
                            </div>
                        </div>`;

        //console.log(card);
        return card;
    };

    goodsWrapper.append(createCardGoods(1, 'Дартс', 20, './img/temp/Archer.jpg'));
    goodsWrapper.append(createCardGoods(2, 'Фламинго', 20, './img/temp/Flamingo.jpg'));
    goodsWrapper.append(createCardGoods(3, 'Носки', 3.33, './img/temp/Socks.jpg'));

    const closeCart = (e) => {
        const target = e.target; // где был клик?

        if (target === cart || target.classList.contains('cart-close') || e.key === "Escape") {
            cart.style.display = '';
        }

        console.log(e.key);
    };




    const openCart = (e) => {
        e.preventDefault(); //запрет на переход по ссылке (запрет действий браузера по умолчанию)
        cart.style.display = 'flex';
    };

    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);
    document.addEventListener('keydown', closeCart);

});
