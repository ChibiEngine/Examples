//@ts-nocheck TODO
import bunnyURL from "../../assets/bunny.png?url";

import {Scene, Sprite, Texture, PixiObject} from "chibiengine";
import * as pixi from "pixi.js";

export default class Pixi2Example extends Scene {
  public async _create() {
    console.log("Hello World!");

    const sprite = this.add(new Sprite(new Texture(bunnyURL)));

    const graphics2 = await this.add(new pixi.Graphics());
    graphics2.position.set(10, 10);
    graphics2.beginFill(0xFF0000);
    graphics2.drawRect(0, 0, 100, 100);
    graphics2.endFill();

    const rope: PixiObject<pixi.SimpleRope> = await this.add(new pixi.SimpleRope(pixi.Texture.from(bunnyURL), [new pixi.Point(0, 0), new pixi.Point(100, 0), new pixi.Point(100, 100), new pixi.Point(0, 100)]));
    rope.position.set(100, 100);

    const bun = await this.add(new pixi.Sprite(pixi.Texture.from(bunnyURL)));
    bun.position.set(100, 100);

    const text = await this.add(new pixi.Text("Hello World!", {
      fill: 0xFFFFFF,
      fontSize: 64,
    }));
    text.position.setTransition(1000);

    setInterval(() => {
      text.position.set(Math.random() * 500, Math.random() * 500);
    }, 1000);

    text.updateText(true);
    text.position.set(100, 0);

    const graphics: PixiObject<pixi.Graphics> = await this.add(new pixi.Graphics());
    graphics.position.set(10, 10);
    graphics.beginFill(0xFF0000);
    graphics.drawRect(0, 0, 100, 100);
    graphics.endFill();

    const bunny = await this.add(pixi.Sprite.from(bunnyURL));
    bunny.position.set(500, 500);
    bunny.size.setTransition(1000)

    setInterval(() => {
      bunny.size.set(Math.random()*100, Math.random()*100)
    }, 1000);
  }
}
