import { Component } from "chibiengine";

export default class Movable extends Component<"movable"> {
  public readonly componentName = "movable";

  public move() {
    console.log("moving");
  }
}