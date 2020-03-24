import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Props } from "./DownloadButton";
import { AppState } from "../../types/store";
import { getHasNonSVGObjects } from "../../selectors";
import { dumpState } from "../../actions";

export type StateProps = Pick<Props, "hasNonSVGObjects">;
export type DispatchProps = Pick<Props, "dumpState">;
export type OwnProps = Omit<Props, keyof (StateProps & DispatchProps)>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState
) => ({
  hasNonSVGObjects: getHasNonSVGObjects(state)
});
const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  dumpState
};

export default connect(mapStateToProps, mapDispatchToProps);
