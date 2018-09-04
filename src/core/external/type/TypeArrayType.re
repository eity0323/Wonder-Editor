external convertUint8ToInt : Js.Typed_array.Uint8Array.elt => int =
  "%identity";

external convertUint32ToInt : Js.Typed_array.Uint32Array.elt => int =
  "%identity";


let newBlobFromArrayBuffer = [%raw
  (arrayBuffer) => {|
  return new Blob([arrayBuffer])
    |}
];

let createObjectURL = [%raw
  blob => {|
       return URL.createObjectURL( blob )
      |}
];

let revokeObjectURL = [%raw
  blob => {|
       URL.revokeObjectURL( blob );
      |}
];