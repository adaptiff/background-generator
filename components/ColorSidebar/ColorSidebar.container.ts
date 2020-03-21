import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./ColorSidebar";
import { AppState } from "../../types/store";
import {
  setBackgroundColor,
  setItemColor,
  addItemColor,
  removeItemColor
} from "../../actions";
import { getHasNonSVGObjects } from "../../selectors";

export type StateProps = Pick<Props, "configColors" | "hasNonSVGObjects">;
export type DispatchProps = Pick<
  Props,
  "setBackgroundColor" | "setItemColor" | "addItemColor" | "removeItemColor"
>;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState
) => ({
  configColors: state.configColors,
  hasNonSVGObjects: getHasNonSVGObjects(state)
});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setBackgroundColor,
  setItemColor,
  addItemColor,
  removeItemColor
};

export default connect(mapStateToProps, mapDispatchToProps);
