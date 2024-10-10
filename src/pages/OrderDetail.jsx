import { useOrder } from "@/hooks/orders/useOrder";
import { useMoveBack } from "@/hooks/common/useMoveBack";
import { Skeleton } from "antd";
import { BlobProvider, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { HiOutlineDownload } from "react-icons/hi";
import { HiEye, HiOutlinePrinter } from "react-icons/hi2";
import Row from "@/components/ui/Row";
import Heading from "@/components/ui/Heading";
import ButtonText from "@/components/ui/ButtonText";
import OrderHeader from "@/components/orders/OrderHeader";
import OrderDetailItem from "@/components/orders/OrderDetailItem";
import OrderFooter from "@/components/orders/OrderFooter";
import OrderTracking from "@/components/orders/OrderTracking";
import Button from "@/components/ui/Button";
import Invoice from "@/components/orders/Invoice";
import Modal from "@/components/ui/Modal";
import { useShopInfo } from "@/hooks/shopInfo/useShopInfo";

function OrderDetail() {
  const moveBack = useMoveBack();
  const { isLoading, order } = useOrder();
  const {shopInfo} = useShopInfo();

  if (isLoading) return <Skeleton active />;

  return (
    <>
      <Row>
        <Heading as="h1">Chi tiết đơn hàng #{order.id}</Heading>
        <div className="flex justify-end">
          <ButtonText onClick={moveBack}>&larr; Quay lại</ButtonText>
        </div>
        <div className="relative flex flex-col gap-4 bg-[var(--color-grey-0)] px-6 py-6 rounded-md shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
          <OrderHeader order={order} />
          <div>
            {order?.orderDetail?.map((orderDetail, index) => (
              <OrderDetailItem
                key={index}
                orderDetail={orderDetail}
                currentStatus={order.currentStatus}
              />
            ))}
          </div>
          <OrderFooter order={order} />
          {/* tracking order */}
          <div className="mt-4">
            <OrderTracking order={order} />
          </div>
          <div className="mt-5 flex gap-7 justify-end">
            <Modal>
              <Modal.Open opens="viewInvoice">
                <Button
                  className="flex items-center gap-2"
                  variation="secondary"
                >
                  <HiEye />
                  Xem hóa đơn
                </Button>
              </Modal.Open>
              <Modal.Window name="viewInvoice">
                <PDFViewer width="1000" height="600">
                  <Invoice order={order} logo={shopInfo.logo} />
                </PDFViewer>
              </Modal.Window>
            </Modal>

            <PDFDownloadLink
              document={<Invoice order={order} logo={shopInfo.logo} />}
              fileName="invoice.pdf"
            >
              <Button
                className="flex items-center gap-2"
                variation="success"
                onClick={moveBack}
              >
                <HiOutlineDownload size={14} />
                Tải hóa đơn
              </Button>
            </PDFDownloadLink>

            <BlobProvider document={<Invoice order={order} logo={shopInfo.logo} />}>
              {({ url, blob }) => (
                <a href={url} target="_blank">
                  <Button
                    className="flex items-center gap-2"
                    onClick={moveBack}
                  >
                    <HiOutlinePrinter /> In hóa đơn
                  </Button>
                </a>
              )}
            </BlobProvider>
          </div>
        </div>
      </Row>
    </>
  );
}

export default OrderDetail;
