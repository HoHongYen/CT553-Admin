import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { lastDayOfMonth, set } from "date-fns";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

import locale from "antd/es/date-picker/locale/vi_VN";
import moment from "moment";
moment.locale("vi");

function FilterDateDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const monthFormat = "MM/YYYY";

  // default begin date is empty
  const [beginDate, setBeginDate] = useState();
  // default end date is today
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    console.log("beginDate", beginDate);
    console.log("endDate", endDate);

    if (beginDate && endDate && beginDate <= endDate) {
      searchParams.delete("trang");
      searchParams.delete("so-ngay-gan-nhat");
      searchParams.set("ngay-bat-dau", beginDate);
      searchParams.set("ngay-ket-thuc", endDate);
      setSearchParams(searchParams);
    }
  }, [beginDate, endDate]);

  const dateFormat = "DD/MM/YYYY";

  return (
    <div className="flex gap-5 items-center">
      <RangePicker
        size="large"
        locale={locale}
        allowEmpty={[true, true]}
        onChange={(dates, dateStrings) => {
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

      <DatePicker
        size="large"
        locale={locale}
        format={monthFormat}
        picker="month"
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
        locale={locale}
        format={"YYYY"}
        picker="year"
      />
    </div>
  );
}

export default FilterDateDashboard;
