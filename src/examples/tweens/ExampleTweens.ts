//@ts-ignore
import bunnyURL from "../../assets/bunny.png?url";
import {Callback, Container, Easing, MoveBy, Scene, Sequence, Sprite, Texture} from "chibiengine";

export default class ExampleTweens extends Scene {
  protected async _create() {
    console.log("==== ExampleTweens ====");

    // const sprite = new Sprite(new Texture(bunnyURL));
    // console.log(sprite.position.x, sprite.position.y);
    // console.log(sprite.x, sprite.y);
    //
    // sprite.setPosition(100, 100);
    //
    // console.log("sprite.position.x")
    // console.log(sprite.position.x, sprite.position.y);
    // console.log("sprite.x")
    // console.log(sprite.x, sprite.y);

    const sprite = this.add(new Sprite(new Texture(bunnyURL))).setPosition(this.game.screen.center);

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

    // sprite.play(new Sequence(
    //         new Callback(() => {console.log("Before MoveBy1")}),
    //         new MoveBy(0, 200).easing(Easing.bounceOut).duration(2000),
    //         new Callback(() => {console.log("After MoveBy1")}),
    //         new Callback(() => {console.log("Before MoveBy2")}),
    //         new MoveBy(0, -200).easing(Easing.bounceOut).duration(2000),
    //         new Callback(() => {console.log("After MoveBy2")}),
    //         new Callback(() => {console.log("Finished")})
    //     ).loopIndefinitely()
    // );
  }
}
