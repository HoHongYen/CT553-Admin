import styled from "styled-components";

import { HiEye, HiLockClosed, HiPencil } from "react-icons/hi2";
import { formatDate } from "@/utils/helpers";
import { useActiveUser } from "@/hooks/users/useActiveUser";

import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import Tag from "../ui/Tag";
import UserItem from "./UserItem";
import CreateUserForm from "./CreateUserForm";

const Avatar = styled.img`
  display: block;
  width: 5rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserRow({ user }) {
  const { isLoading, toggleActiveUser } = useActiveUser();

  const {
    id: userId,
    fullName,
    email,
    phone,
    gender,
    birthday,
    avatar,
    roleId,
    createdAt,
    active,
  } = user;

  return (
    <>
      <Table.Row>
        <Avatar src={avatar?.path || "/default-user.jpg"} alt="" />
        <div>#{userId}</div>
        <div>{fullName}</div>
        <div>{email}</div>
        <div>{phone}</div>
        <Tag type={gender ? "blue" : "red"}>{gender ? "Nam" : "Nữ"}</Tag>
        <Tag type={roleId === 1 ? "red" : roleId === 3 ? "blue" : "yellow"}>
          {roleId === 1 ? "Admin" : roleId === 3 ? "Khách hàng" : "Nhân viên"}
        </Tag>
        <Tag type={active ? "green" : "red"}>
          {active ? "Đang kích hoạt" : "Đã khóa"}
        </Tag>
        <div>{formatDate(createdAt)}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={userId} />
              <Menus.List id={userId}>
                <Modal.Open opens="seeDetail">
                  <Menus.Button icon={<HiEye />}>Xem chi tiết</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Chỉnh sửa</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="lock">
                  <Menus.Button icon={<HiLockClosed />}>
                    {active ? "Khóa tài khoản" : "Kích hoạt lại"}
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="seeDetail">
              <UserItem user={user} />
            </Modal.Window>

            <Modal.Window name="edit">
              <CreateUserForm userToEdit={user} />
            </Modal.Window>

            <Modal.Window name="lock">
              <ConfirmCertain
                resourceName={`Bạn có chắc chắn muốn ${
                  active ? "khóa" : "kích hoạt"
                } tài khoản này?`}
                disabled={isLoading}
                onConfirm={() => toggleActiveUser(user.id)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default UserRow;
