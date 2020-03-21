import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./Layouts";
import { AppState } from "../../../types/store";
import { selectLayout } from "../../../actions";

export type StateProps = Pick<Props, "selectedLayoutId">;
export type DispatchProps = Pick<Props, "selectLayout">;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState
) => ({
  selectedLayoutId: state.selectedLayoutId
});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  selectLayout
};

export default connect(mapStateToProps, mapDispatchToProps);
