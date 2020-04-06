import React from "react";
import Head from "./_head";
import { Layout, Button, Card, Col, Row } from "antd";
import Logo from "../components/Logo";
const { Header, Sider } = Layout;
import backgrounds from "../backgrounds";
import LICounter from "./_licounter";

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
          <div className={s["grid"]}>
            {backgrounds.map(background => (
              <Card
                hoverable
                cover={<img src={background.preview} />}
                className={s["card"]}
                onClick={() => {
                  location.href = `/background/${background.id}`;
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <LICounter />
    </>
  );
};
Explore.displayName = "Explore";

export default Explore;
