import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllForReport as getAllForReport } from "@/services/apiOrders";

export function useReports() {
    const [searchParams] = useSearchParams();

    // FILTER DATE
    const beginDate = searchParams.get("ngay-bat-dau") || "";
    const endDate = searchParams.get("ngay-ket-thuc") || "";

    const { isLoading,
        data: { metadata: { ordersByDate,
            salesByDate,
            productsSoldByDate,
            parentCategoryQuantity,
            paymentMethodQuantity, usersByDate } } = { metadata: { ordersByDate: [], salesByDate: [], productsSoldByDat: [], parentCategoryQuantity: [], paymentMethodQuantity: [], usersByDate: [] } },
    } = useQuery({
        queryKey: ["reports", beginDate, endDate],
        queryFn: () => getAllForReport({ beginDate, endDate }),
    })

    return { isLoading, ordersByDate, salesByDate, productsSoldByDate, parentCategoryQuantity, paymentMethodQuantity, usersByDate };
}

