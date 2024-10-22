import bunnyURL from "../../assets/bunny.png?url";

import {PixiObject, Scene, Sprite, Texture, Vec2} from "chibiengine";
import {PhysicsWorld, PhysicsBody, RectShape, PolygonShape} from "@chibiengine/box2d";

import * as PIXI from "pixi.js";

export default class Box2DExample extends Scene {
  public async _create() {
    const UPDATE_RATE = 20;
    this.addComponent(new PhysicsWorld({ gravity: 9.8, updateRate: UPDATE_RATE, debugDraw: true }));

    // set octagon shape
    const polygon = new PolygonShape([
      new Vec2(-10, 0),
      new Vec2(-10, 10),
      new Vec2(-5, 20),
      new Vec2(5, 20),
      new Vec2(10, 10),
      new Vec2(10, 0),
      new Vec2(5, -10),
      new Vec2(-5, -10),
      new Vec2(0, 0)
    ]);

    const sprite = this.add(new Sprite(new Texture(bunnyURL))).setPosition(this.game.screen.center)
        .setAnchor(0, 0);
    sprite.position.setTransition(1000/UPDATE_RATE);
    sprite.addComponent(new PhysicsBody(polygon, {offset: new Vec2(13.5, 16)}));

    const platform = this.add(new PixiObject(new PIXI.Graphics()));
    platform.setPosition(0, this.game.screen.height - 50); // TODO : pb, beginFill not available if platform = this.add(...).setPosition(...)

    platform.pixi.beginFill(0x00FF00);
    platform.pixi.drawRect(0, 0, this.game.screen.width, 25);
    platform.pixi.endFill();

    console.log("parent", platform.parent);
    platform.addComponent(new PhysicsBody(new RectShape(this.game.screen.width, 25), {type: "static", offset: new Vec2(this.game.screen.width/2, 25/2)}));
  }
}