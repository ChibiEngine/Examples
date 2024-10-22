import { Component, ChibiEvent } from "chibiengine";

export default class Damageable extends Component<"damageable"> {
  public readonly componentName = "damageable";

  public readonly onDeath = new ChibiEvent<void>();

  private _health: number;

  constructor(health: number = 10) {
    super();
    this._health = health;
  }

  public get health(): number {
    return this._health;
  }

  public set health(health: number) {
    this._health = health;
    if(this._health <= 0) {
      this._health = 0;
      this.onDeath.trigger(null);
    }
  }

  public damage(amount: number) {
    this._health -= amount;
    if(this._health <= 0) {
      this._health = 0;
      this.onDeath.trigger(null);
    }
  }
}