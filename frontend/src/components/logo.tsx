import React from 'react';

function Logo(propx: any) {
  return <img alt="Logo"  src={`${process.env.PUBLIC_URL}/static/logo.png`}  {...propx} />;
}
export default Logo;