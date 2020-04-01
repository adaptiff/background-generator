import React from "react";
import Head from "next/head";

export interface Props {}

export const HeadComp: React.FC<Props> = props => {
  return (
    <Head>
      <title>background generator</title>
      <link rel="icon" type="image/png" href="/favicon.png"></link>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Poppins:wght@600&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};
HeadComp.displayName = "HeadComp";

export default HeadComp;
