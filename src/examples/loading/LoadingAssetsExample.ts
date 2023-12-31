//@ts-ignore
import Image from "chibiengine/src/engine/resource/Image";
import Sprite from "chibiengine/src/engine/gameobjects/Sprite";
import Container from "chibiengine/src/engine/gameobjects/Container";
import Text from "chibiengine/src/engine/resource/Text";
import Scene from "chibiengine/src/engine/game/Scene";
import Cache from "chibiengine/src/engine/loader/Cache";
import {VariableUpdatable} from "chibiengine/src/engine/gameobjects/Updatable";

import bunnyURL from "../../assets/bunny.png?url";

export default class LoadingAssetsExample extends Scene implements VariableUpdatable {
  private container: Container;
  private text: Text;

  public async _create() {
    console.log("==== ExampleKeyboard ====");

    this.onProgress.subscribe((me) => { console.log(me.bytesLoaded,"/",me.bytesTotal); });
    this.text = await this.load(new Text("/assets/paragraph.txt"));
    console.log("text:", this.text.content);
    // Create a container at the center
    this.container = this.add(new Container(this.game.screen.center));

    console.log("scene", this.container.scene);

    // Create a 5x5 grid of bunnies
    for (let i = 0; i < 25; i++) {
      this.container.add(new Sprite(
        new Image(bunnyURL),
        (i % 5) * 40,
        Math.floor(i / 5) * 40
      ));
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    await this.container;

    this.container.pixi.pivot.x = this.container.pixi.width / 2;
    this.container.pixi.pivot.y = this.container.pixi.height / 2;

    // Center bunny sprite in local container coordinates
    // TODO
    // this.container.pivot(this.container.size.half);
    console.log("blobs", this.blobs);
    console.log("dependants", this.dependants);
    console.log("dependencies", this.dependencies);
    console.log("cache", Cache.resources);
    // console.log(this.game.loader.resources);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("3 seconds later");
  }

  /**
   * Parent:
   * Promise.all(children => child.ready);
   */

  public render(dt: number) {
    console.log("fps",1000/dt);
    this.container.pixi.rotation -= 0.0007 * dt;
  }
}
