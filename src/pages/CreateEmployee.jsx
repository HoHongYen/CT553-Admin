import RegisterForm from "@/components/auth/RegisterForm";
import Heading from "@/components/ui/Heading";

function CreateEmployee() {
  return (
    <>
      <Heading as="h1">Tạo tài khoản nhân viên</Heading>
      <RegisterForm />
    </>
  );
}

export default CreateEmployee;
