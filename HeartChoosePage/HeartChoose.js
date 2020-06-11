window.onload = function () {
    getGoodList();
    showTop();
    tocartLogo();
    toAddCart();
};

// 初始化商品列表
function getGoodList() {
    var goodsBox = document.getElementsByClassName('goods-box')[0];

    HeartChooseList.forEach(good => {
        var el = document.createElement('div');
        el.className = 'col goods';
        el.innerHTML = `
        <img class="goods-img" src="${good.img}" >
        <div class="goods-info">
            <span class="cprice">￥ <span class="goods-price"></span>${good.price}</span>
            <div class="goods-text">${good.title}</div>
            <button class="btn btn-outline-danger goods-btn">加入购物车</button>
            <img class="love-logo" src="../img/icon/love.svg">
        </div>
        `;
        goodsBox.appendChild(el);
    });
}


// top滚动显示隐藏
function showTop() {
    var top = document.getElementsByClassName("top")[0];

    window.onscroll = () => {
        if (window.pageYOffset > 600) {
            top.classList.add('show');
            $('.totop-cart').fadeIn();
        } else {
            top.classList.remove('show');
            $('.totop-cart').fadeOut();
        }
    };
}


//购物车小logo
function tocartLogo() {
    var tocartLogo = document.getElementsByClassName('totop-cart')[0];
    tocartLogo.onclick = () => {
        window.open('../cart/index.html', '_self');
    }
}


// 点击加购按钮
function toAddCart() {
    var toCart = $('.goods-btn');
    for (let i = 0; i < toCart.length; ++i) {
        toCart[i].onclick = function () {  
            $('.to-cart-move-img').show(600).animate({
                top: 38
            }, 600);
            $('.to-cart-move-img').hide(1).css({
                top: 0
            });
            setStorage('cartId', i+124);
        }       
    }
}