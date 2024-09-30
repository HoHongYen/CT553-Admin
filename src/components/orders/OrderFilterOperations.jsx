import { useState } from "react";
import { formatSlugify } from "@/utils/helpers";
import {
  ORDER_STATUS,
  ORDER_STATUS_TEXT,
  PAYMENT_METHOD,
  PAYMENT_METHOD_TEXT,
  PAYMENT_STATUS,
  PAYMENT_STATUS_TEXT,
} from "@/utils/constants";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import TableOperations from "@/components/ui/TableOperations";
import SortBy from "@/components/ui/SortBy";
import ButtonIcon from "@/components/ui/ButtonIcon";
import SearchBar from "./SearchBar";
import SearchBarCustomer from "../ui/SearchBar";
import FilterSelect from "../ui/FilterSelect";
import FilterDate from "../ui/FilterDate";

function OrderFilterOperations() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const orderStatusOptions = [
    { value: "tat-ca", label: "Tất cả" },
    // { value: "cho-xac-nhan", label: "Chờ xác nhận" },
    {
      value: formatSlugify(ORDER_STATUS_TEXT[ORDER_STATUS.AWAITING_CONFIRM]),
      label: ORDER_STATUS_TEXT[ORDER_STATUS.AWAITING_CONFIRM],
    },
    {
      value: formatSlugify(
        ORDER_STATUS_TEXT[ORDER_STATUS.AWAITING_FULFILLMENT]
      ),
      label: ORDER_STATUS_TEXT[ORDER_STATUS.AWAITING_FULFILLMENT],
    },
    {
      value: formatSlugify(ORDER_STATUS_TEXT[ORDER_STATUS.DELIVERING]),
      label: ORDER_STATUS_TEXT[ORDER_STATUS.DELIVERING],
    },
    {
      value: formatSlugify(ORDER_STATUS_TEXT[ORDER_STATUS.DELIVERED]),
      label: ORDER_STATUS_TEXT[ORDER_STATUS.DELIVERED],
    },
    {
      value: formatSlugify(ORDER_STATUS_TEXT[ORDER_STATUS.CANCELED]),
      label: ORDER_STATUS_TEXT[ORDER_STATUS.CANCELED],
    },
    {
      value: formatSlugify(ORDER_STATUS_TEXT[ORDER_STATUS.RETURNED]),
      label: ORDER_STATUS_TEXT[ORDER_STATUS.RETURNED],
    },
  ];

  const paymentMethodOptions = [
    { value: "tat-ca", label: "Tất cả" },
    {
      value: formatSlugify(PAYMENT_METHOD_TEXT[PAYMENT_METHOD.COD]),
      label: PAYMENT_METHOD_TEXT[PAYMENT_METHOD.COD],
    },
    {
      value: formatSlugify(PAYMENT_METHOD_TEXT[PAYMENT_METHOD.VNPAY]),
      label: PAYMENT_METHOD_TEXT[PAYMENT_METHOD.VNPAY],
    },
  ];

  const paymentStatusOptions = [
    { value: "tat-ca", label: "Tất cả" },
    {
      value: formatSlugify(PAYMENT_STATUS_TEXT[PAYMENT_STATUS.PENDING]),
      label: PAYMENT_STATUS_TEXT[PAYMENT_STATUS.PENDING],
    },
    {
      value: formatSlugify(PAYMENT_STATUS_TEXT[PAYMENT_STATUS.SUCCESS]),
      label: PAYMENT_STATUS_TEXT[PAYMENT_STATUS.SUCCESS],
    },
    {
      value: formatSlugify(PAYMENT_STATUS_TEXT[PAYMENT_STATUS.FAILED]),
      label: PAYMENT_STATUS_TEXT[PAYMENT_STATUS.FAILED],
    },
  ];

  return (
    <TableOperations>
      {isSearchOpen && (
        <div className="flex justify-end w-full">
          <SearchBar
            placeholder="Nhập mã đơn hàng..."
            style={{
              width: 250,
              height: 40,
            }}
          />
          <div className="flex">
            <ButtonIcon onClick={() => setIsSearchOpen(true)}>
              <HiMagnifyingGlass />
            </ButtonIcon>
            <ButtonIcon onClick={() => setIsSearchOpen(false)}>
              <HiXMark />
            </ButtonIcon>
          </div>
        </div>
      )}

      {!isSearchOpen && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <SearchBarCustomer
              placeholder="Nhập mã hoặc tên khách hàng..."
              style={{
                width: 300,
                height: 40,
              }}
              label="Tìm kiếm theo mã hoặc tên khách hàng"
            />

            <FilterSelect
              options={paymentMethodOptions}
              filterField="phuong-thuc-thanh-toan"
              label="Phương thức thanh toán"
            />
            <FilterSelect
              options={paymentStatusOptions}
              filterField="trang-thai-thanh-toan"
              label="Trạng thái thanh toán"
            />
            <FilterSelect
              options={orderStatusOptions}
              filterField="trang-thai-don-hang"
              label="Trạng thái đơn hàng"
            />
            <SortBy
              options={[
                { value: "don-moi-nhat", label: "Đơn mới nhất" },
                { value: "don-cu-nhat", label: "Đơn cũ nhất" },
                {
                  value: "gia-tang-dan",
                  label: "Tổng thanh toán tăng dần",
                },
                {
                  value: "gia-giam-dan",
                  label: "Tổng thanh toán giảm dần",
                },
              ]}
            />
            <ButtonIcon onClick={() => setIsSearchOpen(true)}>
              <HiMagnifyingGlass />
            </ButtonIcon>
          </div>
          <div className="flex justify-end">
            <FilterDate label="Ngày đặt hàng:" />
          </div>
        </div>
      )}
    </TableOperations>
  );
}

export default OrderFilterOperations;
