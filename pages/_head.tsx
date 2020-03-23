import React from "react";
import Head from "next/head";

export interface Props {}

export const HeadComp: React.FC<Props> = props => {
  return (
    <Head>
      <title>background generator com</title>
      <link rel="icon" type="image/png" href="/favicon.png"></link>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Poppins:600:latin,cyrillic"
        media="all"
      ></link>
    </Head>
  );
};
HeadComp.displayName = "HeadComp";

export default HeadComp;
