import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DatePicker } from "antd";

import locale from "antd/es/date-picker/locale/vi_VN";
import moment from "moment";
import { set } from "date-fns";
moment.locale("vi");

function FilterWeek({ label = null }) {
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

  const weekFormat = "DD/MM";
  const monthFormat = "MM/YYYY";

  const customWeekStartEndFormat = (date) => {
    let beginDate = new Date(date.toISOString());
    let endDate = new Date(date.toISOString());
    endDate.setDate(endDate.getDate() + 6);

    // begin date and end date plus 1
    beginDate.setDate(beginDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);

    return `${moment(beginDate).format(weekFormat)} - ${moment(endDate).format(
      weekFormat
    )}`;
  };

  return (
    <div className="flex gap-5 items-center">
      <span className="text[1.4rem] text-[var(--color-red-700)]">
        {dateError}
      </span>
      <label htmlFor="beginDate">{label}</label>

      <DatePicker
        size="large"
        locale={locale}
        format={customWeekStartEndFormat}
        picker="week"
        onChange={(date) => {
          let beginDate = new Date(date.toISOString());
          let endDate = new Date(date.toISOString());
          endDate.setDate(endDate.getDate() + 6);

          if (beginDate && endDate) {
            setDateError("");
            searchParams.delete("trang");
            searchParams.delete("ngay-bat-dau");
            searchParams.delete("ngay-ket-thuc");
            setSearchParams(searchParams);
          }

          setBeginDate(beginDate.toISOString().split("T")[0]);
          setEndDate(endDate.toISOString().split("T")[0]);
        }}
      />

      <DatePicker
        size="large"
        locale={locale}
        format={monthFormat}
        picker="month"
      />

      <DatePicker
        size="large"
        locale={locale}
        // defaultValue={moment()}
        format={"YYYY"}
        picker="year"
      />
    </div>
  );
}

export default FilterWeek;
