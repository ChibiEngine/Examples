import {Texture, Resource} from "chibiengine";

export interface TilesetOptions {
  tileWidth: number;
  tileHeight: number;
  gapX?: number;
  gapY?: number;
  pixelScale?: boolean;
}

export default class Tileset extends Resource {
  private texture: Texture;

  private readonly tileWidth: number;
  private readonly tileHeight: number;

  private readonly gapX: number;
  private readonly gapY: number;

  private widthInTiles: number;
  private heightInTiles: number;

  public constructor(texture: string, options: TilesetOptions) {
    super(texture);
    this.texture = new Texture(texture, {pixelScale: options.pixelScale});
    this.tileWidth = options.tileWidth;
    this.tileHeight = options.tileHeight;
    this.gapX = options.gapX || 0;
    this.gapY = options.gapY || 0;
  }

  protected async _create(): Promise<void> {
    await this.load(this.texture);
    const width = this.texture.pixi.width;
    const height = this.texture.pixi.height;
    this.widthInTiles = Math.floor(width / (this.tileWidth + this.gapX));
    this.heightInTiles = Math.floor(height / (this.tileHeight + this.gapY));
  }

  public getTileTexture(tileId: number) {
    const x = tileId % this.widthInTiles;
    const y = Math.floor(tileId / this.widthInTiles);

    return this.texture.part(
        x * (this.tileWidth + this.gapX),
        y * (this.tileHeight + this.gapY),
        this.tileWidth,
        this.tileHeight
    );
  }

  protected _destroy(): Promise<void> {
    return this.texture.destroy();
  }

}