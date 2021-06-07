import React from 'react';
import * as svg from './svg';

export type IconType = keyof typeof svg;
export type IconProps = {
  name: IconType;
};

export default function Icon({ name }: IconProps) {
  return React.createElement(svg[name]);
}
