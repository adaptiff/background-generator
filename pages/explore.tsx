import React from "react";
import Head from "./_head";
import { Layout, Button, Card, Col, Row } from "antd";
import Logo from "../components/Logo";
const { Header, Sider } = Layout;

import s from "./explore.less";

export interface Props {}

export const Explore: React.FC<Props> = props => {
  return (
    <>
      <Head />
      <div className={s["top-header"]}>
        <Sider className={s["sider"]} width={330}>
          <Logo />
        </Sider>
        <div className={s["right-side"]}>
          <Header className={s["header"]}>
            <Button icon="plus" href="/">
              Create
            </Button>
          </Header>
        </div>
      </div>
      <div className={s["grid"]}>
        <Card
          hoverable
          cover={<img src="https://adaptiff.com/thumbs/117.png" />}
          className={s["card"]}
        />
        <Card
          cover={<img src="https://adaptiff.com/thumbs/118.png" />}
          className={s["card"]}
        />
        <Card
          cover={<img src="https://adaptiff.com/thumbs/119.png" />}
          className={s["card"]}
        />
        <Card
          cover={<img src="https://adaptiff.com/thumbs/120.png" />}
          className={s["card"]}
        />
        <Card
          cover={<img src="https://adaptiff.com/thumbs/121.png" />}
          className={s["card"]}
        />
        <Card
          cover={<img src="https://adaptiff.com/thumbs/122.png" />}
          className={s["card"]}
        />
        <Card
          cover={<img src="https://adaptiff.com/thumbs/117.png" />}
          className={s["card"]}
        />
        <Card
          cover={<img src="https://adaptiff.com/thumbs/118.png" />}
          className={s["card"]}
        />
        <Card
          cover={<img src="https://adaptiff.com/thumbs/119.png" />}
          className={s["card"]}
        />
        <Card
          cover={<img src="https://adaptiff.com/thumbs/120.png" />}
          className={s["card"]}
        />
        <Card
          cover={<img src="https://adaptiff.com/thumbs/121.png" />}
          className={s["card"]}
        />
        <Card
          cover={<img src="https://adaptiff.com/thumbs/122.png" />}
          className={s["card"]}
        />
      </div>
    </>
  );
};
Explore.displayName = "Explore";

export default Explore;
