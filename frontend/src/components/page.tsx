import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';

const Page = forwardRef((propx: any, ref) => {
  const { title, children, ...rest } = propx;

  return (
    <div ref={ref} {...rest}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

export default Page;
