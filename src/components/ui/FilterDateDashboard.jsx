import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { lastDayOfMonth } from "date-fns";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

import dayjs from "dayjs";
import "dayjs/locale/vi";
import { lastDayOfYear } from "date-fns/lastDayOfYear";
dayjs.locale("vi");

function FilterDateDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dateFormat = "DD/MM/YYYY";
  const monthFormat = "MM/YYYY";
  const yearFormat = "YYYY";

  const [beginDate, setBeginDate] = useState();
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (beginDate && endDate && beginDate <= endDate) {
      searchParams.delete("trang");
      searchParams.delete("so-ngay-gan-nhat");
      searchParams.set("ngay-bat-dau", beginDate);
      searchParams.set("ngay-ket-thuc", endDate);
      setSearchParams(searchParams);
    }
  }, [beginDate, endDate]);

  useEffect(() => {
    if (searchParams.has("so-ngay-gan-nhat")) {
      setIsRangePicker(false);
      setIsMonthPicker(false);
      setIsYearPicker(false);
    }
  }, [searchParams]);

  const [isRangePicker, setIsRangePicker] = useState(false);
  const [isMonthPicker, setIsMonthPicker] = useState(false);
  const [isYearPicker, setIsYearPicker] = useState(false);

  return (
    <div className="flex gap-5 items-center">
      <RangePicker
        format={dateFormat}
        size="large"
        value={isRangePicker ? [dayjs(beginDate), dayjs(endDate)] : null}
        onChange={(dates) => {
          setIsRangePicker(true);
          setIsMonthPicker(false);
          setIsYearPicker(false);

          let beginDate = new Date(dates[0].toISOString());
          let endDate = new Date(dates[1].toISOString());

          // begin date and end date plus 1
          beginDate.setDate(beginDate.getDate() + 1);
          endDate.setDate(endDate.getDate() + 1);

          setBeginDate(beginDate.toISOString().split("T")[0]);
          setEndDate(endDate.toISOString().split("T")[0]);
        }}
      />

      <DatePicker
        size="large"
        format={monthFormat}
        picker="month"
        value={isMonthPicker ? dayjs(beginDate) : null}
        onChange={(date) => {
          setIsMonthPicker(true);
          setIsRangePicker(false);
          setIsYearPicker(false);

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
        format={yearFormat}
        picker="year"
        value={isYearPicker ? dayjs(beginDate) : null}
        onChange={(date) => {
          setIsYearPicker(true);
          setIsMonthPicker(false);
          setIsRangePicker(false);

          // end date is last day of year
          let endDate = new Date(date.toISOString());
          endDate = lastDayOfYear(endDate);
          // begin date is first day of year
          let beginDate = new Date(date.toISOString());
          beginDate.setDate(1);
          beginDate.setMonth(0);

          // end date and begin date plus 1
          endDate.setDate(endDate.getDate() + 1);
          beginDate.setDate(beginDate.getDate() + 1);

          setEndDate(endDate.toISOString().split("T")[0]);
          setBeginDate(beginDate.toISOString().split("T")[0]);
        }}
      />
    </div>
  );
}

export default FilterDateDashboard;
