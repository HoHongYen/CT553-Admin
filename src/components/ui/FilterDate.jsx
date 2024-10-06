import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

function FilterDate({ label = null }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // default begin date is empty
  const [beginDate, setBeginDate] = useState();
  // default end date is today
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (beginDate && endDate && beginDate <= endDate) {
      setDateError("");
      searchParams.delete("trang");
      searchParams.delete("so-ngay-gan-nhat");
      searchParams.set("ngay-bat-dau", beginDate);
      searchParams.set("ngay-ket-thuc", endDate);
      setSearchParams(searchParams);
    } else {
      if (beginDate > endDate) {
        setDateError("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
      }
    }
  }, [beginDate, endDate]);

  const dateFormat = "DD/MM/YYYY";

  return (
    <div className="flex gap-5 items-center">
      <span className="text[1.4rem] text-[var(--color-red-700)]">
        {dateError}
      </span>
      <label htmlFor="beginDate">{label}</label>

      <RangePicker
        size="large"
        allowEmpty={[true, true]}
        onChange={(dates) => {
          let beginDate = new Date(dates[0].toISOString());
          let endDate = new Date(dates[1].toISOString());

          // begin date and end date plus 1
          beginDate.setDate(beginDate.getDate() + 1);
          endDate.setDate(endDate.getDate() + 1);

          setBeginDate(beginDate.toISOString().split("T")[0]);
          setEndDate(endDate.toISOString().split("T")[0]);
        }}
        format={dateFormat}
      />
    </div>
  );
}

export default FilterDate;
