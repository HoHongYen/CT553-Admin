import { useUser } from "@/hooks/profile/useUser";

import UpdatePasswordForm from "@/components/profile/UpdatePasswordForm";
import UpdateUserDataForm from "@/components/profile/UpdateUserDataForm";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import Spinner from "@/components/ui/Spinner";

function Account() {
  const { isLoading, user } = useUser();
  
  if (isLoading) return <Spinner active />;

  return (
    <>
      <Heading as="h1">Cập nhật thông tin tài khoản</Heading>
      <Row>
        <Heading as="h3">Thông tin cá nhân</Heading>
        <UpdateUserDataForm />
      </Row>

      {!user.isGoogleLogin && (
        <Row>
          <Heading as="h3">Mật khẩu</Heading>
          <UpdatePasswordForm />
        </Row>
      )}
    </>
  );
}

export default Account;
