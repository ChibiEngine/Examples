//@ts-ignore
import bunnyURL from "../../assets/bunny.png?url";
import Image from "chibiengine/src/engine/resource/Image";
import Sprite from "chibiengine/src/engine/gameobjects/Sprite";
import Scene from "chibiengine/src/engine/game/Scene";
import {FixedUpdatable} from "chibiengine/src/engine/gameobjects/Updatable";
import Keyboard from "chibiengine/src/engine/keyboard/Keyboard";

export default class ExampleKeyboard extends Scene implements FixedUpdatable {
  updateRate = 10;
  private bunny: Sprite;

  public async _create() {
    console.log("==== ExampleKeyboard ====");

    this.bunny = this.add(new Sprite(new Image(bunnyURL)));
    this.bunny.position.setTransition(100)
  }

  update(): void {
    if (Keyboard.wasKeyDown("ArrowUp", 100)) {
      this.bunny.position.y -= 50;
    }
    if (Keyboard.wasKeyDown("ArrowDown", 100)) {
      this.bunny.position.y += 50;
    }
    if (Keyboard.wasKeyDown("ArrowLeft", 100)) {
      this.bunny.position.x -= 50;
    }
    if (Keyboard.wasKeyDown("ArrowRight", 100)) {
      this.bunny.position.x += 50;
    }
  }

}
