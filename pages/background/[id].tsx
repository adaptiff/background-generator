import React from "react";
import { useRouter } from "next/router";

export interface Props {}

export const Background: React.FC<Props> = props => {
  const router = useRouter();
  const { id } = router.query;

  return <div>---{id}</div>;
};
Background.displayName = "Id";

export default Background;
