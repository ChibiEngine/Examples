import bunnyURL from "../../assets/bunny.png?url";

import {Container, FixedUpdatable, Scene, Sprite, Text, Texture} from "chibiengine";

export default class LoadingAssets2Example extends Scene {
  public async _create() {
    console.log("==== LoadingAssets2Example ====");
    console.log("Load with postponed add");

    let prefabAdded = false;

    const myPrefab = new class extends Container implements FixedUpdatable {
      updateRate = 10;

      private sprite: Sprite;
      public async _create() {
        console.log("Create prefab")
        this.sprite = this.add(new Sprite(new Texture(bunnyURL)).setAnchor(0.5, 0.5));
        this.sprite.rotation.setTransitionRate(this.updateRate);
      }

      public update() {
        if(!prefabAdded) {
          console.error("Update should not be called before prefab is added");
        }
        this.sprite.rotation.degrees += 10;
      }
    }();

    myPrefab.position.set(this.game.screen.center.x, this.game.screen.center.y)

    this.load(myPrefab);

    setTimeout(() => {
      prefabAdded = true;
      this.add(myPrefab);
    }, 1000);
  }
}
