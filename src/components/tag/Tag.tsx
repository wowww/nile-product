/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React from 'react';
import cn from 'classnames';

interface tagPropsType {
  size?: any;
  type?: any;
  bg?: boolean;
  disabled?: boolean;
  color?: any;
  children: React.ReactNode
}

const Tag: React.FC<tagPropsType> = ({ size, bg, children, type, disabled, color }) => {
  return <span className={cn(`tag tag-${size} tag-${type} tag-${color}`, bg && 'tag-bg', disabled && 'disabled')}>{children}</span>;
};
export default Tag;

Tag.defaultProps = {
  size: 'md',
  bg: false,
  type: 'tag',
  color: 'black',
  disabled: false,
};
