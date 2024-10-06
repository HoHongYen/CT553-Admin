import * as XLSX from "xlsx";
import { useCategoriesForTable } from "@/hooks/categories/useCategoriesForTable";
import { formatDate } from "@/utils/helpers";
import { HiOutlineDownload } from "react-icons/hi";
import Spinner from "@/components/ui/Spinner";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import CategoryRow from "./CategoryRow";
import Pagination from "../ui/Pagination";
import Button from "../ui/Button";
import AddCategory from "./AddCategory";

function CategoryTable() {
  const { isLoading, categories, totalCategories, totalPages } =
    useCategoriesForTable();

  const handleDownloadExcel = () => {
    const rows = categories.map((category) => ({
      id: category.id,
      name: category.name,
      createdAt: formatDate(category.createdAt),
    }));

    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    const colWidths = [{ wch: 15 }, { wch: 40 }, { wch: 20 }];

    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh mục sản phẩm");

    // add header row

    XLSX.utils.sheet_add_aoa(worksheet, [["Danh sách danh mục sản phẩm"]], {
      origin: "A1",
    });

    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: colWidths.length - 1 } },
    ];

    // customize header names
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["Mã danh mục", "Tên danh mục", "Ngày thêm"]],
      { origin: "A2" }
    );

    XLSX.writeFile(workbook, "CategoryReport.xlsx", { compression: false });
  };

  if (isLoading) return <Spinner />;
  if (!categories.length) return <p>Không có danh mục nào!</p>;

  return (
    <Menus>
      <Table columns="1fr 1fr 2fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Mã danh mục</div>
          <div>Tên danh mục</div>
          <div>Ngày thêm</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={categories}
          render={(category) => (
            <CategoryRow key={category.id} category={category} />
          )}
        />
        <Table.Footer>
          <Pagination
            count={totalCategories}
            totalPages={totalPages}
            label="danh mục"
          />
        </Table.Footer>
      </Table>
      <div className="mt-5 flex gap-5 justify-end">
        <AddCategory />
        <Button
          variation="success"
          className="flex items-center gap-2"
          onClick={handleDownloadExcel}
        >
          <HiOutlineDownload size={14} />
          Tải file excel
        </Button>
      </div>
    </Menus>
  );
}

export default CategoryTable;
