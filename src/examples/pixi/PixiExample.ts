import {PixiObject, Scene} from "chibiengine";

import * as pixi from "pixi.js";

export default class PixiExample extends Scene {
  public async _create() {
    const text = await this.add(new PixiObject(new pixi.Text("Hello World!", {
      fill: 0xFFFFFF,
      fontSize: 64,
    })));

    text.text = "Hello World2!"
    text.updateText(true);
    text.position.set(100, 0);

    const graphics =  await this.add(new PixiObject(new pixi.Graphics()));
    graphics.beginFill(0xFF0000);
    graphics.drawRect(0, 0, 100, 100);
    graphics.endFill();
  }
}
