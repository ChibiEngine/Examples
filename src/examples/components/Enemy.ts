import Damageable from "./Damageable.ts";
import Container from "chibiengine/src/engine/gameobjects/Container";
import Movable from "./Movable.ts";
import AIController from "./AIController.ts";
import Position from "chibiengine/src/engine/component/Position";

export default class Enemy extends Container.With(Damageable, Movable, AIController) {
  constructor(x: number, y: number) {
    super(new Position(x, y))
    this.addComponent(new Damageable(100));
    this.addComponent(new Movable());
    this.addComponent(new AIController());
  }
}