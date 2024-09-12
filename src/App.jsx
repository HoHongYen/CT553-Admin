import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import { DarkModeProvider } from "./context/DarkModeContext";
import GlobalStyles from "@/styles/GlobalStyles";

import ProtectedRoute from "@/components/ui/ProtectedRoute";
import AppLayout from "@/components/layouts/AppLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Users from "./pages/Users";
import CreateEmployee from "./pages/CreateEmployee";
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";
import UpdateProduct from "./pages/products/UpdateProduct";
import Categories from "./pages/Categories";
import PageNotFound from "./pages/PageNotFound";
import ScrollToTop from "./components/ui/ScrollToTop";

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
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="tai-khoan" element={<Account />} />
                <Route path="/nguoi-dung" element={<Users />} />
                <Route
                  path="/nguoi-dung/tao-moi"
                  element={<CreateEmployee />}
                />
                <Route path="san-pham" element={<Products />} />
                <Route path="san-pham/tao-moi" element={<AddProduct />} />
                <Route path="san-pham/:slug" element={<UpdateProduct />} />
                <Route path="danh-muc" element={<Categories />} />
              </Route>
              <Route path="dang-nhap" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
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
          c
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
