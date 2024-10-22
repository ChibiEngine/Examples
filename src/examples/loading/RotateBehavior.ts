import { Component, FixedUpdatable, GameObject } from "chibiengine";

export default class RotateBehavior extends Component<"rotate"> implements FixedUpdatable {
  readonly componentName: "rotate" = "rotate";

  updateRate = 10;

  private target: GameObject;

  async apply(target: GameObject): Promise<void> {
    this.target = target;
    this.target.rotation.setTransitionRate(this.updateRate);
    return super.apply(target);
  }

  public update() {
    this.target.rotation.degrees += 5;
  }
}