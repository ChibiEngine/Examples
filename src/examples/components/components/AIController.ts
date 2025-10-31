import {Component, GameObject} from "chibiengine";
import Movable from "./Movable";

export default class AIController extends Component<"ai_controller", GameObject & Movable> {
  public readonly componentName = "ai_controller";

  public target: GameObject & Movable;
  public async apply(target: GameObject & Movable) {
    this.target = target;
    this.aiMove();
  }

  public aiMove() {
    console.log("ai moving");
    this.target.move();
  }
}