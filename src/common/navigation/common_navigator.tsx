import { Route, Switch, Redirect } from "react-router-dom";
import React, { Suspense } from "react";
import RestaurantPage from "../../pages/restaurant/restaurant_page";
import ManagementPage from "../../pages/management/management_page";
import KitchenPage from "../../pages/kitchen/kitchen_page";
import WaiterPage from "../../pages/waiter/waiter_page";
import Layout from "./Layout";
import { Routes } from "../../util/constants";

function CommonNavigator() {
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
          <WaiterPage />
        </Route>
        <Route path="*">
          <div>NOTHING TO SEE HERE PAGE</div>
        </Route>
      </Switch>
    </Layout>
  );
}

export default CommonNavigator;
