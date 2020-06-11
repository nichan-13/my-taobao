$(function () {
    getCartGood();
    getItemsTotal();
    settlement();
    userAddrSelect();
    noRefresh();
});


//初始化购物车列表
function getCartGood() {
    if (getStorage('cartId') === null) {
        return;
    } else {
        getItemsTotal();
        var cartgoods = document.getElementsByClassName('cart-items-box')[0];
        // var IdList = getCookie('itemsId').split(',').splice(1);
        var IdList = getStorage('cartId').split(',');
        var ItemsList = [];
        for (let i in IdList) {
            ItemsList.push(toCartList[IdList[i]]);
        }

        //统计重复数据
        var redoNum = () => {
            return IdList.reduce((prev, next) => {
                prev[next] = (prev[next] + 1) || 1;
                return prev;
            }, {});
        }
        var resNum = redoNum();

        //去重
        var itemsOnly = ItemsList.filter((val, index) => ItemsList.indexOf(val) === index);

        //列表加入数量
        itemsOnly.map(val => val.num = resNum[val.id]);

        itemsOnly.forEach((cartgood) => {
            var el = document.createElement('div');
            el.className = 'order_content';
            el.innerHTML = `
            <div class="order_content-box">
                <li class="first"><input class="ckbtn" type="checkbox" onclick="onSelect(this)"/></li>
                <li class="second">
                    <div class="second_left">
                        <img class="item-img" src="${cartgood.img}" alt="加载失败"/>
                    </div>
                    <div class="second_right">
                        <div class="second_right_top">${cartgood.title}</div>
                        <div class="img3"><img src="../img/shopCart/img3.png"></div>
                    </div>
                    <li class="third">
                        <!-- <del>￥1299.00</del> -->
                        ￥<span class="spdanjia">${cartgood.price}</span>
                    </li>
                </li>                
                <li class="fourth">
                    <button class="fourth_left" onclick="onMinus(this)">-</button>
                    <input class="text" type="text" value="${cartgood.num}" oninput="change(this)"/>
                    <button class="fourth_right" onclick="onAdd(this)">+</button>
                </li>
                <li class="fifth">￥<span class="price">${cartgood.price}</span></li>
                <li class="sixth">
                    <span class="remove">移入收藏夹</span></br>
                    <span class="delete" onclick="delPlay(this)" onmouseover="onOverDel(this)" onmouseout="onOutDel(this)">删除</span>
                    <span class="similar">相似宝贝</span>
                </li>
            </div>`;
            cartgoods.appendChild(el);
        });
    }
}


//获取商品总数
function getItemsTotal() {
    var items = document.getElementsByClassName('order_content-box');
    var store = document.getElementsByClassName('middle')[0];
    var footer = document.getElementsByClassName('footer')[0];
    var noItem = document.getElementsByClassName('no-items')[0];
    var ItemsNum = items.length;
    document.getElementsByClassName('allNum')[0].innerHTML = ItemsNum; //全部商品
    setStorage('cartItemsNum', ItemsNum);
    $('.cartItem-num').text(getStorage('cartItemsNum').slice(-1));

    if (ItemsNum === 0) {
        store.style.display = 'none';
        footer.classList.remove('show');
        noItem.classList.add('show');
    } else {
        store.style.display = 'block';
        footer.classList.add('show');
        noItem.classList.remove('show');
    }
}


//勾选结算
function onSelect(el) {
    var parent = el.parentNode.parentNode.parentNode;
    var price = parent.getElementsByClassName('spdanjia')[0].innerText; //单价
    var num = parent.getElementsByClassName('text')[0].value; //单个商品数量
    var checkbox = parent.getElementsByClassName('ckbtn')[0]; //当前复选框  

    //背景高亮
    if (checkbox.checked) {
        parent.style.backgroundColor = '#f4f6fa';
    } else {
        unTotalCheck();
        parent.style.backgroundColor = '#fcfcfc';
    }
    getPrice(price, num, parent);
    getTotalPrice();
    getSubmitDlg();
    getTotalNum();
}


//结算按钮 
function getSubmitDlg() {
    var checkedBox = document.getElementsByClassName('ckbtn'); //获取所有复选框
    var submitDlg = document.getElementsByClassName('submit-btn')[0]; //获取结算按钮

    submitDlg.classList.add('unfocused');
    submitDlg.classList.remove('focused');

    for (var j = 0; j < checkedBox.length; j++) {
        if (checkedBox[j].checked) {
            submitDlg.classList.remove('unfocused');
            submitDlg.classList.add('focused');
        }
    }
}


//增加按钮
function onAdd(el) {
    var parent = el.parentNode.parentNode.parentNode;
    var inputAdd = parent.getElementsByClassName('text')[0];
    var checkbox = parent.getElementsByClassName('ckbtn')[0];
    inputAdd.value++;
    num = inputAdd.value;
    var price = parent.getElementsByClassName('spdanjia')[0].innerText;
    getPrice(price, num, parent);
    if (checkbox.checked) {
        getTotalPrice();
        getTotalNum();
    }
}


//减少按钮
function onMinus(el) {
    var parent = el.parentNode.parentNode.parentNode;
    var inputMinus = parent.getElementsByClassName('text')[0];
    var checkbox = parent.getElementsByClassName('ckbtn')[0];
    if (inputMinus.value <= 1) {
        $('#myModal').modal('show'); //减少模态框
    } else {
        inputMinus.value--;
        num = inputMinus.value;
        var price = parent.getElementsByClassName('spdanjia')[0].innerText;
        getPrice(price, num, parent);
        if (checkbox.checked) {
            getTotalPrice();
            getTotalNum();
        }
    }
}


//文本框限制
function change(el) {
    var parent = el.parentNode.parentNode.parentNode;
    var num = parent.getElementsByClassName('text')[0].value;
    var price = parent.getElementsByClassName('spdanjia')[0].innerText;
    var checkbox = parent.getElementsByClassName('ckbtn')[0];
    if (!isNaN(num) && num % 1 === 0) {
        getPrice(price, num, parent);
        if (checkbox.checked) {
            getTotalPrice();
            getTotalNum();
        }
    } else {
        num = 1;
        $('#myModalNum').modal('show');
    }
}


//获取单件商品总价
function getPrice(price, num, parent) {
    onePrice = price * num;
    parent.getElementsByClassName('price')[0].textContent = onePrice.toFixed(2);
}


//获取全部商品件数
function getTotalNum() {
    var checkboxDom1 = document.getElementsByClassName('ckbtn');
    var totalNumDom = document.getElementsByClassName('text');
    var totalNum = 0;
    for (var i = 0; i < checkboxDom1.length; i++) {
        if (checkboxDom1[i].checked) {
            totalNum += Number(totalNumDom[i].value);
        }
    }
    document.getElementsByClassName('totalNum')[0].textContent = totalNum;
}


//获取全部商品总价
function getTotalPrice() {
    var checkboxDom = document.getElementsByClassName('ckbtn');
    var totalPriceDom = document.getElementsByClassName('price');
    var totalPrice = 0;
    for (var i = 0; i < checkboxDom.length; i++) {
        if (checkboxDom[i].checked) {
            totalPrice += Number(totalPriceDom[i].innerText);
        }
    }
    document.getElementsByClassName('totalPrice')[0].textContent = totalPrice.toFixed(2);
    // 结算总价
    var payPrice = $('.totalPrice').text();
    $('.body-total-price').text(payPrice);
    $('.footer-content-price').text(payPrice);
}


//删除商品
function delPlay(el) {
    $('#myModalDel').modal('show');
    var del = document.getElementsByClassName('del-btn')[0];
    del.onclick = () => {
        var parent = el.parentNode.parentNode.parentNode;
        parent.parentNode.removeChild(parent);

        cartNull();
        getTotalNum();
        getTotalPrice();
        getItemsTotal();
        getSubmitDlg();
    }
}

function delItem(el) {
    var parent = el.parentNode.parentNode.parentNode;
    parent.parentNode.removeChild(parent);
    getTotalNum();
    getTotalPrice();
}

//删除选中所有商品（全选删除）
function delAll() {
    $('#myModalDelAll').modal('show');
    var checkbox = document.getElementsByClassName('ckbtn');
    var delAllBtn = document.getElementsByClassName('del-all-btn')[0];
    delAllBtn.onclick = () => {
        for (var i = checkbox.length - 1; i >= 0; i--) {
            if (checkbox[i].checked) {
                delItem(checkbox[i]);
            }
        }
        cartNull();
        unTotalCheck();
        getSubmitDlg();
        getItemsTotal();
    }
}

//购物车无数据
function cartNull() {
    var items = document.getElementsByClassName('order_content-box');
    if (items.length === 0) {
        clearStorage('cartId');
    }
}


//相似宝贝
function onOverDel(el) {
    el.parentNode.getElementsByClassName('similar')[0].classList.add('show');
}

function onOutDel(el) {
    el.parentNode.getElementsByClassName('similar')[0].classList.remove('show');
}


//全选、反选
function checkAll(el) {
    // var parent = el.parentNode.parentNode.parentNode;
    var checkbox = document.getElementsByClassName('ckbtn');
    var totalCheck = document.getElementsByClassName('ckbtn-all');
    var checkId = el.id; //获取店铺全选id
    var totalChecked = el.checked; //全选
    if (checkId != 'ckbtn-all') {
        for (var j = 0; j < totalCheck.length; j++) {
            totalCheck[j].checked = totalChecked;
        }
    }

    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = totalChecked;
        onSelect(checkbox[i]);
    }
}


//全选按钮取消
function unTotalCheck() {
    var totalCheck = document.getElementsByClassName('ckbtn-all');
    for (var i = 0; i < totalCheck.length; i++) {
        totalCheck[i].checked = false;
    }
}


// 结算
function settlement() {
    $('.submit-btn').on('click', () => {
        $('#settlement-Modal').modal('show');

        // 传入结算商品
        var checkbox = $('.ckbtn');
        var allPayList = [];
        var toPayList = [{}];
        for (let i = 0; i < checkbox.length; ++i) {
            if (checkbox[i].checked) {
                var img = $('.item-img')[i].src;
                var title = $('.second_right_top')[i].innerText;
                var price = $('.spdanjia')[i].innerText;
                var num = $('.text')[i].value;
                var tolprice = $('.price')[i].innerText;
                var payList = toPayList.map(() => {
                    return {
                        img: img,
                        title: title,
                        price: price,
                        num: num,
                        tolprice: tolprice
                    };
                });
                allPayList.push(payList[0]);
            }
        }

        // 结算商品初始化
        var payListBox = $('.paygood-box')[0];
        allPayList.forEach((payItem) => {
            var el = document.createElement('div');
            el.className = 'order_content body-content';
            el.innerHTML = `
                <li class="body-second">
                    <div class="body-second-img">
                        <img src="${payItem.img}" alt="加载失败"/>
                    </div>
                    <div class="body-second-right">
                        <div class="body-second-right-top">${payItem.title}</div>
                        <img class="body-second-right-logo" src="../img/shopCart/img3.png">
                        <span class="body-second-right-text">发货时间：付款后15天内</span>
                    </div>
                    <li class="body-third">
                        <span class="settlement-dj">${payItem.price}</span>
                    </li>
                </li>                
                <li class="body-fourth">
                    <span class="settlement-num">${payItem.num}</span>
                </li>
                <li class="body-fifth">
                    <span>无优惠</span>
                </li>
                <li class="body-sixth">
                    <span class="settlement-zj">${payItem.tolprice}</span>
                </li>`;
            payListBox.appendChild(el);
        });

        // 详细地址
        $('#delivery-form select,.detailed-addr-text').change(() => {
            var province = $("#province option:selected").text();
            var city = $("#city option:selected").text();
            var country = $("#country option:selected").text();
            var detailAddr = $('.detailed-addr-text').val();
            var addr = province + ' ' + city + ' ' + country + ' ' + detailAddr;
            $('.footer-detail-addr').text(addr);
        });
        // 用户详细信息
        $('.addrp-name-text,.addrp-tel-text').on('input propertychange', () => {
            var userName = $('.addrp-name-text').val();
            var userTel = $('.addrp-tel-text').val();
            var userMessage = userName + ' ' + userTel;
            $('.footer-detail-user').text(userMessage);
        });
    });

    // 订单页面初始化
    $('.cancel-buy-btn,.buy-btn').click(() => {
        allPayList = [];
        $('.paygood-box').empty(); // empty()删除当前元素的所有子元素 remove()删除当前元素
    });
    // 提交订单
    $('.buy-btn').click(() => {
        $('#pay-success-modal').modal('show');
        $('.ckbtn:checked').parents('.order_content').remove(); // 删除已购买的商品
        cartNull();
        unTotalCheck();
        getSubmitDlg();
        getItemsTotal();
        getTotalNum();
        getTotalPrice();
    });

}


// 地址省市级联动
function userAddrSelect() {
    //省份数组
    var provinceArr = ['上海', '江苏', '湖北'];
    //城市数组
    var cityArr = [
        ['上海市'],
        ['苏州市', '南京市', '扬州市'],
        ['武汉市', '天门市']
    ];
    //区域数组
    var countryArr = [
        [
            ['黄埔区', '静安区', '长宁区', '浦东区']
        ],
        [
            ['虎丘区', '吴中区', '姑苏区'],
            ['玄武区', '秦淮区', '鼓楼区'],
            ['江都区', '广陵区']
        ],
        [
            ['江夏区', '洪山区', '武昌区'],
            ['竟陵', '渔薪']
        ]
    ];

    //第一步
    function creatOption(obj, data) {
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


// 页面禁止刷新
function noRefresh() {
    //禁止F5刷新
    document.onkeydown = function () {
        if (event.keyCode == 116) {
            event.keyCode = 0;
            event.cancelBubble = true;
            return false;
        }
    }
    //禁止右键弹出菜单   
    document.oncontextmenu = function () {
        return false;
    }
}