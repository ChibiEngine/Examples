import {Scene, Sprite, Texture} from "chibiengine";
import BUNNY_URL from "../../assets/bunny.png?url";
import GOAT_URL from "../../assets/goat.png?url";

export default class TextureUpdateExample extends Scene {
  protected async _create() {
    console.log("==== TextureUpdateExample ====");

    const image1 = new Texture(BUNNY_URL);
    const image2 = new Texture(GOAT_URL);

    const sprite1 = await this.add(new Sprite(image1));

    console.log("Before", sprite1.width, sprite1.height);

    await new Promise(resolve => setTimeout(resolve, 1000));

    await sprite1.setTexture(image2);

    console.log("After", sprite1.width, sprite1.height);
  }
}
