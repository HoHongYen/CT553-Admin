import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllForReport as getAllForReport } from "@/services/apiOrders";
import { subDays } from "date-fns";

export function useReports() {
    const [searchParams] = useSearchParams();

    // FILTER DATE
    let beginDate = searchParams.get("ngay-bat-dau") || "";
    let endDate = searchParams.get("ngay-ket-thuc") || "";

    // FILTER LAST
    const numDays = !searchParams.get("so-ngay-gan-nhat") ? 7 : Number(searchParams.get("so-ngay-gan-nhat"));


    beginDate = beginDate || subDays(new Date(), numDays).toISOString().split("T")[0];
    endDate = endDate || new Date().toISOString().split("T")[0];

    console.log("beginDate", beginDate);

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

