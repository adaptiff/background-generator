import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./ImageUpload";
import { AppState } from "../../../../types/store";
import { addUploadedObject } from "../../../../actions";

export type StateProps = Pick<Props, never>;
export type DispatchProps = Pick<Props, "addUploadedObject">;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState
) => ({});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  addUploadedObject
};

export default connect(mapStateToProps, mapDispatchToProps);
