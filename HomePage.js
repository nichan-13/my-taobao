window.onload = function () {
  cartItemsNum();
  getGoodsList();
  getItemsList();
  getLikeList();
  Tops();
  tocartLogo();
  searchNav();
  searchNavTop();
  getfeedBackPage();
  closeQrCode();
  toHeartChoose();
  itemsCarousel();
  onToDetail();
};


// 初始化购物车商品数量
function cartItemsNum() {
  if (getStorage('cartItemsNum') === null) {
    setStorage('cartItemsNum', 0);
  }
  $('.cartItem-num').text(getStorage('cartItemsNum').slice(-1));
}


// top栏点击切换
function Tops() {
  var allTops = document.getElementsByClassName("top_text");

  for (var i = 0; i < allTops.length; i++) {
    allTops[i].addEventListener('click', function (evt) { //以免反馈按钮的点击事件被覆盖
      if (evt.currentTarget.className.includes("top_selected")) {
        return;
      } else {
        for (var i = 0; i < allTops.length; i++) {
          if (allTops[i].className.includes("top_selected")) {
            allTops[i].classList.remove("top_selected");
          }
        }
        evt.currentTarget.classList.add("top_selected");
      }

      if (evt.target.className.includes('top_text_one')) {
        $('html,body').animate({
          scrollTop: '0px'
        }, 600);
      } else if (evt.target.className.includes('top_text_three')) {
        $('html,body').animate({
          scrollTop: '430px'
        }, 600);
      } else if (evt.target.className.includes('top_text_four')) {
        $('html,body').animate({
          scrollTop: '1130px'
        }, 600);
      } else if (evt.target.className.includes('top_text_five')) {
        $('html,body').animate({
          scrollTop: '1630px'
        }, 600);
      } else {
        $('html,body').animate({
          scrollTop: '0px'
        }, 600);
        evt.currentTarget.classList.remove('top_selected');
        document.getElementsByClassName('top_text_one')[0].classList.add('top_selected');
      }

      evt.stopPropagation(); //阻止事件流产生
    });
  }

}


// 购物车小logo
function tocartLogo() {
  var tocartLogo = document.getElementsByClassName('totop-cart')[0];
  tocartLogo.onclick = () => {
    window.open('./cart/index.html', '_self');
  }
}


// 搜索框上小导航条切换
function searchNav() {
  var allNavs = document.getElementsByClassName("searchbox-nav-li");

  for (let i = 0; i < allNavs.length; i++) {
    allNavs[i].onclick = function () {
      for (var i = 0; i < allNavs.length; i++) {
        if (allNavs[i].className.includes("searchbox-nav-selected")) {
          allNavs[i].classList.remove("searchbox-nav-selected");
        }
        this.classList.add("searchbox-nav-selected");
      }
      //点击天猫标签时下方链接去除
      var links = document.getElementsByClassName('headerbox-searchbox-link')[0];
      if (this.className.includes("tianmao")) {
        links.classList.add('unshow');
      } else {
        links.classList.remove('unshow');
      }
    }
  }
}


// 搜索框滚动固定顶部
function searchNavTop() {
  //top栏变换位置
  var topBox = document.getElementsByClassName('totop-box')[0];
  //购物车小logo
  var tocartLogo = document.getElementsByClassName('totop-cart')[0];
  window.onscroll = function () {
    var topScroll = window.pageYOffset; //滚动的距离,距离顶部的距离
    var moveBox = document.getElementsByClassName('movebox')[0];
    var searchBox = document.getElementsByClassName('headerbox-searchbox-part')[0];
    if (topScroll > 150) {
      moveBox.classList.add('show'); //当滚动距离大于150px时执行
      searchBox.classList.add('headerbox-searchbox-part-move');
      topBox.style.top = '70px';
      tocartLogo.classList.add('show');
    } else {
      moveBox.classList.remove('show');
      searchBox.classList.remove('headerbox-searchbox-part-move');
      topBox.style.top = '185px';
      tocartLogo.classList.remove('show');
    }
  };
}


// 关闭二维码
function closeQrCode() {
  var qrCode = document.getElementsByClassName('headerbox-qr-code')[0]; //二维码
  var qrClose = document.getElementsByClassName('qr-close')[0]; //关闭二维码
  qrClose.onclick = function () {
    qrCode.classList.add('unshow');
  }
}


// 淘宝心选
function toHeartChoose() {
  var like = document.getElementsByClassName('heart-choose')[0];
  like.onclick = () => {
    window.open("./HeartChoosePage/HeartChoose.html", '_self');
  };
}


// 初始化轮播商品
function getItemsList() {
  var itemBox = document.getElementsByClassName('scroll-items-box')[0];

  itemList.forEach((item) => {
    var l = document.createElement('li');
    l.className = 'scroll-items goods';
    l.innerHTML = `
      <img class="items-img" src="${item.img}">
      <div class="scroll-items-section">
        <span class="scroll-items-text items-title">${item.title}</span>
        <div class="scroll-items-classify">${item.logo}</div>
        <button class="scroll-items-btn to-cart"><span class="glyphicon glyphicon-shopping-cart scorll-cart-logo"></span> 加入购物车</button>
      </div>
    `;
    itemBox.appendChild(l);
  });
}
// 商品块轮播
function itemsCarousel() {
  var leftBtn = document.getElementsByClassName('scroll-left')[0]; //左按钮
  var rightBtn = document.getElementsByClassName('scroll-right')[0]; //右按钮
  var allBox = document.getElementsByClassName('scroll-items-box')[0]; //存储商品整条
  var showBox = document.getElementsByClassName('scroll-items-show')[0]; //展示盒子
  var scrollBox = document.getElementsByClassName('scroll-box')[0]; //整块
  var items = document.getElementsByClassName('scroll-items'); //商品
  var itemsMove = parseInt(showBox.style.width) / 3; //每个商品块偏移的宽度
  var itemsNum = items.length; //商品总数

  var move = (movePX) => {
    var moveLeft = parseInt(allBox.style.left) + movePX;
    allBox.style.left = moveLeft + 'px';

    //判断位置
    if (moveLeft < -(itemsNum - 3) * itemsMove) { //只剩最后三个商品
      allBox.style.left = 0;
    }
    if (moveLeft > 0) {
      allBox.style.left = -(itemsNum - 3) * itemsMove + 'px';
    }
  }
  // 左右按钮
  leftBtn.onclick = () => {
    move(itemsMove);
  };
  rightBtn.onclick = () => {
    move(-itemsMove);
  }
  // 自动轮播
  var timer = null;

  function play() {
    timer = setInterval(() => {
      rightBtn.onclick();
    }, 3000)
  }
  play();
  // 鼠标移入清除定时器
  function stop() {
    clearInterval(timer);
    timer = null;
  }
  scrollBox.onmouseover = stop;
  scrollBox.onmouseout = play;
}


// 反馈页面
function getfeedBackPage() {
  var feedbackBtn = document.getElementsByClassName('top_text_seven')[0]; //反馈按钮
  var feedback = document.getElementsByClassName('feedback_box')[0]; //反馈页面
  var feedbackClosed = document.getElementsByClassName('glyphicon-remove')[0]; //反馈页面关闭按钮

  feedbackBtn.addEventListener('click', function (evt) { //以免反馈按钮的点击事件被覆盖
    feedback.classList.add('show');
    evt.stopPropagation(); //阻止事件流产生
  });
  feedbackClosed.onclick = function () {
    feedback.classList.remove('show');
  };
}


// 跳转商品详情页面,加购按钮
function onToDetail() {
  var goods = document.getElementsByClassName('goods');
  var goodsImg = document.getElementsByClassName('items-img');
  var goodsText = document.getElementsByClassName('items-title');

  var num = getStorage('cartItemsNum') === 'null' ? setStorage('cartItemsNum', 0) : getStorage('cartItemsNum').slice(-1);
  for (let i = 0; i < goods.length; i++) {
    goods[i].addEventListener('click', (evt) => {
      // console.log(evt.currentTarget);
      // console.log(evt.target);
      if (evt.target.className.includes('to-cart')) { //加购按钮
        num++;
        toAddCart(i - 3, num);
      } else { //详情页
        var v1 = goodsImg[i].src;
        var v2 = goodsText[i].innerHTML;
        var url = `./detailPage/detail.html?imgUrl=${encodeURIComponent(v1)}&title=${encodeURIComponent(v2)}`;
        window.open(url, '_self');
      }
      evt.stopPropagation();
    });
  }
}


// 初始化有好货爱逛街商品
function getGoodsList() {
  var goodsYhh = document.getElementsByClassName('col-md-6')[0]; //有好货
  var goodsAgj = document.getElementsByClassName('col-md-6')[1]; //爱逛街

  // 箭头函数
  goodListYhh.forEach((goodYhh) => {
    var el = document.createElement('div');
    el.className = 'col-xs-4 col-sm-4 col-md-4 goods';
    el.innerHTML = `
      <div class="goods-img">
        <img class="img-thumbnail items-img" src="${goodYhh.img}">
      </div>
      
      <div class="info">
        <h4 class="info-text items-title">${goodYhh.title}</h4>
        <p class="info-p">${goodYhh.text}</p>
        <p class="info-logo">
          <span class="info-smileface">☺</span>
          <span> ${goodYhh.smile} </span>人说好
        </p>
      </div>
      <button type="button" class="btn btn-xs btn-primary to-cart">加入购物车</button>
      `;
    goodsYhh.appendChild(el);
  });

  goodListAgj.forEach((goodAgj) => {
    var el = document.createElement('div');
    el.className = 'col-xs-4 col-sm-4 col-md-4 goods';
    el.innerHTML = `
    <div class="goods-img">
      <img class="img-thumbnail items-img" src="${goodAgj.img}">
    </div>

    <div class="info">
      <div class="info-agj-text">
        <h5 class="glyphicon glyphicon-tags" style="color: rgb(255, 81, 0);">
          <span class="agj-remark items-title">${goodAgj.title}</span>
        </h5>
      </div>
      <div class="info-agj-usermessage">
        <img class="img-circle head-protraits-img" src="${goodAgj.headImg}">
        <span class="user-name">&nbsp;${goodAgj.name}</span>
      </div>
    </div>  
    <button type="button" class="btn btn-xs btn-primary to-cart">加入购物车</button>
    `;
    goodsAgj.appendChild(el);
  });
}


// 初始化猜你喜欢商品
function getLikeList() {
  var likeListBox = document.getElementsByClassName('like-items-Box')[0];

  likeList.forEach((item) => {
    var el = document.createElement('li');
    el.className = 'like-items goods';
    el.innerHTML = `
            <div class="like-items-img-box">
              <img class="like-items-img items-img" src="${item.img}">
            </div>
            <div class="like-items-info">
              <h4 class="like-items-text items-title">${item.title}</h4>
              <span class="like-items-info-price">￥ <span class="like-items-price">${item.price}</span></span>
              <span class="like-items-info-xl">${item.logo}</span>
            </div>
            <div class="like-items-hover">
              <button class="like-tocart-btn to-cart"><span class="glyphicon glyphicon-shopping-cart tocart-logo"></span> 加入购物车</button>
            </div>`;
    likeListBox.appendChild(el);
  });
}


// 点击加购按钮
function toAddCart(i, num) {
  $('.cartItem-num').text(num);
  $('.to-cart-move-img').show(600).animate({
    top: 38
  }, 600);
  $('.to-cart-move-img').hide(1).css({
    top: 0
  });
  setStorage('cartId', i);
}