import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./ConfigPanel";
import { AppState } from "../../types/store";
import { getSelectedLayout } from "../../selectors";

export type StateProps = Pick<
  Props,
  "selectedObjectCount" | "objectColorCount" | "configFields"
>;
export type DispatchProps = Pick<Props, never>;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState
) => {
  const selectedLayout = getSelectedLayout(state);
  return {
    selectedObjectCount: state.selectedObjectIds.length,
    objectColorCount: state.configColors.objectColors.length,
    configFields: selectedLayout.configFields
  };
};
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {};

export default connect(mapStateToProps, mapDispatchToProps);
