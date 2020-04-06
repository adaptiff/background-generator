import { Button, Icon, Layout, Row, Col, Popover } from "antd";
const { Header, Content, Footer } = Layout;
import { withRedux } from "../lib/withRedux";
import Dimensions from "../components/Dimensions";
import Canvas from "../components/Canvas";
import ColorSidebar from "../components/ColorSidebar";
import DownloadButton from "../components/DownloadButton";
import ConfigPanel from "../components/ConfigPanel";
import Head from "./_head";
import LICounter from "./_licounter";

import "antd/dist/antd.css";
import s from "./index.less";

const IndexPage = () => {
  return (
    <>
      <Head />
      <Layout>
        <Layout>
          <ConfigPanel />
          <Layout className={s["right-side"]}>
            <Header className={s["header"]}>
              <Row className={s["header-row"]}>
                <Col span={8} className={s["explore-area"]}>
                  <Button icon="appstore" href="/explore">
                    Explore
                  </Button>
                </Col>
                <Col span={8} className={s["dimensions-area"]}>
                  <Dimensions />
                </Col>
                <Col span={8} className={s["download-area"]}>
                  <DownloadButton />
                </Col>
              </Row>
            </Header>
            <Content className={s["content"]}>
              <Canvas />
              <ColorSidebar className={s["color-side-bar"]} />
              <div className={s["scroll-cta"]}>
                <div>Scroll to see more</div>
                <Icon type="down" className={s["scroll-icon"]} />
              </div>
            </Content>
            <Footer className={s["footer"]}>
              <Col span={12} className={s["license-area"]}>
                <Popover
                  content={
                    <div className={s["license"]}>
                      All images generated on this site can be used for free.
                      <br />
                      You can use them for commercial and noncommercial
                      purposes.
                    </div>
                  }
                  trigger="click"
                >
                  <Button type="link" className={s["link"]}>
                    License
                  </Button>
                </Popover>
              </Col>
              <Col span={12} className={s["contact-area"]}>
                <Button
                  type="link"
                  className={s["link"]}
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSddoo8_28sRF5Pt7AZae5wtTXPH18dNYFoD8kujnf7omcKaDQ/viewform"
                >
                  Contact
                </Button>
              </Col>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
      <div className={s["extra-layout"]}></div>
      <LICounter />
    </>
  );
};

export default withRedux(IndexPage);
