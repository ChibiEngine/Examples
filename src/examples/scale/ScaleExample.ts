//@ts-ignore
import {Container, Rotation, Scene, Sprite, Texture, VariableUpdatable} from "chibiengine";
import bunnyURL from "../../assets/bunny.png?url";


export default class ScaleExample extends Scene implements VariableUpdatable {
  private container: Container;
  private text: Text;

  public async _create() {
    const bunny = await this.add(new Sprite(new Texture(bunnyURL)))
        .setPosition(this.game.screen.center)
        .setRotation(Rotation.ofDegrees(45))
        .setAnchor(0.5, 0.5)
        .setScale(2, -2);

    // bunny.setScale(2, -2);
    console.log("scale", bunny.scale.y, bunny.pixi.scale.y);
    console.log("width", bunny.width, bunny.height);
  }
}
