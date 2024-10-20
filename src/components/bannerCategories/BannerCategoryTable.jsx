import { useBannerCategories } from "@/hooks/bannerCategories/useBannerCategories";
import Spinner from "@/components/ui/Spinner";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import BannerCategoryRow from "./BannerCategoryRow";
import AddBannerCategory from "./AddBannerCategory";

function BannerCategoryTable() {
  const { isLoading, bannerCategories } = useBannerCategories();

  if (isLoading) return <Spinner />;
  if (!bannerCategories.length)
    return (
      <p>
        Không có danh mục banner nào!{" "}
        <div className="mt-5 flex gap-5 justify-end">
          <AddBannerCategory />
        </div>
      </p>
    );

  return (
    <Menus>
      <Table columns="2fr 2fr 2fr 1fr">
        <Table.Header>
          <div>Mã danh mục banner</div>
          <div>Tên danh mục banner</div>
          <div>Ngày thêm</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={bannerCategories}
          render={(bannerCategory) => (
            <BannerCategoryRow key={bannerCategory.id} bannerCategory={bannerCategory} />
          )}
        />
      </Table>
      <div className="mt-5 flex gap-5 justify-end">
        <AddBannerCategory />
      </div>
    </Menus>
  );
}

export default BannerCategoryTable;
