import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/profile/useUser";

import { HiMagnifyingGlass, HiOutlineUser } from "react-icons/hi2";

import UserAvatar from "@/components/profile/UserAvatar";
import ButtonIcon from "@/components/ui/ButtonIcon";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import Logout from "@/components/auth/Logout";

const StyledHeader = styled.header`
  background-color: var(--color-grey-100);
  padding: 0.1rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  max-height: 8rem;
`;

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  return (
    <StyledHeader>
      <form className="flex flex-1 p-5 pl-0">
        <input
          type="text"
          className="rounded-xl px-4 border py-2 outline-none"
          placeholder="Tìm kiếm..."
        />
        <ButtonIcon>
          <HiMagnifyingGlass />
        </ButtonIcon>
      </form>
      <div className="flex justify-between gap-3">
        {isAuthenticated && <UserAvatar />}
        <StyledHeaderMenu>
          {isAuthenticated && (
            <ButtonIcon onClick={() => navigate("/tai-khoan")}>
              <HiOutlineUser />
            </ButtonIcon>
          )}
          <DarkModeToggle />
          {isAuthenticated && <Logout />}
        </StyledHeaderMenu>
      </div>
    </StyledHeader>
  );
}

export default Header;
