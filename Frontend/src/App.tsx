import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "react-router-dom";
import {createBrowserHistory} from 'history';
import CommonNavigator from "./common/navigation/common_navigator";

import { enableMapSet } from "immer";

enableMapSet();

export const history = createBrowserHistory();

function App() {
  return (
    <ChakraProvider>
      <Router history={history}>
        <CommonNavigator />
      </Router>
    </ChakraProvider>
  );
}

export default App;
