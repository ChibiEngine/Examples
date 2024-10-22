//@ts-ignore
import bunnyURL from "../../assets/bunny.png?url";

import {Container, ResourceManager, Scene, Sprite, Text, Texture, VariableUpdatable} from "chibiengine";
import RotateBehavior from "./RotateBehavior";

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

    const texture = await this.load(new Texture(bunnyURL));

    // Create a 5x5 grid of bunnies
    for (let i = 0; i < 25; i++) {
      this.container.add(new Sprite(
        texture,
        (i % 5) * 40,
        Math.floor(i / 5) * 40
      ).addComponent(new RotateBehavior()));
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    await this.container.loaded;

    this.container.pixi.pivot.x = this.container.pixi.width / 2;
    this.container.pixi.pivot.y = this.container.pixi.height / 2;

    // Center bunny sprite in local container coordinates
    // TODO
    // this.container.pivot(this.container.size.half);
    console.log("blobs", this.blobs);
    console.log("dependants", this.dependants);
    console.log("dependencies", this.dependencies);
    console.log("cache", ResourceManager.resources);

    console.log((this.container.children[0] as Sprite).texture);
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
