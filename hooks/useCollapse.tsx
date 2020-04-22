import React, { useState } from "react";
import { Button, Divider } from "antd";

export default () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapseButton = (
    <Divider>
      <Button
        type="link"
        icon={isCollapsed ? "down" : "up"}
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ color: "#0a96fa" }}
      >
        {isCollapsed ? "Show More" : "Show Less"}
      </Button>
    </Divider>
  );
  return { isCollapsed, setIsCollapsed, collapseButton };
};
