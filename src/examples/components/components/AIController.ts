import Component from "chibiengine/src/engine/component/Component";
import GameObject from "chibiengine/src/engine/gameobjects/GameObject";

import Movable from "./Movable";

export default class AIController extends Component<"ai_controller", GameObject & Movable> {
  public readonly componentName = "ai_controller";

  public target: GameObject & Movable;
  apply(target: GameObject & Movable) {
    this.target = target;
    this.aiMove();
  }

  public aiMove() {
    console.log("ai moving");
    this.target.move();
  }
}