import Form from "../ui/Form";
import Heading from "../ui/Heading";
import FormRow from "../ui/FormRow";
import Button from "../ui/Button";
import Input from "../ui/Input";
import TickRoundIcon from "../icons/TickRoundIcon";
import EmptyRoundBoxIcon from "../icons/EmptyRoundBoxIcon";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1.5fr;

  padding: 1.2rem 1.2rem;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function UserItem({ user, onCloseModal }) {
  return (
    <Form>
      <div className="w-[45vw] flex flex-col gap-5 pt-5 justify-center">
        <div className="flex justify-center">
          <Heading as="h2">Chi tiết tài khoản người dùng</Heading>
        </div>
        <div className="my-5 pb-5">
          <div className="grid grid-cols-2 pb-5">
            <div>
              <div className="flex justify-center pb-[20px]">
                <img
                  className="w-[60px] h-[60px] lg:w-[160px] lg:h-[160px] object-cover"
                  src={user.avatar ? user.avatar.path : "/default-user.jpg"}
                />
              </div>

              <StyledFormRow>
                <label>Chức vụ</label>
                <Input
                  value={
                    user.roleId === 1
                      ? "Admin"
                      : user.roleId === 3
                      ? "Khách hàng"
                      : "Nhân viên"
                  }
                  disabled
                />
              </StyledFormRow>

              <StyledFormRow>
                <label>Giới tính</label>
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-5 cursor-pointer">
                    <div className="max-w-6">
                      <TickRoundIcon />
                    </div>
                    <span>{user.gender ? "Nam" : "Nữ"}</span>
                  </div>
                </div>
              </StyledFormRow>

              <StyledFormRow>
                <label>Ngày sinh</label>
                <Input
                  type="date"
                  value={user.birthday ? user.birthday.slice(0, 10) : null}
                  disabled
                />
              </StyledFormRow>
            </div>
            <div>
              <StyledFormRow>
                <label>Mã người dùng</label>
                <Input className="w-full" value={user.id} disabled />
              </StyledFormRow>
              <StyledFormRow>
                <label>Email</label>
                <Input className="w-full" value={user.email} disabled />
              </StyledFormRow>
              <StyledFormRow>
                <label>Họ tên</label>
                <Input className="w-full" value={user.fullName} disabled />
              </StyledFormRow>

              <StyledFormRow>
                <label>Số điện thoại</label>
                <Input type="text" value={user.phone} disabled />
              </StyledFormRow>

              <StyledFormRow>
                <label>Trạng thái</label>
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-5 cursor-pointer">
                    <div className="max-w-6">
                      <TickRoundIcon />
                    </div>
                    <span>{user.active ? "Đang kích hoạt" : "Đã khóa"}</span>
                  </div>
                </div>
              </StyledFormRow>

              <StyledFormRow>
                <label>Ngày tạo tài khoản</label>
                <Input
                  type="date"
                  value={user.createdAt.slice(0, 10)}
                  disabled
                />
              </StyledFormRow>
            </div>
          </div>
        </div>
      </div>
      <FormRow>
        <Button type="reset" onClick={() => onCloseModal?.()}>
          Đóng
        </Button>
      </FormRow>
    </Form>
  );
}

export default UserItem;
