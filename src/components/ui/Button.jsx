/* eslint-disable */
import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.8rem 1.2rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.1rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.1rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    border: 1px solid var(--color-grey-300);
    color: var(--color-grey-600);
    background-color: var(--color-grey-0);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,

  success: css`
    color: var(--color-green-100);
    background-color: var(--color-green-700);

    &:hover {
      background-color: var(--color-green-800);
    }
  `,

  // background-color: var(--color-indigo-100);

  normal: css`
    color: var(--color-grey-600);
    background-color: var(--color-yellow-700);

    &:hover {
      background-color: var(--color-yellow-700);
    }
  `,
};

const radius = {
  "radius-none": css`
    border-radius: none;
  `,

  "radius-sm": css`
    border-radius: var(--border-radius-sm);
  `,
};

const Button = styled.button`
  /* border: none; */
  box-shadow: var(--shadow-sm);
  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
  ${(props) => radius[props.radius]}
`;

Button.defaultProps = {
  size: "medium",
  variation: "primary",
  radius: "radius-sm",
};

export default Button;
