window.onload = function() {
    detailPage();
    imgAMP();
    userAddr();
    numberChange();
}

// 获取商品图片和文字
function detailPage() {
    var search = null;
    // 购物车数量
    $('.cartItem-num').text(getStorage('cartItemsNum').slice(-1));

    if (typeof parseSearchParams !== undefined) {
        search = parseSearchParams();
    }

    if (search) {
        document.getElementById('detail-img').src = search.imgUrl;        //图片
        document.getElementById('detail-bigimg').src = search.imgUrl;     //放大图片
        document.getElementById('detail-mini-img').src = search.imgUrl;   //缩略图
        document.getElementById('detail-text').innerHTML = search.title;  //文本
        // document.getElementById('price').innerHTML = search.price;        //价格
    }
}

//图片放大
function imgAMP() {
    var smallBox = document.getElementById('samll-imgbox');  //小图片盒子
    var mask = document.getElementById('mask');              //滑动小块
    var bigbox = document.getElementById('bigimg-box');      //大图片盒子
    var bigimg = document.getElementById('detail-bigimg');   //大图片
    var box = document.getElementById('box');                //小图片最外盒子

    //移入
    smallBox.onmouseover = function() {
        mask.classList.add('show');
        bigbox.classList.add('show');
    };
    //移出
    smallBox.onmouseout = function() {
        mask.classList.remove('show');
        bigbox.classList.remove('show');
    };
    //可移动盒子
    smallBox.onmousemove = function(event) {
        var event = event || window.event;

        var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
        var pageY= event.pageY || event.clientY + document.documentElement.scrollTop;

        var boxX = pageX - box.offsetLeft;
        var boxY = pageY - box.offsetTop;

        var maskX = boxX - mask.offsetWidth / 2;
        var maskY = boxY - mask.offsetHeight / 2;

        //检测mask位置
        if (maskX < 0) {
            maskX = 0;  
        }
        if (maskX > smallBox.offsetWidth - mask.offsetWidth) {
            maskX = smallBox.offsetWidth - mask.offsetWidth
        }
        if (maskY < 0) {
            maskY = 0;
        }
        if (maskY > smallBox.offsetHeight - mask.offsetHeight) {
            maskY = smallBox.offsetHeight - mask.offsetHeight;
        }

        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px'

        //计算大图和小图的移动范围，根据比例设置大图的移动
        var bigImgToMove = bigimg.offsetWidth - bigbox.offsetWidth;

        var maskToMove = smallBox.offsetWidth - mask.offsetWidth;

        var rate = bigImgToMove / maskToMove;

        //横向和纵向
        bigimg.style.left = - rate * maskX + 'px';
        bigimg.style.top = - rate *maskY + 'px';
    };
}

// 地址省市级联动
function userAddr() {
    //省份数组
    var provinceArr = ['上海','江苏','湖北'];
    //城市数组
    var cityArr = [
        ['上海市'],
        ['苏州市','南京市','扬州市'],
        ['武汉市','天门市','仙桃市']
    ];
    //区域数组
    var countryArr = [
        [
            ['黄埔区','静安区','长宁区','浦东区']
        ],[
            ['虎丘区','吴中区','姑苏区'],
            ['玄武区','秦淮区','鼓楼区'],
            ['江都区','广陵区']
        ],[
            ['江夏区','洪山区','武昌区'],
            ['竟陵','渔薪'],
            ['哈哈','呱呱']
        ]
    ];

    //第一步
    function creatOption (obj, data) {
        for (var i in data) {
            var op = new Option(data[i], i);
            obj.options.add(op);
        }
    }
    var province = document.getElementById('province');
    creatOption(province, provinceArr);
    
    //第二步
    var city = document.getElementById('city');
    province.onchange = function () {
        city.options.length = 0;
        // city.options.length = 1;
        creatOption(city, cityArr[province.value]);
        if (province.value >= 0) {
            city.onchange();
        } else {
            country.options.length = 0;
        }
    };

    //第三步
    var country = document.getElementById('country');
    city.onchange = function () {
        country.options.length = 0;
        // country.options.length = 1;
        creatOption(country, countryArr[province.value][city.value]);
    }; 
}

//商品数量的加减及输入框数值判断
function numberChange() {
    var num = document.getElementsByClassName('number-text')[0];
    var add = document.getElementsByClassName('number-right-btn')[0];
    var minus = document.getElementsByClassName('number-left-btn')[0];
    add.onclick = function () {
        num.value++;
    };
    minus.onclick = function () {
        if (num.value > 1) {
            num.value--;
        } else {
            document.getElementsByClassName('nominus')[0].classList.add('show');
        }
    };
    num.oninput = function () {
        if (isNaN(num.value) && num.value % 1 !== 0) {
            num.value = 1;
            document.getElementsByClassName('numerror')[0].classList.add('show');
        }
    };
}


