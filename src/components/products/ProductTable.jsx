import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/products/useProducts";
import { calculateRating, formatDate } from "@/utils/helpers";
import { HiOutlineDownload } from "react-icons/hi";
import ProductRow from "./ProductRow";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import Spinner from "@/components/ui/Spinner";
import Pagination from "@/components/ui/Pagination";
import Button from "../ui/Button";

function ProductTable() {
  const navigate = useNavigate();
  const { isLoading, products, totalProducts, totalPages } = useProducts();

  const handleDownloadExcel = () => {
    const rows = products.map((product) => ({
      id: product.id,
      name: product.name,
      createdAt: formatDate(product.createdAt),
      productDiscount:
        product.productDiscount.length > 0 ? "Đang giảm giá" : "Không có",
      soldNumber: product.soldNumber,
      totalQuantity: product.totalQuantity,
      reviews: calculateRating(product.reviews),
    }));

    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    const colWidths = [
      { wch: 15 },
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
    ];

    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sản phẩm");

    // add header row

    XLSX.utils.sheet_add_aoa(worksheet, [["Danh sách sản phẩm"]], {
      origin: "A1",
    });

    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: colWidths.length - 1 } },
    ];

    // customize header names
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "Mã sản phẩm",
          "Tên sản phẩm",
          "Ngày thêm",
          "Giảm giá",
          "Đã bán",
          "Còn lại",
          "Đánh giá",
        ],
      ],
      { origin: "A2" }
    );

    XLSX.writeFile(workbook, "ProductReport.xlsx", { compression: false });
  };

  if (isLoading) return <Spinner />;
  if (!products.length) return <p>Không có sản phẩm nào!</p>;

  return (
    <Menus>
      <Table columns="1fr 1fr 4.5fr 1.5fr 1.8fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Mã sản phẩm</div>
          <div>Tên sản phẩm</div>
          <div>Ngày thêm</div>
          <div>Giảm giá</div>
          <div>Đã bán</div>
          <div>Còn lại</div>
          <div>Đánh giá</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={products}
          render={(product) => (
            <ProductRow key={product.id} product={product} />
          )}
        />

        <Table.Footer>
          <Pagination
            count={totalProducts}
            totalPages={totalPages}
            label="sản phẩm"
          />
        </Table.Footer>
      </Table>
      <div className="mt-5 flex gap-5 justify-end">
        <Button onClick={() => navigate("/san-pham/tao-moi")}>
          <span className="mr-2">+</span>
          Thêm sản phẩm
        </Button>
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

export default ProductTable;
