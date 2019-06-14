open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("redo_undo: asset remove wdb", () => {
    let sandbox = getSandboxDefaultVal();

    let boxTexturedWDBArrayBuffer = ref(Obj.magic(1));

    beforeAll(() =>
      boxTexturedWDBArrayBuffer := WDBTool.convertGLBToWDB("BoxTextured")
    );

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~isBuildFakeDom=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~loopPipelines=
              {|
                   [
                       {
                           "name": "default",
                           "jobs": [
                               {
                                   "name": "dispose"
                               }
                           ]
                       }
                   ]
               |},
            (),
          ),
        (),
      );
      MainEditorSceneTool.initInspectorEngineState(
        ~sandbox,
        ~isInitJob=false,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~initPipelines=
              {|
             [
              {
                "name": "default",
                "jobs": [
                    {"name": "init_inspector_engine" }
                ]
              }
            ]
             |},
            ~initJobs=
              {|
             [
                {"name": "init_inspector_engine" }
             ]
             |},
            (),
          ),
        (),
      );

      StateInspectorEngineService.unsafeGetState()
      |> MainUtils._handleInspectorEngineState
      |> StateInspectorEngineService.setState
      |> ignore;

      CanvasTool.prepareInspectorCanvasAndImgCanvas(sandbox) |> ignore;

      MainEditorAssetTool.buildFakeFileReader();
      MainEditorAssetTool.buildFakeImage();

      LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);

      LoadTool.buildFakeURL(sandbox^);

      LoadTool.buildFakeLoadImage(.);

      MainEditorAssetTreeTool.BuildAssetTree.buildEmptyAssetTree() |> ignore;
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("fix bug", () =>
      testPromise(
        {|
            1.load wdb w1;
            2.drag w1 to scene to be gameObject g1;
            3.remove w1;
            4.undo;

            g1->geometry should has point data
            |},
        () =>
        MainEditorAssetUploadTool.loadOneWDB(
          ~arrayBuffer=boxTexturedWDBArrayBuffer^,
          (),
        )
        |> then_(uploadedWDBNodeId => {
             MainEditorSceneTreeTool.Drag.dragWDBAssetToSceneTree(
               ~wdbNodeId=uploadedWDBNodeId,
               (),
             );

             MainEditorAssetHeaderOperateNodeTool.removeWDBNode(
               ~wdbNodeId=uploadedWDBNodeId,
               (),
             );

             RedoUndoTool.undoHistoryState();

             let engineState = StateEngineService.unsafeGetState();

             let geometry =
               LoadWDBTool.getBoxTexturedMeshGameObject(engineState)
               |> GameObjectComponentEngineService.unsafeGetGeometryComponent(
                    _,
                    engineState,
                  );

             (
               geometry
               |> GeometryEngineService.unsafeGetGeometryVertices(_, engineState)
               |> Js.Typed_array.Float32Array.length,
               geometry
               |> GeometryEngineService.unsafeGetGeometryNormals(_, engineState)
               |> Js.Typed_array.Float32Array.length,
               geometry
               |> GeometryEngineService.unsafeGetGeometryTexCoords(_, engineState)
               |> Js.Typed_array.Float32Array.length,
               geometry
               |> GeometryEngineService.unsafeGetGeometryIndices16(_, engineState)
               |> Js.Typed_array.Uint16Array.length,
             )
             |> expect == (72, 72, 48, 36)
             |> resolve;
           })
      )
    );
  });