import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardFilter from "@/components/dashboard/DashboardFilter";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
