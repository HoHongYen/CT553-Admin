import { formatCurrency, formatDateTime } from "@/utils/helpers";
import { PAYMENT_STATUS_TEXT } from "@/utils/constants";
import {
  Page,
  Document,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Fragment } from "react";

import Roboto from "@/styles/fonts/Roboto-Regular.ttf";
import RobotoBold from "@/styles/fonts/Roboto-Bold.ttf";
import RobotoItalic from "@/styles/fonts/Roboto-Italic.ttf";

function Invoice({ order }) {
  Font.register({
    family: "Roboto",
    fonts: [
      { src: Roboto, fontWeight: "normal" },
      { src: RobotoBold, fontWeight: "bold" },
      { src: RobotoItalic, fontWeight: "normal", fontStyle: "italic" },
    ],
  });

  if (!order) return null;

  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: "column",
      fontFamily: "Roboto",
    },

    spaceBetween: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#3E3E3E",
    },

    floatRight: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      color: "#3E3E3E",
    },

    titleContainer: { flexDirection: "row", marginTop: 24 },
    logo: { width: 90 },
    reportTitle: { fontWeight: "bold", fontSize: 16, textAlign: "center" },

    addressTitle: { fontWeight: "bold", fontSize: 11 },
    invoice: { fontWeight: "bold", fontSize: 20 },
    invoiceNumber: { fontWeight: "normal", fontSize: 11 },
    address: { fontWeight: "normal", fontSize: 10 },

    theader: {
      marginTop: 20,
      fontSize: 10,
      fontWeight: "bold",
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      height: 20,
      backgroundColor: "#DEDEDE",
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    tbodyOtherPrice: {
      fontWeight: "normal",
      fontSize: 10,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    tbodyFinal: {
      fontWeight: "bold",
      fontSize: 12,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    total: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1.5,
      borderColor: "whitesmoke",
      borderBottomWidth: 1,
    },

    tbody2: { flex: 2, borderRightWidth: 1 },
  });

  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Image style={styles.logo} src="/logo.png" />
        <Text style={styles.reportTitle}>Shop tranh trang trí Decorpic</Text>
      </View>
    </View>
  );

  const Address = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text style={styles.invoice}>Hóa đơn </Text>
          <Text style={styles.invoiceNumber}>Mã hóa đơn: #{order.id} </Text>
        </View>
        <View style={styles.floatRight}>
          <Text style={styles.addressTitle}>Địa chỉ shop:</Text>
          <Text style={styles.address}>Đường 3/2, Xuân Khánh</Text>
          <Text style={styles.address}>Ninh Kiều, Cần Thơ</Text>
        </View>
      </View>
    </View>
  );

  const {
    contactName,
    contactPhone,
    detailAddress,
    wardName,
    districtName,
    provinceName,
  } = order.deliveryAddress;

  const BuyerInfo = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.addressTitle}>Khách hàng</Text>
          <Text style={styles.address}>{order.buyer.fullName}</Text>
        </View>
        <View style={styles.floatRight}>
          <Text style={styles.addressTitle}>Ngày đặt hàng</Text>
          <Text style={styles.address}>{formatDateTime(order.createdAt)}</Text>
        </View>
      </View>
    </View>
  );

  const UserAddress = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.addressTitle}>Địa chỉ giao hàng</Text>
          <Text
            style={styles.address}
          >{`${contactName}, ${contactPhone}, ${detailAddress}, ${wardName}, ${districtName}, ${provinceName}`}</Text>
        </View>
        <View style={styles.floatRight}>
          <Text style={styles.addressTitle}>Ngày lập hóa đơn</Text>
          <Text style={styles.address}>
            {formatDateTime(new Date().toISOString())}
          </Text>
        </View>
      </View>
    </View>
  );

  const Payment = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.addressTitle}>Phương thức thanh toán</Text>
          <Text style={styles.address}>
            {order.payment.paymentMethod.name === "COD"
              ? "Thanh toán khi nhận hàng"
              : "Thanh toán qua VNPAY"}
          </Text>
        </View>
        <View style={styles.floatRight}>
          <Text style={styles.addressTitle}>Trạng thái thanh toán</Text>
          <Text style={styles.address}>
            {PAYMENT_STATUS_TEXT[order.payment.paymentStatus.name]}
          </Text>
        </View>
      </View>
    </View>
  );

  const TableHead = () => (
    <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Sản phẩm</Text>
      </View>
      <View style={styles.theader}>
        <Text>Giá gốc</Text>
      </View>
      <View style={styles.theader}>
        <Text>Giảm giá</Text>
      </View>
      <View style={styles.theader}>
        <Text>Đơn giá</Text>
      </View>
      <View style={styles.theader}>
        <Text>Số lượng</Text>
      </View>
      <View style={styles.theader}>
        <Text>Thành tiền</Text>
      </View>
    </View>
  );

  const TableBody = () =>
    order.orderDetail.map((orderDetail, index) => (
      <Fragment key={index}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>
              {orderDetail.variant.product.name} ({orderDetail.variant.size})
            </Text>
          </View>
          <View style={styles.tbody}>
            <Text>{formatCurrency(orderDetail.variant.price)} </Text>
          </View>
          <View style={styles.tbody}>
            <Text>{formatCurrency(orderDetail.discount)} </Text>
          </View>
          <View style={styles.tbody}>
            <Text>{formatCurrency(orderDetail.price)} </Text>
          </View>
          <View style={styles.tbody}>
            <Text>{orderDetail.quantity}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>
              {formatCurrency(
                (orderDetail.price - orderDetail.discount) *
                  orderDetail.quantity
              )}
            </Text>
          </View>
        </View>
      </Fragment>
    ));

  const TableAppliedCoupon = () => (
    <View style={{ width: "100%", flexDirection: "row" }}>
      <View style={styles.tbody}>
        <Text></Text>
      </View>
      <View style={styles.tbody}>
        <Text></Text>
      </View>
      <View style={styles.tbodyOtherPrice}>
        <Text>Áp dụng coupon:</Text>
      </View>
      <View style={styles.tbodyOtherPrice}>
        <Text>-{formatCurrency(order.totalDiscount)}</Text>
      </View>
    </View>
  );

  const TableShippingFee = () => (
    <View style={{ width: "100%", flexDirection: "row" }}>
      <View style={styles.tbody}>
        <Text></Text>
      </View>
      <View style={styles.tbody}>
        <Text></Text>
      </View>
      <View style={styles.tbodyOtherPrice}>
        <Text>Phí vận chuyển:</Text>
      </View>
      <View style={styles.tbodyOtherPrice}>
        <Text>{formatCurrency(order.shippingFee)}</Text>
      </View>
    </View>
  );

  const TableTotal = () => (
    <View style={{ width: "100%", flexDirection: "row" }}>
      <View style={styles.tbody}>
        <Text></Text>
      </View>
      <View style={styles.tbody}>
        <Text></Text>
      </View>
      <View style={styles.tbodyFinal}>
        <Text>Tổng cộng:</Text>
      </View>
      <View style={styles.tbodyFinal}>
        <Text>{formatCurrency(order.finalPrice)}</Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <Address />
        <BuyerInfo />
        <UserAddress />
        <Payment />
        <TableHead />
        <TableBody />
        {order.totalDiscount > 0 && <TableAppliedCoupon />}
        <TableShippingFee />
        <TableTotal />
      </Page>
    </Document>
  );
}

export default Invoice;
