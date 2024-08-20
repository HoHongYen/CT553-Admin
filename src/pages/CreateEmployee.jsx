import RegisterForm from "../features/authentication/RegisterForm";
import Heading from "../ui/Heading";

function CreateEmployee() {
  return (
    <>
      <Heading as="h1">Tạo tài khoản nhân viên</Heading>
      <RegisterForm />
    </>
  );
}

export default CreateEmployee;
