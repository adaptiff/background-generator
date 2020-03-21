import Head from "next/head";
import { Button, Icon, Layout, Row, Col } from "antd";
const { Header, Content } = Layout;
import { withRedux } from "../lib/withRedux";
import Dimensions from "../components/Dimensions";
import Canvas from "../components/Canvas";
import ColorSidebar from "../components/ColorSidebar";
import DownloadButton from "../components/DownloadButton";
import ConfigPanel from "../components/ConfigPanel";

import "antd/dist/antd.css";
import s from "./index.less";

const LICounter = () => (
  <div
    className={s["stat-counter"]}
    dangerouslySetInnerHTML={{
      __html: `<!--LiveInternet counter--><script type="text/javascript">
document.write('<a href="//www.liveinternet.ru/click" '+
'target="_blank"><img src="//counter.yadro.ru/hit?t26.6;r'+
escape(document.referrer)+((typeof(screen)=='undefined')?'':
';s'+screen.width+'*'+screen.height+'*'+(screen.colorDepth?
screen.colorDepth:screen.pixelDepth))+';u'+escape(document.URL)+
';h'+escape(document.title.substring(0,150))+';'+Math.random()+
'" alt="" title="LiveInternet: показано число посетителей за'+
' сегодня" '+
'border="0" width="88" height="15"><\/a>')
</script><!--/LiveInternet-->
`
    }}
  />
);

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>background generator com</title>
        <link rel="icon" type="image/png" href="/favicon.png"></link>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins:600:latin,cyrillic"
          media="all"
        ></link>
      </Head>
      <Layout>
        <Layout>
          <ConfigPanel />
          <Layout className={s["right-side"]}>
            <Header className={s["header"]}>
              <Row className={s["header-row"]}>
                <Col span={8} className={s["explore-area"]}>
                  <Button icon="appstore">Explore</Button>
                  <Button type="link" className={s["license-link"]}>
                    License
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
          </Layout>
        </Layout>
      </Layout>
      <div className={s["extra-layout"]}></div>
      <LICounter />
    </>
  );
};

export default withRedux(IndexPage);
