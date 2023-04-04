import React from "react";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";
import {App} from './App'

export default {
  title: 'App Component',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseElement = (props: any) => {
  return <App/>
}
