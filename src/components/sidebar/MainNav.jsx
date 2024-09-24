/* eslint-disable */
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import {
  HiOutlineGift,
  HiOutlineNewspaper,
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineChartPie,
  HiOutlineChartBar,
  HiOutlinePhoto,
} from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-left: 0.8rem;

    font-size: 1.8rem;
    font-weight: 600;
    padding: 1.5rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-600);
    background-color: var(--color-brand-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-brand-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/">
            <HiOutlineChartPie />
            {/* <HiOutlineChartBar /> */}
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/nguoi-dung">
            <HiOutlineUser />
            <span>Người dùng</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/danh-muc">
            <HiOutlineNewspaper />
            <span>Danh mục</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/san-pham">
            <HiOutlinePhoto />
            <span>Sản phẩm</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/coupons">
            <HiOutlineGift />
            <span>Coupons</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/don-hang">
            <HiOutlineShoppingBag />
            <span>Đơn hàng</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
