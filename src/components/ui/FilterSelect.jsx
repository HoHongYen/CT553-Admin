import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function FilterSelect({ options, filterField, label = null }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleChange(e) {
    searchParams.set(filterField, e.target.value);
    if (searchParams.get("trang")) searchParams.set("trang", 1);

    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      // type="white"
      value={currentFilter}
      onChange={handleChange}
      label={label}
    />
  );
}

export default FilterSelect;
