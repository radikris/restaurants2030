import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import AnalyticsPage from "./components/analytics_page";
import ManagerPage from "./components/manager_page";

export default function ManagementPage() {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em" color="black" background="papayawhip">
        <Tab>Management</Tab>
        <Tab>Analytics</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <AnalyticsPage />
        </TabPanel>
        <TabPanel>
          <ManagerPage />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
