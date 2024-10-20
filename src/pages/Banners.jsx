import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BannerTable from "@/components/banners/BannerTable";
import BannerFilterOperations from "@/components/banners/BannerFilterOperations";
import BannerCategoryTable from "@/components/bannerCategories/BannerCategoryTable";

function Banners() {
  return (
    <>
      <Row>
        <Heading as="h1">Danh mục banner</Heading>
      </Row>
      <Row>
        <BannerCategoryTable />
      </Row>

      <Row>
        <Heading as="h1">Banner</Heading>
        <div className="flex justify-end">
          <BannerFilterOperations />
        </div>
      </Row>
      <Row>
        <BannerTable />
      </Row>
    </>
  );
}

export default Banners;
