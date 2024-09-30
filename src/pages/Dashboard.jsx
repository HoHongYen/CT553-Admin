import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardFilterOperations from "@/components/dashboard/DashboardFilterOperations";

function Dashboard() {
  return (
    <>
      <Row>
        <Heading as="h1">Thống kê</Heading>
        <div className="flex justify-end">
          <DashboardFilterOperations />
        </div>
      </Row>
      <Row>
        <DashboardLayout />
      </Row>
    </>
  );
}

export default Dashboard;
