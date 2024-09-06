import { useCategories } from "@/hooks/categories/useCategories";

import Spinner from "@/components/ui/Spinner";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import CategoryRow from "./CategoryRow";
import { useEffect, useState } from "react";

function CategoryTable() {
  const { isLoading, categories } = useCategories();

  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    if (categories?.length > 0) {
      let arr = [...categories];
      categories.map((category) => {
        arr = [...arr, ...category.children];
      });
      setAllCategories(arr);
      console.log(arr);
    }
  }, [categories]);

  if (isLoading) return <Spinner />;
  if (!allCategories.length) return <p>Không có danh mục nào!</p>;

  // 1. Filter
  // const filterValue = searchParams.get("discount") || "all";
  // let filteredCabins;
  // if (filterValue === "all") filteredCabins = cabins;
  // if (filterValue === "no-discount")
  //   filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  // if (filterValue === "with-discount")
  //   filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2. Sort
  // const sortBy = searchParams.get("sortBy") || "create_at-asc";
  // const [field, direction] = sortBy.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // const sortedCabins = filteredCabins.sort(
  //   (a, b) => (a[field] - b[field]) * modifier
  // );

  return (
    <Menus>
      <Table columns="1fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Mã</div>
          <div>Tên danh mục</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={sortedCabins}
          data={allCategories}
          render={(category) => (
            <CategoryRow key={category.id} category={category} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CategoryTable;
