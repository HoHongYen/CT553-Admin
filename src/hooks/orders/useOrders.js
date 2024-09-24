import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAll as getAllOrdersApi, getAllOrderStatus } from "@/services/apiOrders";
import { formatSlugify } from "@/utils/helpers";
import { ORDER_STATUS_TEXT, PAGE_SIZE, PAYMENT_METHOD, PAYMENT_METHOD_TEXT, PAYMENT_STATUS_TEXT } from "@/utils/constants";
import { getAllPaymentMethods, getAllPaymentStatus } from "@/services/apiPayments";

export function useOrders() {
    const [searchParams] = useSearchParams();
    const [orderStatuses, setOrderStatuses] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentStatuses, setPaymentStatuses] = useState([]);

    useEffect(() => {
        const getAllData = async () => {
            const res1 = await getAllOrderStatus();
            setOrderStatuses(res1.metadata);

            const res2 = await getAllPaymentMethods();
            setPaymentMethods(res2.metadata);

            const res3 = await getAllPaymentStatus();
            setPaymentStatuses(res3.metadata);
        }

        getAllData();

    }, []);

    // FILTER
    const filterValue = searchParams.get("trang-thai-don-hang") || "tat-ca";
    const orderStatusId = filterValue === "tat-ca" ? 0 : orderStatuses.find((status) => formatSlugify(ORDER_STATUS_TEXT[status.name]) === filterValue)?.id;

    const filterPaymentMethodValue = searchParams.get("phuong-thuc-thanh-toan") || "tat-ca";
    const paymentMethodId = filterPaymentMethodValue === "tat-ca" ? 0 : paymentMethods.find((method) => formatSlugify(PAYMENT_METHOD_TEXT[method.name]) === filterPaymentMethodValue)?.id;

    const filterPaymentStatusValue = searchParams.get("trang-thai-thanh-toan") || "tat-ca";
    const paymentStatusId = filterPaymentStatusValue === "tat-ca" ? 0 : paymentStatuses.find((status) => formatSlugify(PAYMENT_STATUS_TEXT[status.name]) === filterPaymentStatusValue)?.id;

    // CUSTOMER SEARCH
    const customerSearchValue = searchParams.get("khach-hang") || "";
    const customerSearch = customerSearchValue === "" ? "" : customerSearchValue;

    // FILTER DATE
    const beginDate = searchParams.get("ngay-bat-dau") || "";
    const endDate = searchParams.get("ngay-ket-thuc") || "";

    // SORT
    const sortByRaw = searchParams.get("thu-tu") || "don-moi-nhat";
    let sortBy = { field: "createdAt", direction: "desc" };
    if (sortByRaw === "don-cu-nhat") {
        sortBy = { field: "createdAt", direction: "asc" };
    } else if (sortByRaw === "gia-tang-dan") {
        sortBy = { field: "finalPrice", direction: "asc" };
    } else if (sortByRaw === "gia-giam-dan") {
        sortBy = { field: "finalPrice", direction: "desc" };
    }

    // PAGINATION
    const page = !searchParams.get("trang")
        ? 1
        : Number(searchParams.get("trang"));

    const limit = searchParams.get("gioi-han") || PAGE_SIZE;

    const { isLoading,
        data: { metadata: { orders, pagination: { totalOrders, totalPages } } } = { metadata: { orders: [], pagination: { totalOrders: 0, totalPages: 0 } } },
    } = useQuery({
        queryKey: ["orders", customerSearch, beginDate, endDate, orderStatusId, paymentMethodId, paymentStatusId, sortBy, page, limit],
        queryFn: () => getAllOrdersApi({ customerSearch, beginDate, endDate, orderStatusId, paymentMethodId, paymentStatusId, sortBy, page, limit }),
    })

    return { isLoading, orders, totalOrders, totalPages };
}

