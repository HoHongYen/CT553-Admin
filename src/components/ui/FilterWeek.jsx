import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DatePicker } from "antd";

import locale from "antd/es/date-picker/locale/vi_VN";
import moment from "moment";
import { format, lastDayOfMonth } from "date-fns";
moment.locale("vi");

function FilterWeek() {
  const [searchParams, setSearchParams] = useSearchParams();

  // default begin date is empty
  const [beginDate, setBeginDate] = useState(null);
  // default end date is today
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [dateError, setDateError] = useState("");

  useEffect(() => {
    console.log("beginDate", beginDate);
    console.log("endDate", endDate);

    if (beginDate && endDate) {
      setDateError("");
      searchParams.delete("trang");
      searchParams.set("ngay-bat-dau", beginDate);
      searchParams.set("ngay-ket-thuc", endDate);
      setSearchParams(searchParams);
    }
  }, [beginDate, endDate]);

  const monthFormat = "MM/YYYY";

  return (
    <div className="flex gap-5 items-center">
      <span className="text[1.4rem] text-[var(--color-red-700)]">
        {dateError}
      </span>

      <DatePicker
        size="large"
        locale={locale}
        format={monthFormat}
        picker="month"
        defaultValue={moment(endDate)}
        onChange={(date, dateString) => {
          console.log("date", date);
          console.log("dateString", dateString);

          // end date is last day of month
          let endDate = new Date(date.toISOString());
          endDate = lastDayOfMonth(endDate);
          // begin date is first day of month
          let beginDate = new Date(date.toISOString());
          beginDate.setDate(1);

          // end date and begin date plus 1
          endDate.setDate(endDate.getDate() + 1);
          beginDate.setDate(beginDate.getDate() + 1);

          setEndDate(endDate.toISOString().split("T")[0]);
          setBeginDate(beginDate.toISOString().split("T")[0]);
        }}
      />

      <DatePicker
        size="large"
        value={null}
        locale={locale}
        format={"YYYY"}
        picker="year"
      />
    </div>
  );
}

export default FilterWeek;
