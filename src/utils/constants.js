export const PAGE_SIZE = 10;

export const PRODUCT_NEWEST = "Newest";
export const PRODUCT_TRENDING = "Trending";
export const PRODUCT_FOR_YOU = "ForYou";
export const PRODUCT_ALL = "All";
export const PRODUCT_SALES = "Sales";

export const PERCENTAGE = "percentage";
export const FIXED_AMOUNT = "fixed_amount";
export const DISCOUNT_TYPES = [PERCENTAGE, FIXED_AMOUNT];

export const ORDER_STATUS = {
    AWAITING_CONFIRM: "AWAITING_CONFIRM",
    AWAITING_FULFILLMENT: "AWAITING_FULFILLMENT",
    DELIVERING: "DELIVERING",
    DELIVERED: "DELIVERED",
    CANCELED: "CANCELED",
    RETURNED: "RETURNED",
};

export const ORDER_STATUS_TEXT = {
    [ORDER_STATUS.AWAITING_CONFIRM]: "Chờ xác nhận",
    [ORDER_STATUS.AWAITING_FULFILLMENT]: "Đang xử lý",
    [ORDER_STATUS.DELIVERING]: "Đang giao",
    [ORDER_STATUS.DELIVERED]: "Đã giao",
    [ORDER_STATUS.CANCELED]: "Đã hủy",
    [ORDER_STATUS.RETURNED]: "Đổi trả",
};

export const ORDER_STATUS_COLOR = {
    [ORDER_STATUS.AWAITING_CONFIRM]: "blue",
    [ORDER_STATUS.AWAITING_FULFILLMENT]: "indigo",
    [ORDER_STATUS.DELIVERING]: "yellow",
    [ORDER_STATUS.DELIVERED]: "green",
    [ORDER_STATUS.CANCELED]: "red",
    [ORDER_STATUS.RETURNED]: "grey",
};

export const PAYMENT_METHOD = {
    COD: "COD",
    VNPAY: "VNPAY",
}

export const PAYMENT_METHOD_TEXT = {
    [PAYMENT_METHOD.COD]: "Thanh toán khi nhận hàng",
    [PAYMENT_METHOD.VNPAY]: "Thanh toán qua VNPAY",
}

export const PAYMENT_METHOD_COLOR = {
    [PAYMENT_METHOD.COD]: "blue",
    [PAYMENT_METHOD.VNPAY]: "green",
}

export const PAYMENT_STATUS = {
    PENDING: "PENDING",
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
};

export const PAYMENT_STATUS_TEXT = {
    [PAYMENT_STATUS.PENDING]: "Chờ thanh toán",
    [PAYMENT_STATUS.SUCCESS]: "Thành công",
    [PAYMENT_STATUS.FAILED]: "Thất bại",
};

export const PAYMENT_STATUS_COLOR = {
    [PAYMENT_STATUS.PENDING]: "blue",
    [PAYMENT_STATUS.SUCCESS]: "green",
    [PAYMENT_STATUS.FAILED]: "red",
};