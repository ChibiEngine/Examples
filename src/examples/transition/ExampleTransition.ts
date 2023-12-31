//@ts-ignore
import BUNNY_URL from "../../assets/bunny.png?url";
import Scene from "chibiengine/src/engine/game/Scene";
import Sprite from "chibiengine/src/engine/gameobjects/Sprite";
import Image from "chibiengine/src/engine/resource/Image";
import {FixedUpdatable} from "chibiengine/src/engine/gameobjects/Updatable";

export default class ExampleTransition extends Scene implements FixedUpdatable {
  updateRate = 1;

  private bunny: Sprite;

  protected async _create() {
    console.log("==== ExampleTransition ====");

    const image = new Image(BUNNY_URL);

    const ghost = this.add(new Sprite(image, 0, 0));
    ghost.then(() => ghost.pixi.alpha = 0.5);

    this.bunny = this.add(new Sprite(image, 0, 0));
    this.bunny.position.setTransition(1000);
    this.bunny.size.setTransition(1000);
    this.bunny.rotation.setTransition(1000);

    this.bunny.onPositionChange((position) => {
      ghost.position.set(position);
      ghost.size.set(this.bunny.size);
      ghost.rotation.set(this.bunny.rotation);
    });
  }

  public update(): void {
    const x = Math.random() * (this.game.screen.width-26);
    const y = Math.random() * (this.game.screen.height-37);

    const scale = Math.random() * 2 + 0.5;

    const degrees = Math.random() * 360;

    this.bunny.rotation.degrees = degrees;

    this.bunny.size.setScale(scale);
    this.bunny.position.set({x, y});
  }
}
