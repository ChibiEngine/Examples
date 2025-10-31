// import "./pixi";
import { Game, InstantiableClass, Scene } from "chibiengine";

import ExampleKeyboard from "./examples/keyboard/ExampleKeyboard";
import PixiExample from "./examples/pixi/PixiExample";
import Pixi2Example from "./examples/pixi2/Pixi2Example";
import ExampleTransition from "./examples/transition/ExampleTransition";
import ExampleTransition2 from "./examples/transition/ExampleTransition2";
import LoadingAssetsExample from "./examples/loading/LoadingAssetsExample";
import ExampleTweens from "./examples/tweens/ExampleTweens";
import ScaleExample from "./examples/scale/ScaleExample";
import TextExample from "./examples/text/TextExample";
import TextureUpdateExample from "./examples/texture_update/TextureUpdateExample";
import ExampleAtlas from "./examples/atlas/ExampleAtlas";
import Box2DExample from "./examples/box2d/Box2DExample";
import PlatformerExample from "./examples/platformer/PlatformerExample";
import LoadingAssets2Example from "./examples/loading2/LoadingAssets2Example";
import ExampleInteractivity from "./examples/interactivity/ExampleInteractivity";

const sceneSelect = document.getElementById("scene-select") as HTMLSelectElement;
const sceneMap = new Map<string, InstantiableClass<Scene>>();

const game = new Game({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
    // antialias: true,
    // autoResize: true,
});

registerScene("Box2D", Box2DExample);
registerScene("Interactivity", ExampleInteractivity);
registerScene("Loading Assets", LoadingAssetsExample);
registerScene("Loading Assets 2", LoadingAssets2Example);
registerScene("Scale", ScaleExample);
registerScene("Keyboard", ExampleKeyboard);
registerScene("Pixi", PixiExample);
registerScene("Pixi2", Pixi2Example);
registerScene("Atlas", ExampleAtlas);
registerScene("Transition", ExampleTransition);
registerScene("Transition2", ExampleTransition2);
registerScene("Tweens", ExampleTweens);
// registerScene("Reactive Positioning", ExampleReactivePositioning);
// registerScene("Components", ExampleComponents);
// registerScene("Reactive", ExampleReactive);
registerScene("Text", TextExample);
registerScene("Texture Update", TextureUpdateExample);
registerScene("Platformer", PlatformerExample);

game.start();

selectScene("Box2D");

sceneSelect.addEventListener("change", () => {
    selectScene(sceneSelect.value);
});

function registerScene(name: string, scene: InstantiableClass<Scene>) {
    const option = document.createElement("option");
    option.value = name;
    option.text = name;
    sceneSelect.appendChild(option);
    sceneMap.set(name, scene);
}

function selectScene(name: string) {
    sceneSelect.value = name;
    const SceneClass = sceneMap.get(name);
    game.setScene(new SceneClass());
}