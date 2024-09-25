import {Label, Scene} from "chibiengine";

export default class TextExample extends Scene {
  protected async _create() {
    const text = await this.add(new Label("Hello, World!", {
      fontFamily: "Arial",
      fontSize: 36,
    }));
    text.pixi.pivot.set(text.pixi.width / 2, text.pixi.height / 2);
    text.position.set(this.game.screen.center);
  }
}
