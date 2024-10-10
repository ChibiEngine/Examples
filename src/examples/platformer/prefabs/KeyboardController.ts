import {Behavior, Class, GameObject, Keyboard} from "chibiengine";

export default class KeyboardController extends Behavior<"kb_controller"> {
  public readonly componentName = "kb_controller";
  public readonly targetType: Class<GameObject>;

  private target: GameObject;

  private canJump = true;

  private xVelocity = 0;
  private yVelocity = 0;

  private currentDt = 0;
  private lastTime = performance.now();
  private updateCount = 0;

  private lastUpdateTime2 = performance.now();

  updateRate = 50;

  public constructor(private readonly tilemap: number[][], private readonly hitboxWidth: number, private readonly hitboxHeight: number) {
    super();
  }

  public apply(target: GameObject) {
    this.target = target;
    console.log("this.target=", this.target);
    target.position.setTransition(20);
    // @ts-ignore
    console.assert(target.width !== 0 && target.height !== 0, "Target size should be set", target);
  }

  public update(): void {
    // console.log("KeyboardController update", dt);
    // this.lastUpdateTime = performance.now();
    // this.currentDt += dt;
    this.updateCount++;

    const dt = performance.now() - this.lastUpdateTime2;
    this.lastUpdateTime2 = performance.now();

    this.currentDt += dt;

    if(performance.now() - this.lastTime > 1000) {
      // console.log("KeyboardController UPDATE RATE", this.updateCount, this.currentDt);
      this.currentDt = 0;
      this.updateCount = 0;
      this.lastTime = performance.now();
      this.currentDt = 0;
    }

    let moving = false;

    if (Keyboard.isKeyDown("ArrowLeft", 1000 / 50)) {
      this.xVelocity -= this.canJump ? 0.4 : 0.2;
      if (this.xVelocity < -8)
        this.xVelocity = -8;
      moving = true;
    } else if (Keyboard.isKeyDown("ArrowRight", 1000 / 50)) {
      this.xVelocity += this.canJump ? 0.4 : 0.2;
      if (this.xVelocity > 8)
        this.xVelocity = 8;
      moving = true;
    }

    let groundFriction = false;
    let onGround = false;

    let targetX = this.target.x + this.xVelocity;
    let targetY = this.target.y + this.yVelocity;

    if (this.canJump && Keyboard.isKeyDown("ArrowUp", 1000 / 50)) {
      this.yVelocity = -12;
      targetY -= 1;
      this.canJump = false;
    }

    // Check top collision
    if (this.isTile(this.target.x, this.target.y + this.yVelocity)
        || this.isTile(this.target.x + this.hitboxWidth, this.target.y + this.yVelocity)) {
      const newY = Math.floor((this.target.y + this.yVelocity) / 32) + 1;
      targetY = newY * 32;
      this.yVelocity = 0;
      groundFriction = true;
      // Check bottom collision
    } else if (this.isTile(this.target.x, this.target.y + this.hitboxHeight + this.yVelocity)
        || this.isTile(this.target.x + this.hitboxWidth, this.target.y + this.hitboxHeight + this.yVelocity)) {
      const newY = Math.floor((this.target.y + this.hitboxHeight + this.yVelocity) / 32);
      targetY = newY * 32 - this.hitboxHeight;
      this.yVelocity = 0;
      this.canJump = true;
      onGround = true;
      groundFriction = true;
    } else {
      this.canJump = false;
    }

    // Check left collision
    if (this.isTile(this.target.x + this.xVelocity, this.target.y)
        || this.isTile(this.target.x + this.xVelocity, this.target.y + this.hitboxHeight - 1)) {
      const newX = Math.floor((this.target.x + this.xVelocity) / 32) + 1;
      targetX = newX * 32;
      this.xVelocity = 0;
      // Check right collision
    } else if (this.isTile(this.target.x + this.hitboxWidth + this.xVelocity, this.target.y)
        || this.isTile(this.target.x + this.hitboxWidth + this.xVelocity, this.target.y + this.hitboxHeight - 1)) {
      const newX = Math.floor((this.target.x + this.hitboxWidth + this.xVelocity) / 32);
      targetX = newX * 32 - this.hitboxWidth - 0.3;
      this.xVelocity = 0;
    }

    // this.target.play(new MoveTo(targetX, targetY).duration(20));
    this.target.setPosition(targetX, targetY);
    // this.target.y += this.yVelocity;
    // this.target.x += this.xVelocity;

    if (!onGround) {
      this.yVelocity += 0.5;
    }

    if (!moving) {
      if (groundFriction) {
        this.xVelocity *= 0.7;
      } else {
        this.xVelocity *= 0.97;
      }
    }

    if (this.yVelocity > 10) this.yVelocity = 10;
  }

  public isTile(x: number, y: number) {
    const row = Math.floor(y / 32);
    const col = Math.floor(x / 32);

    return this.tilemap[row] && this.tilemap[row][col] !== undefined;
  }
}