const BALLS_COUNT = 10;
const BALL_SIZE_MIN = 10;
const BALL_SIZE_MAX = 20;
const BALL_SPEED_MAX = 5.5;

// 设定画布和初始数据
const para = document.querySelector('p');        //获取已消灭球数
const paraTwo = document.querySelector('span');  //获取剩余球数
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 将画布窗尺寸置为窗口内尺寸
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// 设定形状类层次结构
class Shape {
  constructor(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size, exists) {
    super(x, y, velX, velY, exists);

    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
      if (this !== balls[j]) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size && balls[j].exists) {
          balls[j].color = this.color = randomColor();
        }
      }
    }
  }
}

class EvilCircle extends Shape {
  constructor(x, y, exists) {
    super(x, y, exists);
    this.velX = BALL_SPEED_MAX;
    this.velY = BALL_SPEED_MAX;
    this.color = 'white';
    this.size = 10;
    this.getControls();
    this.setControls();
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if (this.x + this.size >= width) {
      this.x -= this.size;
    }

    if (this.x - this.size <= 0) {
      this.x += this.size;
    }

    if (this.y + this.size >= height) {
      this.y -= this.size;
    }

    if (this.y - this.size <= 0) {
      this.y += this.size;
    }
  }
  //鼠标事件
  getControls() {
    //鼠标按下
    // window.onmousedown = e => {
    //   // console.log(e.x);
    //   // console.log(e.y);
    //   this.x = e.x;
    //   this.y = e.y;
    // }
    //鼠标拖动
    window.onmousemove = e => {
      this.x = e.pageX;
      this.y = e.pageY;
    }
  }
  //键盘事件
  setControls() {
    window.onkeydown = e => {
      switch (e.key) {
        case 'a':
        case 'A':
        case 'ArrowLeft':
          this.x -= this.velX;
          break;
        case 'd':
        case 'D':
        case 'ArrowRight':
          this.x += this.velX;
          break;
        case 'w':
        case 'W':
        case 'ArrowUp':
          this.y -= this.velY;
          break;
        case 's':
        case 'S':
        case 'ArrowDown':
          this.y += this.velY;
          break;
      }
    };
  }

  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
      if (balls[j].exists) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          balls[j].exists = false;
          count--;
          para.textContent = '已消灭 ' + (balls.length - count) + ' 个球';
          paraTwo.textContent = '还剩 ' + count + ' 个球';
        } 
      }
    }
  }
}

// 球和恶魔圈
var balls = [];
const evilBall = new EvilCircle(random(0, width), random(0, height), true);
let count = 0;


// 执行动画
//loop();

// 生成随机数的函数
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
  return (
    'rgb(' +
    random(0, 255) +
    ', ' +
    random(0, 255) +
    ', ' +
    random(0, 255) +
    ')'
  );
}

// 定义一个循环来不停地播放
function loop() {
  document.getElementsByClassName('game_begin')[0].classList.add('show');  //开始页面
  document.getElementsByClassName('game_over')[0].classList.remove('over');
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  
    if (balls.length < BALLS_COUNT) {
      const size = random(BALL_SIZE_MIN, BALL_SIZE_MAX);
      const ball = new Ball(
        // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-BALL_SPEED_MAX, BALL_SPEED_MAX),
        random(-BALL_SPEED_MAX, BALL_SPEED_MAX),
        randomColor(),
        size,
        true
      );
      balls.push(ball);
      count++;
      
      para.textContent = '已消灭 ' + (balls.length-count) + ' 个球';
      paraTwo.textContent = '还剩 ' + count + ' 个球'; 
    }

    //结束页面
    if(count == 0){
      document.getElementsByClassName('game_over')[0].classList.add('over');
      //balls = [];
      balls = new Array();  //重新初始化小球数组
      return false;  //关闭循环
    }
  
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }

  evilBall.draw();
  evilBall.checkBounds();
  evilBall.collisionDetect();

  requestAnimationFrame(loop);
}
