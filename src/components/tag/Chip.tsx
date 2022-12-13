/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import cn from 'classnames';

interface tagPropsType {
  size?: string;
  bg?: boolean;
  primary?: boolean;
  disabled?: boolean;
  children?: ReactNode
}

const Tag: React.FC<tagPropsType> = ({ size, bg, children, primary, disabled }) => {
  return <span className={cn(`chip chip-${size}`, bg && 'chip-bg', primary && 'chip-primary', disabled && 'disabled')}>{children}</span>;
};
export default Tag;

Tag.defaultProps = {
  size: 'md',
  bg: false,
  primary: false,
  disabled: false,
};
