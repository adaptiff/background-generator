import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./Presets";
import { AppState } from "../../../types/store";
import { selectLayout } from "../../../actions";

export type StateProps = Pick<Props, "selectedPresetId">;
export type DispatchProps = Pick<Props, never>;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState
) => ({
  selectedPresetId: undefined,
});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  selectLayout,
};

export default connect(mapStateToProps, mapDispatchToProps);
