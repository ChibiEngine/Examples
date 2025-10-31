//@ts-ignore
import {Interactivity, ResourceManager, Scene, Sprite, Texture} from "chibiengine";
import BUNNY_URL from "../../assets/bunny.png?url";

export default class ExampleInteractivity extends Scene {
  protected async _create() {
    console.log("==== ExampleInteractivity ====");

    const image = new Texture(BUNNY_URL);

    const bunny = this.add(new Sprite(image, 0, 0)).addComponent(new Interactivity());
    const test = bunny.setCursor("pointer");
    bunny.onClick.subscribe(() => {
      console.log("BUNNY CLICKED!");
    });
  }
}
