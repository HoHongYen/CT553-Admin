import { useEffect, useState } from "react";

import Spinner from "@/components/ui/Spinner";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import CategoryRow from "./CategoryRow";
import Pagination from "../ui/Pagination";
import { useCategoriesForTable } from "@/hooks/categories/useCategoriesForTable";

function CategoryTable() {
  const { isLoading, categories, totalCategories, totalPages } =
    useCategoriesForTable();

  if (isLoading) return <Spinner />;
  if (!categories.length) return <p>Không có danh mục nào!</p>;

  return (
    <Menus>
      <Table columns="1fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Mã danh mục</div>
          <div>Tên danh mục</div>
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
    </Menus>
  );
}

export default CategoryTable;
