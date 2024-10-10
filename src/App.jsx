import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import { DarkModeProvider } from "./context/DarkModeContext";
import GlobalStyles from "@/styles/GlobalStyles";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import AppLayout from "@/components/layouts/AppLayout";
import ScrollToTop from "./components/ui/ScrollToTop";
import SuspenseWrapper from "./components/ui/SuspenseWrapper";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60,
      staleTime: 0,
    },
  },
});

import locale from "antd/locale/vi_VN";

function App() {
  return (
    <>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "Nunito",
              },
            }}
            locale={locale}
          >
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="/dashboard" />} />
                  <Route
                    path="dashboard"
                    element={<SuspenseWrapper path="Dashboard" />}
                  />
                  <Route
                    path="tai-khoan"
                    element={<SuspenseWrapper path="Account" />}
                  />
                  <Route
                    path="/nguoi-dung"
                    element={<SuspenseWrapper path="Users" />}
                  />
                  <Route
                    path="/nguoi-dung/tao-moi"
                    element={<SuspenseWrapper path="CreateEmployee" />}
                  />
                  <Route
                    path="san-pham"
                    element={
                      <SuspenseWrapper level1="products" path="Products" />
                    }
                  />
                  <Route
                    path="san-pham/tao-moi"
                    element={
                      <SuspenseWrapper level1="products" path="AddProduct" />
                    }
                  />
                  <Route
                    path="san-pham/:slug"
                    element={
                      <SuspenseWrapper level1="products" path="UpdateProduct" />
                    }
                  />
                  <Route
                    path="danh-muc"
                    element={<SuspenseWrapper path="Categories" />}
                  />
                  <Route
                    path="coupons"
                    element={<SuspenseWrapper path="Coupons" />}
                  />
                  <Route
                    path="don-hang"
                    element={<SuspenseWrapper path="Orders" />}
                  />
                  <Route
                    path="don-hang/:orderId"
                    element={<SuspenseWrapper path="OrderDetail" />}
                  />
                  <Route
                    path="danh-gia"
                    element={<SuspenseWrapper path="Reviews" />}
                  />
                  {/* Chính sách begin */}
                  {/* thanh toan begin */}
                  <Route
                    path="chinh-sach-thanh-toan"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="PaymentPolicies"
                      />
                    }
                  />
                  <Route
                    path="chinh-sach-thanh-toan/tao-moi"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="AddPaymentPolicy"
                      />
                    }
                  />
                  <Route
                    path="chinh-sach-thanh-toan/:policyId"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="UpdatePaymentPolicy"
                      />
                    }
                  />
                  {/* thanh toan end */}
                  {/* giao hang begin */}
                  <Route
                    path="chinh-sach-giao-hang"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="DeliveryPolicies"
                      />
                    }
                  />
                  <Route
                    path="chinh-sach-giao-hang/tao-moi"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="AddDeliveryPolicy"
                      />
                    }
                  />
                  <Route
                    path="chinh-sach-giao-hang/:policyId"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="UpdateDeliveryPolicy"
                      />
                    }
                  />
                  {/* giao hang end */}

                  {/* kiem hang begin */}
                  <Route
                    path="chinh-sach-kiem-hang"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="CheckProductPolicies"
                      />
                    }
                  />
                  <Route
                    path="chinh-sach-kiem-hang/tao-moi"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="AddCheckProductPolicy"
                      />
                    }
                  />
                  <Route
                    path="chinh-sach-kiem-hang/:policyId"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="UpdateCheckProductPolicy"
                      />
                    }
                  />
                  {/* kiem hang end */}

                  {/* doi tra begin */}
                  <Route
                    path="chinh-sach-doi-tra"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="ReturnPolicies"
                      />
                    }
                  />
                  <Route
                    path="chinh-sach-doi-tra/tao-moi"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="AddReturnPolicy"
                      />
                    }
                  />
                  <Route
                    path="chinh-sach-doi-tra/:policyId"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="UpdateReturnPolicy"
                      />
                    }
                  />
                  {/* doi tra end */}

                  {/* bao hanh begin */}
                  <Route
                    path="chinh-sach-bao-hanh"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="WarrantyPolicies"
                      />
                    }
                  />
                  <Route
                    path="chinh-sach-bao-hanh/tao-moi"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="AddWarrantyPolicy"
                      />
                    }
                  />
                  <Route
                    path="chinh-sach-bao-hanh/:policyId"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="UpdateWarrantyPolicy"
                      />
                    }
                  />
                  {/* bao hanh end */}

                  {/* bao mat begin */}
                  <Route
                    path="chinh-sach-bao-mat"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="SecurityPolicies"
                      />
                    }
                  />
                  <Route
                    path="chinh-sach-bao-mat/tao-moi"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="AddSecurityPolicy"
                      />
                    }
                  />
                  <Route
                    path="chinh-sach-bao-mat/:policyId"
                    element={
                      <SuspenseWrapper
                        level1="policies"
                        path="UpdateSecurityPolicy"
                      />
                    }
                  />

                  <Route
                    path="thong-tin-cua-hang"
                    element={<SuspenseWrapper level1="webConfigs" path="ShopInfo" />}
                  />

                  {/* bao mat end */}
                  {/* Chính sách end  */}
                </Route>
                <Route
                  path="dang-nhap"
                  element={<SuspenseWrapper path="Login" />}
                />
                <Route
                  path="*"
                  element={<SuspenseWrapper path="PageNotFound" />}
                />
              </Routes>
            </BrowserRouter>
            <Toaster
              position="top-right"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 5000,
                },
                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "var(--color-grey-0)",
                  color: "var(--color-grey-700)",
                },
              }}
            />
          </ConfigProvider>
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
