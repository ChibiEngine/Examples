//@ts-ignore
import BUNNY_URL from "../../assets/bunny.png?url";
import {Scene, Sprite, Texture, FixedUpdatable} from "chibiengine";

export default class ExampleTransition extends Scene implements FixedUpdatable {
  updateRate = 2;

  private bunny1: Sprite;
  private bunny2: Sprite;

  private direction = 1;

  protected async _create() {
    console.log("==== ExampleTransition ====");

    const image = new Texture(BUNNY_URL);

    this.bunny1 = this.add(new Sprite(image, 0, this.game.screen.height/2-50));
    this.bunny2 = this.add(new Sprite(image, 0, this.game.screen.height/2));
    this.bunny2.position.setTransition(500);

    this.bunny1.onPositionChange((position) => {
      this.bunny2.position.set(position.x, this.bunny2.position.y);
    });
  }

  public update(): void {
    console.log("update", this.bunny1.position.x);
    this.bunny1.setPosition(this.bunny1.position.x + this.direction * 100, this.bunny1.position.y);
    console.log("update2", this.bunny1.position.x);

    if (this.bunny1.position.x >= this.game.screen.width) {
      this.direction = -1;
    } else if (this.bunny1.position.x <= 0) {
      this.direction = 1;
    }
  }
}
