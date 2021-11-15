import { Route, Switch, Redirect } from "react-router-dom";
import RestaurantPage from "../../pages/restaurant/restaurant_page";
import ManagementPage from "../../pages/management/management_page";
import KitchenPage from "../../pages/kitchen/kitchen_page";
import WaiterPage from "../../pages/waiter/waiter_page";
import Layout from "./Layout";
import { Routes } from "../../util/constants";
import WaiterContext, {
  WaiterContextInterface,
} from "../../store/waiter_context";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

function CommonNavigator() {
  const waiterContext: WaiterContextInterface = {
    restaurantId: 1,
    connection: new HubConnectionBuilder()
      .withUrl("http://localhost:5000/restauranthub")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Debug)
      .build(),
  };

  return (
    <Layout>
      <Switch>
        <Route path={Routes.HOME} exact>
          <Redirect to={Routes.RESTAURANT} />
        </Route>
        <Route path={Routes.RESTAURANT} exact>
          <RestaurantPage />
        </Route>
        <Route path={Routes.MANAGEMENT}>
          <ManagementPage />
        </Route>
        <Route path={Routes.KITCHEN}>
          <KitchenPage />
        </Route>
        <Route path={Routes.WAITER}>
          <WaiterContext.Provider value={waiterContext}>
            <WaiterPage />
          </WaiterContext.Provider>
        </Route>
        <Route path="*">
          <div>NOTHING TO SEE HERE PAGE</div>
        </Route>
      </Switch>
    </Layout>
  );
}

export default CommonNavigator;
