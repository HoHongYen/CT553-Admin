import { useEffect, useState } from "react";
import Input from "../ui/Input";
import { useSearchParams } from "react-router-dom";

function OrderFilterDate() {
  const [searchParams, setSearchParams] = useSearchParams();

  // default begin date is empty
  const [beginDate, setBeginDate] = useState("");
  // defautl end date is today
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [dateError, setDateError] = useState("");

  useEffect(() => {
    console.log("beginDate", beginDate);
    console.log("endDate", endDate);

    if (beginDate && endDate && beginDate <= endDate) {
      setDateError("");
      searchParams.delete("trang");
      searchParams.set("ngay-bat-dau", beginDate);
      searchParams.set("ngay-ket-thuc", endDate);
      setSearchParams(searchParams);
    } else {
      if (beginDate > endDate) {
        setDateError("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
      }
    }
  }, [beginDate, endDate]);

  return (
    <div className="flex gap-5 items-center">
      <span className="text[1.4rem] text-[var(--color-red-700)]">
        {dateError}
      </span>
      <label htmlFor="birthday">Ngày đặt hàng:</label>
      <span>Từ</span>
      <Input
        type="date"
        id="birthday"
        value={beginDate}
        onChange={(e) => setBeginDate(e.target.value)}
      />
      <span>đến</span>
      <Input
        type="date"
        id="birthday"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>
  );
}

export default OrderFilterDate;
