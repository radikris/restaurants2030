import { Box, SimpleGrid } from "@chakra-ui/react";
import ChartCard from ".././components/chart_card";
import CustomHorizontalBarChart from ".././components/horizontal_bar_chart";
import CustomPieChart from ".././components/pie_chart";

export default function ManagerPage() {
  return (
    <Box>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 5, lg: 8 }}
        mb={5}
      >
        <ChartCard showDateSelect={true} title={"Weekly income"}>
          <CustomHorizontalBarChart />
        </ChartCard>

        <ChartCard showDateSelect={false} title={"Most popular foods"}>
          <CustomPieChart />
        </ChartCard>
      </SimpleGrid>
    </Box>
  );
}
