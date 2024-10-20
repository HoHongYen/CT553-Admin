import { useBanners } from "@/hooks/banners/useBanners";
import Spinner from "@/components/ui/Spinner";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import BannerRow from "./BannerRow";
import AddBanner from "./AddBanner";
import Pagination from "../ui/Pagination.jsx";

function BannerTable() {
  const { isLoading, banners, totalBanners, totalPages } = useBanners();

  if (isLoading) return <Spinner />;
  if (!banners.length)
    return (
      <p>
        Không có banner nào!{" "}
        <div className="mt-5 flex gap-5 justify-end">
          <AddBanner />
        </div>
      </p>
    );

  return (
    <Menus>
      <Table columns="3fr 1fr 2fr 2fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Mã banner</div>
          <div>Tên banner</div>
          <div>Danh mục</div>
          <div>Thứ tự</div>
          <div>Ngày thêm</div>
          <div>Trạng thái</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={banners}
          render={(banner) => <BannerRow key={banner.id} banner={banner} />}
        />
        <Table.Footer>
          <Pagination
            count={totalBanners}
            totalPages={totalPages}
            label="banner"
          />
        </Table.Footer>
      </Table>
      <div className="mt-5 flex gap-5 justify-end">
        <AddBanner />
      </div>
    </Menus>
  );
}

export default BannerTable;
