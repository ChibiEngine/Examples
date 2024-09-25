//@ts-ignore
import {ResourceManager, Scene, Sprite, Texture} from "chibiengine";
import BUNNIES_ATLAS_URL from "../../assets/bunnies.png?url";

export default class ExampleAtlas extends Scene {
  protected async _create() {
    console.log("==== ExampleAtlas ====");

    const image = new Texture(BUNNIES_ATLAS_URL);

    const sprite1 = this.add(new Sprite(image.part(0, 0, 26, 37)))
        .setPosition(this.game.screen.center.addX(-13))

    this.add(new Sprite(image.part(26, 0, 26, 37)))
        .setPosition(this.game.screen.center.addX(13));

    console.log(ResourceManager.resources)

    // await sprite1;
    // sprite1.destroy();
  }
}
