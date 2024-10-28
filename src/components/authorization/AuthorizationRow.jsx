// import { useDeleteBanner } from "@/hooks/banners/useDeleteBanner";

import Table from "@/components/ui/Table";
import GreenTick from "./GreenTick";
import RedX from "./RedX";

function AuthorizationRow({ banner, index }) {
  // const { isDeleting, deleteBanner } = useDeleteBanner();

  const { id: bannerId, name, bannerCategory } = banner;

  const handleClick = (rowIndex, colIndex) => {
    console.log(`Row: ${rowIndex}, Col: ${colIndex}`);
  };

  return (
    <>
      <Table.Row>
        <div className="cursor-pointer" onClick={() => handleClick(index, 0)}>
          #{bannerId}
        </div>
        <div className="cursor-pointer" onClick={() => handleClick(index, 1)}>
          <GreenTick />
        </div>
        <div className="cursor-pointer" onClick={() => handleClick(index, 2)}>
          <RedX />
        </div>
        <div className="cursor-pointer" onClick={() => handleClick(index, 3)}>
          <GreenTick />
        </div>
      </Table.Row>
    </>
  );
}

export default AuthorizationRow;
