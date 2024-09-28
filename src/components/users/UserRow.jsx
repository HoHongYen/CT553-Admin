import styled from "styled-components";

import { HiLockClosed, HiPencil } from "react-icons/hi2";

import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import { formatDate } from "@/utils/helpers";
import Tag from "../ui/Tag";

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
          {active ? "Hiển thị" : "Đã ẩn"}
        </Tag>
        <div>{formatDate(createdAt)}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={userId} />
              <Menus.List id={userId}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Xem chi tiết</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiLockClosed />}>
                    Khóa tài khoản
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              {/* <CreateCabinForm cabinToEdit={user} /> */}
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmCertain
                resourceName="users"
                // disabled={isDeleting}
                // onConfirm={() => deleteCabin(userId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default UserRow;
