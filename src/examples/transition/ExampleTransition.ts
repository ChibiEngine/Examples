//@ts-ignore
import BUNNY_URL from "../../assets/bunny.png?url";
import {FixedUpdatable, Scene, Sprite, Texture} from "chibiengine";

export default class ExampleTransition extends Scene implements FixedUpdatable {
  updateRate = 1;

  private ghost: Sprite;

  protected async _create() {
    console.log("==== ExampleTransition ====");

    const image = new Texture(BUNNY_URL);

    const ghost = this.add(new Sprite(image, 0, 0));
    ghost.then(() => ghost.pixi.alpha = 0.5);
    this.ghost = ghost;

    const bunny = this.add(new Sprite(image, 0, 0));
    bunny.position.setTransition(1000);
    bunny.scale.setTransition(1000);
    bunny.rotation.setTransition(1000);

    this.ghost.onPositionChange((position) => {
      bunny.position.set(position);
      bunny.scale.set(ghost.scale);
      bunny.rotation.set(ghost.rotation);
    });
  }

  public update(): void {
    const x = Math.random() * (this.game.screen.width - 26);
    const y = Math.random() * (this.game.screen.height - 37);

    const scale = Math.random() * 2 + 0.5;

    const degrees = Math.random() * 360;

    this.ghost.rotation.degrees = degrees;
    this.ghost.scale.setScale(scale);
    this.ghost.position.set({x, y});
  }
}
