import styled from "styled-components";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiLockClosed, HiPencil } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmCertain from "../../ui/ConfirmCertain";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

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
  const { isDeleting, deleteCabin } = useDeleteCabin();

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
  } = user;

  return (
    <>
      <Table.Row>
        <Avatar src={avatar?.path || "default-user.jpg"} alt="" />
        <div>{userId}</div>
        <div>{fullName}</div>
        <div>{email}</div>
        <div>{phone}</div>
        <div>{gender ? "Nam" : "Nữ"}</div>
        <div>
          {roleId === 1 ? "Admin" : roleId === 3 ? "Khách hàng" : "Nhân viên"}
        </div>
        <div>{createdAt}</div>
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
                disabled={isDeleting}
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
