import Filter from "@/components/ui/Filter";
import TableOperations from "../ui/TableOperations";
import FilterWeek from "../ui/FilterWeek";
import FilterDate from "../ui/FilterDate";

function DashboardFilterOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="last"
        options={[
          { value: "7", label: "Last 7 days" },
          { value: "14", label: "Last 14 days" },
          { value: "30", label: "Last 30 days" },
        ]}
      />
      <div className="flex justify-end">
        <FilterDate label="Thời gian lọc:" />
        {/* <FilterWeek /> */}
      </div>
    </TableOperations>
  );
}

export default DashboardFilterOperations;
