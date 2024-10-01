import Filter from "@/components/ui/Filter";
import TableOperations from "../ui/TableOperations";
import FilterWeek from "../ui/FilterWeek";
import FilterDateDashboard from "../ui/FilterDateDashboard";

function DashboardFilterOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="so-ngay-gan-nhat"
        options={[
          { value: "7", label: "Một tuần gần nhất" },
          { value: "14", label: "Hai tuần gần nhất" },
          { value: "30", label: "Một tháng gần nhất" },
        ]}
      />
      <div className="flex justify-end">
        <FilterDateDashboard />
      </div>
    </TableOperations>
  );
}

export default DashboardFilterOperations;
