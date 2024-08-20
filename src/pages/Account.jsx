import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import { useUser } from "../features/authentication/useUser";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  const { user } = useUser();

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
