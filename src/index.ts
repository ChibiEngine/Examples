// import "./pixi";
import Game from "chibiengine/src/engine/game/Game";
import ExampleKeyboard from "./examples/keyboard/ExampleKeyboard";
import PixiExample from "./examples/pixi/PixiExample";

const game = new Game({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
    // antialias: true,
    // autoResize: true,
});

// game.addScene(new LoadingAssetsExample());
// game.addScene(new ExampleKeyboard());
game.addScene(new PixiExample());
// game.addScene(new ExampleAtlas());
// game.addScene(new ExampleTransition());
// game.addScene(new ExampleKeyboard());
// game.addScene(new ExampleTweens());
// game.addScene(new ExampleReactivePositioning());
// game.addScene(new ExampleComponents());
// game.addScene(new ExampleReactive());
