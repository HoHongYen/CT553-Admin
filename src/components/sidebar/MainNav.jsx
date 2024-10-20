/* eslint-disable */
import { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import {
  HiOutlineNewspaper,
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineChartPie,
  HiOutlinePhoto,
  HiOutlineStar,
  HiMiniChevronRight,
  HiMiniChevronDown,
  HiOutlineTruck,
  HiOutlineClipboardDocumentList,
  HiOutlineEye,
  HiMiniArrowPathRoundedSquare,
  HiOutlineWrench,
  HiOutlineLockClosed,
  HiMiniCog,
  HiOutlineDocumentText,
  HiOutlineTicket,
  HiOutlineSquaresPlus,
} from "react-icons/hi2";
import { HiOutlineCash } from "react-icons/hi";

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

    font-size: 1.7rem;
    font-weight: 600;
    padding: 1.4rem 2.4rem;
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

const ProductNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-left: 0.8rem;

    font-size: 1.7rem;
    font-weight: 600;
    padding: 1.4rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover {
    color: var(--color-brand-600);
    background-color: var(--color-brand-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    transition: all 0.3s;
  }
`;

function MainNav() {
  const [showChildMenu, setShowChildMenu] = useState(false);
  const [showPolicyChildMenu, setShowPolicyChildMenu] = useState(false);
  const [showInterfaceChildMenu, setShowInterfaceChildMenu] = useState(false);

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineChartPie />
            <span>Thống kê</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/nguoi-dung">
            <HiOutlineUser />
            <span>Người dùng</span>
          </StyledNavLink>
        </li>
        <li>
          <ProductNavLink onClick={() => setShowChildMenu((show) => !show)}>
            <HiOutlinePhoto />
            <div className="flex">
              <span>Sản phẩm</span>
              {showChildMenu ? <HiMiniChevronDown /> : <HiMiniChevronRight />}
            </div>
          </ProductNavLink>
          {showChildMenu && (
            <div className="ml-10">
              <StyledNavLink to="/san-pham">
                <HiOutlinePhoto />
                <span>Sản phẩm</span>
              </StyledNavLink>
              <StyledNavLink to="/danh-muc">
                <HiOutlineNewspaper />
                <span>Danh mục</span>
              </StyledNavLink>
              <StyledNavLink to="/coupons">
                <HiOutlineTicket />
                <span>Coupons</span>
              </StyledNavLink>
            </div>
          )}
        </li>
        <li>
          <StyledNavLink to="/don-hang">
            <HiOutlineShoppingBag />
            <span>Đơn hàng</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/danh-gia">
            <HiOutlineStar />
            <span>Đánh giá</span>
          </StyledNavLink>
        </li>
        <li>
          <ProductNavLink
            onClick={() => setShowPolicyChildMenu((show) => !show)}
          >
            <HiOutlineClipboardDocumentList />
            <div className="flex">
              <span>Chính sách</span>
              {showPolicyChildMenu ? (
                <HiMiniChevronDown />
              ) : (
                <HiMiniChevronRight />
              )}
            </div>
          </ProductNavLink>
          {showPolicyChildMenu && (
            <div className="ml-10">
              <StyledNavLink to="/chinh-sach-thanh-toan">
                <HiOutlineCash />
                <span>Thanh toán</span>
              </StyledNavLink>
              <StyledNavLink to="/chinh-sach-giao-hang">
                <HiOutlineTruck />
                <span>Giao hàng</span>
              </StyledNavLink>
              <StyledNavLink to="/chinh-sach-kiem-hang">
                <HiOutlineEye />
                <span>Kiểm hàng</span>
              </StyledNavLink>
              <StyledNavLink to="/chinh-sach-doi-tra">
                <HiMiniArrowPathRoundedSquare />
                <span>Đổi trả</span>
              </StyledNavLink>
              <StyledNavLink to="/chinh-sach-bao-hanh">
                <HiOutlineWrench />
                <span>Bảo hành</span>
              </StyledNavLink>
              <StyledNavLink to="/chinh-sach-bao-mat">
                <HiOutlineLockClosed />
                <span>Bảo mật</span>
              </StyledNavLink>
            </div>
          )}
          <li>
            <ProductNavLink
              onClick={() => setShowInterfaceChildMenu((show) => !show)}
            >
              <HiMiniCog />
              <div className="flex">
                <span>Giao diện</span>
                {showInterfaceChildMenu ? (
                  <HiMiniChevronDown />
                ) : (
                  <HiMiniChevronRight />
                )}
              </div>
            </ProductNavLink>
            {showInterfaceChildMenu && (
              <div className="ml-10">
                <StyledNavLink to="/thong-tin-cua-hang">
                  <HiOutlineDocumentText />
                  <span>Thông tin</span>
                </StyledNavLink>
                <StyledNavLink to="/banner">
                  <HiOutlineSquaresPlus />
                  <span>Banner</span>
                </StyledNavLink>
              </div>
            )}
          </li>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
