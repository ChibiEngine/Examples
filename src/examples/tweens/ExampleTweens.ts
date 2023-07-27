//@ts-ignore
import bunnyURL from "../../assets/bunny.png?url";
import Scene from "chibiengine/src/engine/game/Scene";
import Sprite from "chibiengine/src/engine/gameobjects/Sprite";
import Image from "chibiengine/src/engine/resource/Image";
import {MoveBy} from "chibiengine/src/engine/tween/Move";
import Easing from "chibiengine/src/engine/math/easing/Easing";
import Sequence from "chibiengine/src/engine/tween/Sequence";
import Callback from "chibiengine/src/engine/tween/Callback";
import ContainerSpecific from "chibiengine/src/engine/tween/ContainerSpecific";
import Container from "chibiengine/src/engine/gameobjects/Container";

export default class ExampleTweens extends Scene {
  protected async _create() {
    console.log("==== ExampleTweens ====");

    const sprite = await this.add(new Sprite(new Image(bunnyURL))).setPosition(this.game.screen.center);
    sprite.play(new Sequence()
        .add(new Callback(() => {console.log("Before MoveBy1")}))
        .add(new MoveBy(0, 200).easing(Easing.bounceOut).duration(2000))
        .add(new Callback(() => {console.log("After MoveBy1")}))
        .add(new Callback(() => {console.log("Before MoveBy2")}))
        .add(new MoveBy(0, -200).easing(Easing.bounceOut).duration(2000))
        .add(new Callback(() => {console.log("After MoveBy2")}))
        .add(new Callback(() => {console.log("Finished")}))
        .loopIndefinitely()
    );

    type UnionToIntersection<U> =
        (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never

    type ArrayType<T> = T extends Array<infer U> ? U : never;
    const arr = [new Sprite(null), new Container()];

    type A = ArrayType<typeof arr>;
    type B = UnionToIntersection<A>;

    const seq = new Sequence(new Callback(() => {console.log("Before MoveBy1")}), new ContainerSpecific());

    sprite.play(new Sequence(
            new Callback(() => {console.log("Before MoveBy1")}),
            new MoveBy(0, 200).easing(Easing.bounceOut).duration(2000),
            new Callback(() => {console.log("After MoveBy1")}),
            new Callback(() => {console.log("Before MoveBy2")}),
            new MoveBy(0, -200).easing(Easing.bounceOut).duration(2000),
            new Callback(() => {console.log("After MoveBy2")}),
            new Callback(() => {console.log("Finished")})
        ).loopIndefinitely()
    );
  }
}
