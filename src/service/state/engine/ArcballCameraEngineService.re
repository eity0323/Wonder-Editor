open Wonderjs;

let create = ArcballCameraControllerAPI.createArcballCameraController;

let unsafeGetArcballCameraControllerGameObject = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerGameObject;

let unsafeGetArcballCameraControllerDistance = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerDistance;

let unsafeGetArcballCameraControllerDirectionArray = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerDirectionArray;

let setArcballCameraControllerDistance = (value, component, state) =>
  ArcballCameraControllerAPI.setArcballCameraControllerDistance(
    component,
    value,
    state,
  );

let unsafeGetArcballCameraControllerMinDistance = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerMinDistance;

let setArcballCameraControllerMinDistance = (value, component, state) =>
  ArcballCameraControllerAPI.setArcballCameraControllerMinDistance(
    component,
    value,
    state,
  );

let unsafeGetArcballCameraControllerWheelSpeed = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerWheelSpeed;

let setArcballCameraControllerWheelSpeed = ArcballCameraControllerAPI.setArcballCameraControllerWheelSpeed;

let unsafeGetArcballCameraControllerPhi = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerPhi;

let setArcballCameraControllerPhi = ArcballCameraControllerAPI.setArcballCameraControllerPhi;

let unsafeGetArcballCameraControllerTheta = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerTheta;

let setArcballCameraControllerTheta = ArcballCameraControllerAPI.setArcballCameraControllerTheta;

let unsafeGetArcballCameraControllerThetaMargin = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerThetaMargin;

let setArcballCameraControllerThetaMargin = ArcballCameraControllerAPI.setArcballCameraControllerThetaMargin;

let unsafeGetArcballCameraControllerTarget = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerTarget;

let setArcballCameraControllerTarget = ArcballCameraControllerAPI.setArcballCameraControllerTarget;

let unsafeGetArcballCameraControllerMoveSpeedX = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerMoveSpeedX;

let setArcballCameraControllerMoveSpeedX = ArcballCameraControllerAPI.setArcballCameraControllerMoveSpeedX;

let unsafeGetArcballCameraControllerMoveSpeedY = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerMoveSpeedY;

let setArcballCameraControllerMoveSpeedY = ArcballCameraControllerAPI.setArcballCameraControllerMoveSpeedY;

let unsafeGetArcballCameraControllerRotateSpeed = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerRotateSpeed;

let setArcballCameraControllerRotateSpeed = ArcballCameraControllerAPI.setArcballCameraControllerRotateSpeed;

let bindArcballCameraControllerEventForGameView = ArcballCameraControllerAPI.bindArcballCameraControllerEvent;

let prepareBindEvent = EventArcballCameraControllerMainService.prepareBindEvent;

let unbindArcballCameraControllerEventForGameView = ArcballCameraControllerAPI.unbindArcballCameraControllerEvent;

let isBindArcballCameraControllerEventForGameView = ArcballCameraControllerAPI.isBindArcballCameraControllerEvent;

let isTriggerKeydownEventHandler = EventArcballCameraControllerMainService.isTriggerKeydownEventHandler;

let unbindAllArcballCameraControllerEvent = engineState =>
  GameObjectComponentEngineService.getAllArcballCameraControllerComponents(
    engineState,
  )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, arcballCameraController) =>
         isBindArcballCameraControllerEventForGameView(
           arcballCameraController,
           engineState,
         ) ?
           unbindArcballCameraControllerEventForGameView(
             arcballCameraController,
             engineState,
           ) :
           engineState,
       engineState,
     );