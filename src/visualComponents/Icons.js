import React from 'react'
import { SvgIcon } from "@material-ui/core";

import Icons from "./Icons.svg"; // Path to your icons.svg
import PropTypes from 'prop-types';

const Icon = ({ name, color, size }) => (
  <svg className={`icon icon-${name}`} fill={color} width={size} height={size}>
    <use xlinkHref={`${Icons}#icon-${name}`} />
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number
};

// const CartIcon = () => {
//     return (
//         <SvgIcon fontSize="inherit">
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//                 <use xlink:href="#edit"></use>
//             </svg>
//         </SvgIcon>
//     )
// }

export {Icon}