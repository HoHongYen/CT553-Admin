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

function App() {
  return (
    <>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "Nunito",
              },
            }}
          >
            <GlobalStyles />
            <ReactQueryDevtools initialIsOpen={false} />
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
