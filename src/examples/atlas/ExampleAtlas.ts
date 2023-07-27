//@ts-ignore
import BUNNIES_ATLAS_URL from "../../assets/bunnies.png?url";
import Scene from "chibiengine/src/engine/game/Scene";
import Sprite from "chibiengine/src/engine/gameobjects/Sprite";
import Image from "chibiengine/src/engine/resource/Image";
import Cache from "chibiengine/src/engine/loader/Cache";

export default class ExampleAtlas extends Scene {
  protected async _create() {
    console.log("==== ExampleAtlas ====");

    const image = new Image(BUNNIES_ATLAS_URL);

    this.add(new Sprite(image.part(0, 0, 26, 37)))
        .setPosition(this.game.screen.center.addX(-13))

    this.add(new Sprite(image.part(26, 0, 26, 37)))
        .setPosition(this.game.screen.center.addX(13));

    console.log(Cache.resources)
  }
}
