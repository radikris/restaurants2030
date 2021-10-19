import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import CommonNavigator from "./common/navigation/common_navigator";

import { enableMapSet } from "immer";

enableMapSet();

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <CommonNavigator />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
