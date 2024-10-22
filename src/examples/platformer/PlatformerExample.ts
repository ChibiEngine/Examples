import TilesetTexture from "./assets/tileset.png";
import Tileset from "./tilemap/Tileset";

import {Text} from "pixi.js";
import KeyboardController from "./prefabs/KeyboardController";
import {Camera, Container, Layer, PixiObject, Scene, Sprite} from "chibiengine";

const foregroundTilemap =
    [
      [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
      [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
      [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
      [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
      [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
      [, , , , , , , , 1, , , , , , , , , , , , , , , , , , , , , , , , , ,],
      [, , , , , , , , , , , , , , , , , , , , , 0, , , , , , , , , , , , ,],
      [, , , , , , , , , , , , , , , , , , , , , , , , , , , , 0, , , , , ,],
      [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
      [, , , , , , , 0, 0, 0, , , , , , , , , , , , , , , , , , , , , , , 1, ,],
      [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,],
      [, , , , , , , , , , , , 28, 29, 30, , , , , , , , , , , , , , , , , , , ,],
      [130, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 132],
      [130, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 132]
    ];

export default class PlatformerExample extends Scene {
  public tilemapScene = true;

  protected async _create(): Promise<void> {
    const camera = this.add(new Camera(), "camera");
    const backgroundLayer = this.add(new Layer(), "background")
        .setScrollFactor(0.5);
    const mainLayer = this.add(new Layer(), "main");

    /**
     * Problème :
     *   Layer est chargé, isLoaded = true
     *   Ajout d'objets dans le layer, isLoaded = false
     *   Layer est chargé, isLoaded = true mais la scène n'est pas au courant
     */

    const tileset = new Tileset(TilesetTexture, {
      tileWidth: 16,
      tileHeight: 16,
      gapX: 2,
      gapY: 2,
      pixelScale: true,
    });

    await this.load(tileset); // Need to load the texture first to know widthInTiles / heightInTiles

    const tilemap = mainLayer.add(new (class TileMap extends Container {
      protected async _create(): Promise<void> {
        for (let y = 0; y < foregroundTilemap.length; y++) {
          for (let x = 0; x < foregroundTilemap[y].length; x++) {
            const tileId = foregroundTilemap[y][x];
            if (tileId === undefined) continue;

            const texture = tileset.getTileTexture(tileId);
            this.add(new Sprite(texture))
                .setPosition(x * 16, y * 16);

            // tilemap2.add(new Sprite(texture))
            //     .setPosition(x * 16, y * 16);
          }
        }
      }
    })(), "tilemap")
        .setScale(2);

    /** TODO Pb : les bounds ne sont pas correctes immédiatement après le chargement
     * Raison : la position des tiles n'est assignée qu'après application du composant Position
     */
    const player = mainLayer.add(new (class Player extends Container{})(), "player")
        .setPosition(0, 9 * 32);

    player.add(new Sprite(tileset.getTileTexture(79)))
        .setScale(2).setAnchor(0, 0);

    player.add(new PixiObject(new Text("Player", {
      fontSize: 14,
      align: "center",
      fontFamily: "Arial",
    }))).setPosition(0, -32).pixi.anchor.set(0.1, -0.5);

    player.addComponent(new KeyboardController(foregroundTilemap, 32, 32));

    camera.setLerp(0.01)
    camera.setBounds(0, 0, 35 * 32, 32 * 13);
    camera.follow(player);
  }
}