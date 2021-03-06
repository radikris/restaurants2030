import { Route, Switch, Redirect } from "react-router-dom";
import RestaurantPage from "../../pages/restaurant/restaurant_page";
import ManagementPage from "../../pages/management/management_page";
import KitchenPage from "../../pages/kitchen/kitchen_page";
import WaiterPage from "../../pages/waiter/waiter_page";
import LoginPage from "../../pages/login/login_page";
import RegistrationPage from "../../pages/registration/registration_page";
import Layout from "./Layout";
import { Routes } from "../../util/constants";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ApiContext, { ApiContextInterface } from "../../store/api_context";
import { getToken } from "../../util/agent";

function CommonNavigator() {
  const apiContext: ApiContextInterface = {
    restaurantId: 1,
    connection: new HubConnectionBuilder()
      .withUrl("http://localhost:5000/restauranthub", {
        accessTokenFactory: () => getToken()!.toString(),
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Debug)
      .build(),
  };

  return (
    <ApiContext.Provider value={apiContext}>
      <Layout>
        <Switch>
          <Route path={Routes.HOME} exact>
            <Redirect to={Routes.RESTAURANT} />
          </Route>
          <Route path={Routes.RESTAURANT} exact>
            <RestaurantPage />
          </Route>
          <Route
            path={Routes.MANAGEMENT}
            render={(props) =>
              getToken() !== null ? (
                <ManagementPage />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path={Routes.KITCHEN}
            render={(props) =>
              getToken() !== null ? <KitchenPage /> : <Redirect to="/login" />
            }
          />
          <Route
            path={Routes.WAITER}
            render={(props) =>
              getToken() !== null ? <WaiterPage /> : <Redirect to="/login" />
            }
          />
          <Route path={Routes.LOGIN}>
            <LoginPage />
          </Route>
          <Route path={Routes.REGISTRATION}>
            <RegistrationPage />
          </Route>
          <Route path="*">
            <div>NOTHING TO SEE HERE PAGE</div>
          </Route>
        </Switch>
      </Layout>
    </ApiContext.Provider>
  );
}

export default CommonNavigator;
