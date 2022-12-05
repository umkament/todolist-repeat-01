import React from "react";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";
import {AppWithRedux} from "./AppWithRedux";



export default {
  title: 'App Component',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseElement = (props: any) =>{
  return <AppWithRedux />
}
