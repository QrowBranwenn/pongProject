///<reference path="p5.global-mode.d.ts" />

let shapes = [];
let game;
let leftPressed = 0;
let rightPressed = 0;
let p1XPos = 50;
let p2XPos = 1450;
let p1YPos = 350;
let p2YPos = 350;
let score = 0;
let altScore = 0;
let velx = 8;
let vely = 8;
let rectSize = 200;
let ranVel = 8;

var setup = function () {
  createCanvas(windowWidth, windowHeight - 5);
  noStroke();
  c1 = color(255);
  c2 = color(random(0, 155), random(0, 155), random(0, 155));

  document.getElementById("score").innerHTML = "Score: " + score;
  document.getElementById("altScore").innerHTML = "Score: " + altScore;

  for (let i = 0; i < 1; i++) {
    shapes.push(new PlayerOne());
    shapes.push(new PlayerTwo());
    shapes.push(new Ball());
  }
  game = new Pong();
};

class Shape {
  constructor() {
    this.x = 700;
    this.y = 100;
    this.vx = ranVel;
    this.vy = 8;
    this.color = 255;
  }
  draw() {
    fill(this.color);
    if (this.y < 0 || this.y > 750) {
      this.vy = -this.vy;
    }
    if (this.x > windowWidth - 4) {
      score += 1;
      ranVel = 8;
      document.getElementById("score").innerHTML = "Score: " + score;
      this.vx = velx;
      this.vy = vely;
      if (velx < 18 && velx > -18) {
        velx++;
        vely++;
      }

      shapes.splice(0, 3);
      rectSize -= 4;
      shapes.push(new PlayerOne());
      shapes.push(new PlayerTwo());
      shapes.push(new Ball());
    }
    if (this.x < 0) {
      altScore += 1;
      ranVel = -8;
      document.getElementById("altScore").innerHTML = "Score: " + altScore;
      this.vx = velx;
      this.vy = vely;
      if (velx < 18 && velx > -18) {
        velx++;
        vely++;
      }

      shapes.splice(0, 3);
      rectSize -= 4;
      shapes.push(new PlayerOne());
      shapes.push(new PlayerTwo());
      shapes.push(new Ball());
    }
    if (
      this.isCircleInside(p1XPos, p1YPos, 30, rectSize) ||
      this.isCircleInside(p2XPos, p2YPos, 30, rectSize)
    ) {
      this.vx = -this.vx;
    }
  }
  isCircleInside(x, y, w, h) {
    if (
      this.x > x &&
      this.x < x + w &&
      this.y + 15 > y &&
      this.y + 15 < y + h
    ) {
      return true;
    } else {
      return false;
    }
  }
}

class Ball extends Shape {
  draw() {
    super.draw();
    circle((this.x += this.vx), (this.y += this.vy), 30);
  }
}

class PlayerOne extends Shape {
  draw() {
    super.draw();
    fill(255);
    if (keyIsDown(SHIFT) && p1YPos > 0) {
      p1YPos -= 8;
    }
    if (keyIsDown(CONTROL) && p1YPos < windowHeight - rectSize) {
      p1YPos += 8;
    }
    rect(p1XPos, p1YPos, 30, rectSize);
  }
}

class PlayerTwo extends Shape {
  draw() {
    super.draw();
    fill(255);
    if (keyIsDown(UP_ARROW) && p2YPos > 0) {
      p2YPos -= 8;
    }
    if (keyIsDown(DOWN_ARROW) && p2YPos < windowHeight - rectSize) {
      p2YPos += 8;
    }
    rect(p2XPos, p2YPos, 30, rectSize);
  }
}

class Table {
  draw() {
    let midPoint = windowWidth / 2;
    for (let y = 0; y < windowHeight; y++) {
      fill(100);
      rect(midPoint, y, 10, 20);
      y += 40;
    }
  }
}

let separator = new Table();

class Pong {
  draw() {
    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      separator.draw();
      shape.draw();
    }
  }
}

var draw = function () {
  background(0);
  // for (let i = 0; i < shapes.length; i++) {
  //   const shape = shapes[i];
  //   separator.draw();
  //   shape.draw();
  // }
  game.draw();
  winner(score, altScore);
};

var windowResized = function () {
  resizeCanvas(windowWidth, windowHeight - 5);
  game = new Pong();
};

let winner = function (rs, ls) {
  if (rs === 21) {
    background(random(255), random(255), random(255));
    alert("You could've played infinitely, but left Wins!");
  }
  if (ls === 21) {
    background(random(255), random(255), random(255));
    alert("You could've played infinitely, but right Wins!");
  }
};
