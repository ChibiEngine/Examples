import Component from "chibiengine/src/engine/component/Component";

export default class Movable extends Component<"movable"> {
  public readonly componentName = "movable";

  public move() {
    console.log("moving");
  }
}