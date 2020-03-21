import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./Objects";
import { AppState } from "../../../types/store";
import {
  selectObject,
  selectAsOnlyObject,
  deselectObject
} from "../../../actions";

export type StateProps = Pick<Props, "selectedObjectIds" | "uploadedObjects">;
export type DispatchProps = Pick<
  Props,
  "selectObject" | "selectAsOnlyObject" | "deselectObject"
>;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState
) => ({
  uploadedObjects: state.uploadedObjects,
  selectedObjectIds: state.selectedObjectIds
});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  selectObject,
  selectAsOnlyObject,
  deselectObject
};

export default connect(mapStateToProps, mapDispatchToProps);
