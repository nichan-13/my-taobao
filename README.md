# my-taobao

## 项目简介
  这是一个主要使用 `JavaScript` + `Html` + `css` ,使用了 `Bootstrap` 及 `jQuery` 框架，通过参考淘宝部分网页完成的小型在线购物商城，商品数据使用 `Storage` 进行存储和操作。


## 项目功能说明
1. 登录功能（只完成简单的网页效果）
	- 用户名: `Ooooh`
	- 密&ensp;码: `111111`  
	
2. 商品查看详情
	- 用户可查看商品的详细信息，判断是否需要商品。  
	
3. 加购商品功能
	- 用户可浏览网上商城，并将自己需求的产品加入到购物车中(可在商城首页、淘宝心选页面进行该操作)，可连续添加商品。  
	
4. 购物车管理
	- 用户选择完商品后可进入购物车页面，浏览加购的商品，可修改商品数量、删除商品和清空整个购物车。  
	
5. 结算功能
	- 用户确认需购买商品后可结算所有需购买商品，通过填写地址信息付款后即可购买商品。  
	  
	  
	
## 项目目录介绍
1. my-taobao/cart  
	购物车页面及逻辑代码，包含结算（模态框）

2. my-taobao/detailPage  
	商品详情页面及逻辑代码

3. my-taobao/game  
	小游戏**魔力圈圈**页面及逻辑代码
	
4. my-taobao/HeartChoosePage  
	淘宝心选页面及逻辑代码

5. my-taobao/img  
	存放项目的图片、图标

6. my-taobao/libs
	- 存放项目的框架文件（Bootstrap、jQuery）
	- AllItems.js
		- 所有商品数据文件
	- comment.js
		- 跳转详情页链接拆分及解码
	- Storage.js
		- 自定义重写Storage方法

7. my-taobao/login  
	登录页面及逻辑代码
	
8. my-taobao/
	- index.html
		- 淘宝首页html文件
	- HomePage.js
		- 淘宝首页js文件
	- HomePage.css
		- 淘宝首页css文件  
		
		  
		  
## 项目页面展示
1. 登录页面
	![login.png](https://z4a.net/images/2020/06/11/login.png)

2. 淘宝首页
	![index_1.png](https://z4a.net/images/2020/06/11/index_1.png)
	![index_2.png](https://z4a.net/images/2020/06/11/index_2.png)
	![index_3.png](https://z4a.net/images/2020/06/11/index_3.png)

3. 商品详情页
	![detail.png](https://z4a.net/images/2020/06/11/detail.png)

4. 淘宝心选页面
	![heartChoose_1.png](https://z4a.net/images/2020/06/11/heartChoose_1.png)
	![heartChoose_2.png](https://z4a.net/images/2020/06/11/heartChoose_2.png)

5. 购物车页面
	![cart_1.png](https://z4a.net/images/2020/06/11/cart_1.png)

6. 结算页面
	![Settlement_1.png](https://z4a.net/images/2020/06/11/Settlement_1.png)
	![Settlement_2.png](https://z4a.net/images/2020/06/11/Settlement_2.png)


## 小彩蛋
+ 点击淘宝首页右上用户购物信息及应用区域的**游戏**可体验小游戏***魔力圈圈***
+ 点击淘宝首页右上用户购物信息及应用区域的**发现**可体验小游戏[***Wonder of Wonder Art***](https://aidn.jp/wowa/)
