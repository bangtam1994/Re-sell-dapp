import React from "react";
import Head from "next/head";

type MetaHeaderProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export const MetaHeader = ({
  title = "Re Sell DAPP",
  description = "A app to resell event NFTs",
  children,
}: MetaHeaderProps) => {
  return (
    <Head>
      {title && (
        <>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
        </>
      )}
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      {children}
    </Head>
  );
};
