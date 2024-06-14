'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import React from 'react';

const LoaderProvider = ({ children }: {
    children: React.ReactNode;
}) => {
  return (
    <>
        {children}
        <ProgressBar
            height="5px"
            color="#78D0FC"
            options={{ showSpinner: false }}
            shallowRouting
        />
    </>
  );
};

export default LoaderProvider;