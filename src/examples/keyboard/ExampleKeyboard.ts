//@ts-ignore
import bunnyURL from "../../assets/bunny.png?url";
import {FixedUpdatable, Keyboard, Scene, Sprite, Texture} from "chibiengine";

export default class ExampleKeyboard extends Scene implements FixedUpdatable {
  updateRate = 10;
  private bunny: Sprite;

  public async _create() {
    console.log("==== ExampleKeyboard ====");

    this.bunny = this.add(new Sprite(new Texture(bunnyURL)));
    this.bunny.position.setTransition(100)
  }

  update(): void {
    if (Keyboard.isKeyDown("ArrowUp", 100)) {
      this.bunny.position.y -= 50;
    }
    if (Keyboard.isKeyDown("ArrowDown", 100)) {
      this.bunny.position.y += 50;
    }
    if (Keyboard.isKeyDown("ArrowLeft", 100)) {
      this.bunny.position.x -= 50;
    }
    if (Keyboard.isKeyDown("ArrowRight", 100)) {
      this.bunny.position.x += 50;
    }
  }

}
