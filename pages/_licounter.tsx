import React from "react";

export interface Props {}

export const LICounter: React.FC<Props> = props => {
  return (
    <div
      style={{
        position: "absolute",
        top: -1000,
        left: 0
      }}
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
};
LICounter.displayName = "LICounter";

export default LICounter;
