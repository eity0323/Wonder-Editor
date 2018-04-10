'use strict';

import * as Curry                                from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as GameObjectUtils$WonderEditor         from "./GameObjectUtils.js";
import * as StateLogicService$WonderEditor       from "../../service/stateTuple/logic/StateLogicService.js";
import * as DirectorEngineService$WonderEditor   from "../../service/state/engine/DirectorEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../service/state/engine/GameObjectEngineService.js";

function addGameObject(targetGameObject, createGameObjectFunc) {
  var match = Curry._1(createGameObjectFunc, StateLogicService$WonderEditor.getEngineStateForEdit(/* () */0));
  var box1 = match[1];
  StateLogicService$WonderEditor.setEngineStateForEdit(DirectorEngineService$WonderEditor.loopBody(0, GameObjectUtils$WonderEditor.addChild(targetGameObject, box1, GameObjectEngineService$WonderEditor.initGameObject(box1, match[0]))));
  var match$1 = Curry._1(createGameObjectFunc, StateLogicService$WonderEditor.getEngineStateForRun(/* () */0));
  var box2 = match$1[1];
  StateLogicService$WonderEditor.setEngineStateForRun(DirectorEngineService$WonderEditor.loopBody(0, GameObjectUtils$WonderEditor.addChild(targetGameObject, box2, GameObjectEngineService$WonderEditor.initGameObject(box2, match$1[0]))));
  return box1;
}

export {
  addGameObject ,
  
}
/* GameObjectUtils-WonderEditor Not a pure module */