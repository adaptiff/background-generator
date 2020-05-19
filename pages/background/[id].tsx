import React from "react";
import { useRouter } from "next/router";
import Index from "../index";
import { initState } from "../../reducer";
import backgrounds from "../../backgrounds";
import omit from "lodash.omit";

export interface Props {}

export const Background: React.FC<Props> = props => {
  const router = useRouter();
  const { id } = router.query;
  const selectedBackground = backgrounds.find(
    background => background.id === parseInt(id as string, 10)
  );

  return (
    <Index
      initialReduxState={{
        ...initState,
        ...omit(selectedBackground, ["id", "preview"])
      }}
    />
  );
};
Background.displayName = "Id";

export default Background;
