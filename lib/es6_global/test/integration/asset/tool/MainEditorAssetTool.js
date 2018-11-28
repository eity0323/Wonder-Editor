

import * as TextureUtils$WonderEditor from "../../../../src/core/utils/engine/TextureUtils.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as AssetHeaderUtils$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/asset/composable_component/utils/AssetHeaderUtils.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeEventTool$WonderEditor from "./AssetTreeEventTool.js";
import * as AssetTreeNodeUtils$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/asset/utils/AssetTreeNodeUtils.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as AssetIndexEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetIndexEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetJsonNodeMapEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetJsonNodeMapEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../src/service/state/engine/BasicSourceTextureEngineService.js";
import * as AssetImageBase64MapEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetImageBase64MapEditorService.js";
import * as AssetTextureNodeMapEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetTextureNodeMapEditorService.js";

var buildFakeFileReader = (
     function (){
       window.FileReader = function(){
         this.result = null;
         this.onload = null;
         this.readAsDataURL = function(file) {
            this.result = file.file;
            this.onload();
         };
         this.readAsText = function(file) {
            this.result = file.file;
            this.onload();
         };
         this.readAsArrayBuffer = function(file) {
            this.result = file.file;
            this.onload();
         };
       }
     }
);

var buildFakeImage = (
     function (){
       window.Image = function(){
         this.src = null;
         this.onload = null;
         this.complete = true;
       }
     }
);

function _buildJsonResult(parentId) {
  return /* record */[
          /* name */"newJson",
          /* postfix */".json",
          /* parentId */parentId,
          /* jsonResult */"json result"
        ];
}

function _buildImageObj(src) {
  return {
          src: src,
          getAttribute: (function () {
              return src;
            })
        };
}

function addJsonIntoNodeMap(index, parentId, editorState) {
  return AssetJsonNodeMapEditorService$WonderEditor.setResult(index, _buildJsonResult(parentId), editorState);
}

function addTextureIntoNodeMap(index, parentId, textureName, editorState) {
  var match = TextureUtils$WonderEditor.createAndInitTexture(textureName, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var textureIndex = match[0];
  var imageSrc = textureName + "img";
  StateEngineService$WonderEditor.setState(BasicSourceTextureEngineService$WonderEditor.setSource(_buildImageObj(imageSrc), textureIndex, match[1]));
  return AssetTextureNodeMapEditorService$WonderEditor.setResult(index, AssetTextureNodeMapEditorService$WonderEditor.buildTextureNodeResult(textureIndex, parentId, textureIndex), AssetImageBase64MapEditorService$WonderEditor.setResult(textureIndex, AssetImageBase64MapEditorService$WonderEditor.buildImageResult(imageSrc, imageSrc + ".jpg", /* array */[textureIndex]), editorState));
}

function _increaseIndex(editorState) {
  var editorState$1 = AssetIndexEditorService$WonderEditor.increaseIndex(editorState);
  var index = AssetIndexEditorService$WonderEditor.getIndex(editorState$1);
  return /* tuple */[
          index,
          editorState$1
        ];
}

function buildTwoLayerAssetTreeRoot() {
  var match = _increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
  var rootId = match[0];
  var match$1 = _increaseIndex(match[1]);
  var id1 = match$1[0];
  var match$2 = _increaseIndex(match$1[1]);
  var id2 = match$2[0];
  var match$3 = _increaseIndex(match$2[1]);
  var id3 = match$3[0];
  var match$4 = _increaseIndex(match$3[1]);
  var id4 = match$4[0];
  var match$5 = _increaseIndex(match$4[1]);
  var id5 = match$5[0];
  StateEditorService$WonderEditor.setState(AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
            /* id */rootId,
            /* children : array */[
              /* record */[
                /* id */id1,
                /* children : array */[],
                /* type_ : Folder */0,
                /* isShowChildren */true
              ],
              /* record */[
                /* id */id2,
                /* children : array */[],
                /* type_ : Folder */0,
                /* isShowChildren */true
              ],
              /* record */[
                /* id */id3,
                /* children : array */[],
                /* type_ : Texture */2,
                /* isShowChildren */true
              ],
              /* record */[
                /* id */id4,
                /* children : array */[],
                /* type_ : Json */1,
                /* isShowChildren */true
              ],
              /* record */[
                /* id */id5,
                /* children : array */[],
                /* type_ : Texture */2,
                /* isShowChildren */true
              ]
            ],
            /* type_ : Folder */0,
            /* isShowChildren */true
          ], addTextureIntoNodeMap(id5, rootId, "texture5", addJsonIntoNodeMap(id4, rootId, addTextureIntoNodeMap(id3, rootId, "texture3", AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                            /* id */rootId,
                            /* children : array */[
                              /* record */[
                                /* id */id1,
                                /* children : array */[],
                                /* type_ : Folder */0,
                                /* isShowChildren */true
                              ],
                              /* record */[
                                /* id */id2,
                                /* children : array */[],
                                /* type_ : Folder */0,
                                /* isShowChildren */true
                              ]
                            ],
                            /* type_ : Folder */0,
                            /* isShowChildren */true
                          ], AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(id2, rootId, AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                    /* id */rootId,
                                    /* children : array */[/* record */[
                                        /* id */id1,
                                        /* children : array */[],
                                        /* type_ : Folder */0,
                                        /* isShowChildren */true
                                      ]],
                                    /* type_ : Folder */0,
                                    /* isShowChildren */true
                                  ], AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(id1, rootId, AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(rootId, undefined, AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                                /* id */rootId,
                                                /* children : array */[],
                                                /* type_ : Folder */0,
                                                /* isShowChildren */true
                                              ], match$5[1])))))))))));
  return /* record */[
          /* root */0,
          /* firstLayer : record */[
            /* length */4,
            /* folderDomIndexArr : array */[
              1,
              2
            ],
            /* jsonDomIndexArr : array */[4],
            /* textureData : record */[
              /* domIndexArr : array */[
                3,
                5
              ],
              /* lastIndex */1
            ]
          ],
          /* treeNodeIdData : record */[
            /* folderNodeIdArr : array */[
              rootId,
              id1,
              id2
            ],
            /* jsonNodeIdArr : array */[id4],
            /* textureNodeIdArr : array */[
              id3,
              id5
            ]
          ]
        ];
}

function buildTwoLayerAssetTreeRootTest() {
  var match = _increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
  var rootId = match[0];
  var match$1 = _increaseIndex(match[1]);
  var id1 = match$1[0];
  var match$2 = _increaseIndex(match$1[1]);
  var id2 = match$2[0];
  var match$3 = _increaseIndex(match$2[1]);
  var id3 = match$3[0];
  var match$4 = _increaseIndex(match$3[1]);
  var id4 = match$4[0];
  var match$5 = _increaseIndex(match$4[1]);
  var id5 = match$5[0];
  StateEditorService$WonderEditor.setState(AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
            /* id */rootId,
            /* children : array */[
              /* record */[
                /* id */id1,
                /* children : array */[],
                /* type_ : Folder */0,
                /* isShowChildren */true
              ],
              /* record */[
                /* id */id2,
                /* children : array */[/* record */[
                    /* id */id5,
                    /* children : array */[],
                    /* type_ : Texture */2,
                    /* isShowChildren */true
                  ]],
                /* type_ : Folder */0,
                /* isShowChildren */true
              ],
              /* record */[
                /* id */id3,
                /* children : array */[],
                /* type_ : Texture */2,
                /* isShowChildren */true
              ],
              /* record */[
                /* id */id4,
                /* children : array */[],
                /* type_ : Json */1,
                /* isShowChildren */true
              ]
            ],
            /* type_ : Folder */0,
            /* isShowChildren */true
          ], addTextureIntoNodeMap(id5, id2, "texture5", addJsonIntoNodeMap(id4, rootId, addTextureIntoNodeMap(id3, rootId, "texture3", AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                            /* id */rootId,
                            /* children : array */[
                              /* record */[
                                /* id */id1,
                                /* children : array */[],
                                /* type_ : Folder */0,
                                /* isShowChildren */true
                              ],
                              /* record */[
                                /* id */id2,
                                /* children : array */[],
                                /* type_ : Folder */0,
                                /* isShowChildren */true
                              ]
                            ],
                            /* type_ : Folder */0,
                            /* isShowChildren */true
                          ], AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(id2, rootId, AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                    /* id */rootId,
                                    /* children : array */[/* record */[
                                        /* id */id1,
                                        /* children : array */[],
                                        /* type_ : Folder */0,
                                        /* isShowChildren */true
                                      ]],
                                    /* type_ : Folder */0,
                                    /* isShowChildren */true
                                  ], AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(id1, rootId, AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(rootId, undefined, AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                                /* id */rootId,
                                                /* children : array */[],
                                                /* type_ : Folder */0,
                                                /* isShowChildren */true
                                              ], match$5[1])))))))))));
  return /* record */[
          /* root */0,
          /* firstLayer : record */[
            /* length */4,
            /* folderDomIndexArr : array */[
              1,
              2
            ],
            /* jsonDomIndexArr : array */[4],
            /* textureData : record */[
              /* domIndexArr : array */[
                3,
                5
              ],
              /* lastIndex */1
            ]
          ],
          /* treeNodeIdData : record */[
            /* folderNodeIdArr : array */[
              rootId,
              id1,
              id2
            ],
            /* jsonNodeIdArr : array */[id4],
            /* textureNodeIdArr : array */[
              id3,
              id5
            ]
          ]
        ];
}

function buildThreeLayerAssetTreeRoot() {
  var match = _increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
  var rootId = match[0];
  var match$1 = _increaseIndex(match[1]);
  var id1 = match$1[0];
  var match$2 = _increaseIndex(match$1[1]);
  var id2 = match$2[0];
  var match$3 = _increaseIndex(match$2[1]);
  var id3 = match$3[0];
  var match$4 = _increaseIndex(match$3[1]);
  var id4 = match$4[0];
  var match$5 = _increaseIndex(match$4[1]);
  var id5 = match$5[0];
  var match$6 = _increaseIndex(match$5[1]);
  var id6 = match$6[0];
  StateEditorService$WonderEditor.setState(AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
            /* id */rootId,
            /* children : array */[
              /* record */[
                /* id */id1,
                /* children : array */[],
                /* type_ : Folder */0,
                /* isShowChildren */true
              ],
              /* record */[
                /* id */id2,
                /* children : array */[
                  /* record */[
                    /* id */id3,
                    /* children : array */[],
                    /* type_ : Folder */0,
                    /* isShowChildren */true
                  ],
                  /* record */[
                    /* id */id4,
                    /* children : array */[],
                    /* type_ : Folder */0,
                    /* isShowChildren */true
                  ],
                  /* record */[
                    /* id */id5,
                    /* children : array */[],
                    /* type_ : Texture */2,
                    /* isShowChildren */true
                  ],
                  /* record */[
                    /* id */id6,
                    /* children : array */[],
                    /* type_ : Json */1,
                    /* isShowChildren */true
                  ]
                ],
                /* type_ : Folder */0,
                /* isShowChildren */true
              ]
            ],
            /* type_ : Folder */0,
            /* isShowChildren */true
          ], addJsonIntoNodeMap(id6, id2, AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                    /* id */rootId,
                    /* children : array */[
                      /* record */[
                        /* id */id1,
                        /* children : array */[],
                        /* type_ : Folder */0,
                        /* isShowChildren */true
                      ],
                      /* record */[
                        /* id */id2,
                        /* children : array */[
                          /* record */[
                            /* id */id3,
                            /* children : array */[],
                            /* type_ : Folder */0,
                            /* isShowChildren */true
                          ],
                          /* record */[
                            /* id */id4,
                            /* children : array */[],
                            /* type_ : Folder */0,
                            /* isShowChildren */true
                          ],
                          /* record */[
                            /* id */id5,
                            /* children : array */[],
                            /* type_ : Texture */2,
                            /* isShowChildren */true
                          ]
                        ],
                        /* type_ : Folder */0,
                        /* isShowChildren */true
                      ]
                    ],
                    /* type_ : Folder */0,
                    /* isShowChildren */true
                  ], addTextureIntoNodeMap(id5, id2, "texture5", AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                            /* id */rootId,
                            /* children : array */[
                              /* record */[
                                /* id */id1,
                                /* children : array */[],
                                /* type_ : Folder */0,
                                /* isShowChildren */true
                              ],
                              /* record */[
                                /* id */id2,
                                /* children : array */[
                                  /* record */[
                                    /* id */id3,
                                    /* children : array */[],
                                    /* type_ : Folder */0,
                                    /* isShowChildren */true
                                  ],
                                  /* record */[
                                    /* id */id4,
                                    /* children : array */[],
                                    /* type_ : Folder */0,
                                    /* isShowChildren */true
                                  ]
                                ],
                                /* type_ : Folder */0,
                                /* isShowChildren */true
                              ]
                            ],
                            /* type_ : Folder */0,
                            /* isShowChildren */true
                          ], AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(id4, id2, AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                    /* id */rootId,
                                    /* children : array */[
                                      /* record */[
                                        /* id */id1,
                                        /* children : array */[],
                                        /* type_ : Folder */0,
                                        /* isShowChildren */true
                                      ],
                                      /* record */[
                                        /* id */id2,
                                        /* children : array */[/* record */[
                                            /* id */id3,
                                            /* children : array */[],
                                            /* type_ : Folder */0,
                                            /* isShowChildren */true
                                          ]],
                                        /* type_ : Folder */0,
                                        /* isShowChildren */true
                                      ]
                                    ],
                                    /* type_ : Folder */0,
                                    /* isShowChildren */true
                                  ], AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(id3, id2, AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                            /* id */rootId,
                                            /* children : array */[
                                              /* record */[
                                                /* id */id1,
                                                /* children : array */[],
                                                /* type_ : Folder */0,
                                                /* isShowChildren */true
                                              ],
                                              /* record */[
                                                /* id */id2,
                                                /* children : array */[],
                                                /* type_ : Folder */0,
                                                /* isShowChildren */true
                                              ]
                                            ],
                                            /* type_ : Folder */0,
                                            /* isShowChildren */true
                                          ], AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(id2, rootId, AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                                    /* id */rootId,
                                                    /* children : array */[/* record */[
                                                        /* id */id1,
                                                        /* children : array */[],
                                                        /* type_ : Folder */0,
                                                        /* isShowChildren */true
                                                      ]],
                                                    /* type_ : Folder */0,
                                                    /* isShowChildren */true
                                                  ], AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(id1, rootId, AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(rootId, undefined, AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                                                /* id */rootId,
                                                                /* children : array */[],
                                                                /* type_ : Folder */0,
                                                                /* isShowChildren */true
                                                              ], match$6[1])))))))))))))));
  return /* record */[
          /* root */0,
          /* firstLayer : record */[
            /* length */1,
            /* folderDomIndexArr : array */[
              1,
              2
            ],
            /* jsonDomIndexArr : array */[],
            /* textureData : record */[
              /* domIndexArr : array */[],
              /* lastIndex */0
            ]
          ],
          /* secondLayer : record */[
            /* layerRoot */2,
            /* length */3,
            /* folderDomIndexArr : array */[
              1,
              2
            ],
            /* jsonDomIndexArr : array */[4],
            /* textureData : record */[
              /* domIndexArr : array */[3],
              /* lastIndex */0
            ]
          ],
          /* treeNodeIdData : record */[
            /* folderNodeIdArr : array */[
              rootId,
              id1,
              id2,
              id3,
              id4
            ],
            /* jsonNodeIdArr : array */[id6],
            /* textureNodeIdArr : array */[id5]
          ]
        ];
}

function initAssetTree() {
  return StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
                var match = AssetTreeNodeUtils$WonderEditor.initRootAssetTree(editorState);
                return AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(match[0], match[1]);
              }));
}

function clickAssetChildrenNodeToSetCurrentNode(index) {
  var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                return AssetTreeEventTool$WonderEditor.clickAssetTreeChildrenNode(index, param);
              }));
}

function clickAssetTreeNodeToSetCurrentNode(component, index) {
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                return AssetTreeEventTool$WonderEditor.clickAssetTreeNode(index, param);
              }));
}

var fileLoad = AssetHeaderUtils$WonderEditor.fileLoad;

export {
  buildFakeFileReader ,
  buildFakeImage ,
  _buildJsonResult ,
  _buildImageObj ,
  addJsonIntoNodeMap ,
  addTextureIntoNodeMap ,
  _increaseIndex ,
  buildTwoLayerAssetTreeRoot ,
  buildTwoLayerAssetTreeRootTest ,
  buildThreeLayerAssetTreeRoot ,
  initAssetTree ,
  clickAssetChildrenNodeToSetCurrentNode ,
  clickAssetTreeNodeToSetCurrentNode ,
  fileLoad ,
  
}
/* buildFakeFileReader Not a pure module */