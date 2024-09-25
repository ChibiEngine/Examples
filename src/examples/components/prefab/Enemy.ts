import {Container, Position} from "chibiengine";

import Damageable from "../components/Damageable";
import Movable from "../components/Movable";
import AIController from "../components/AIController";

export default class Enemy extends Container.With(Damageable, Movable, AIController) {
  constructor(x: number, y: number) {
    super(new Position(x, y))
    this.addComponent(new Damageable(100));
    this.addComponent(new Movable());
    this.addComponent(new AIController());
  }
}