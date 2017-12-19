open DomHelper;

let importCss = (css: string) => {};

importCss("./css/app.css");

let component = ReasonReact.statelessComponent("App");

let make = (~state as store: AppStore.appState, ~dispatch, _children) => {
  let addExtension = (text) =>
    /* todo use extension names instead of the name */
    AppExtensionView.setExtension(AppExtensionView.storageParentKey, text);
  {
    ...component,
    initialState: () => {
      AppExtensionView.getExtensionAndHandle(
        AppExtensionView.storageParentKey,
        (value) =>
          switch value {
          | None => ()
          | Some(value) =>
            let componentsMap = ExtensionParseSystem.createComponentMap(value);
            dispatch(AppStore.MapAction(StoreMap(Some(componentsMap))))
          }
      );
      dispatch(AppStore.IsDidMounted)
    },
    render: (_self) =>
      switch store.isDidMounted {
      | false => <div key="app" className="app-component" />
      | true =>
        <div key="app" className="app-component">
          (
            AppExtensionView.getExtensionAndHandle(
              AppExtensionView.storageParentKey,
              (value) =>
                switch value {
                | None => ReasonReact.nullElement
                | Some(value) =>
                  ReasonReact.arrayToElement(
                    ExtensionParseSystem.extensionPanelComponent("App", value, store)
                  )
                }
            )
          )
          <FileInput buttonText="show Input" onSubmit=((value) => addExtension(value)) />
          <MainEditor store dispatch />
        </div>
      }
  }
};