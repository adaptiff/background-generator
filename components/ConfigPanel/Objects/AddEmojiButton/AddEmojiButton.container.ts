import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./AddEmojiButton";
import { AppState } from "../../../../types/store";
import { addEmojiObject } from "../../../../actions";

export type StateProps = Pick<Props, never>;
export type DispatchProps = Pick<Props, "addEmojiObject">;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState
) => ({});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  addEmojiObject
};

export default connect(mapStateToProps, mapDispatchToProps);
