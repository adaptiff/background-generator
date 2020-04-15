import { connect } from 'react-redux';
import {
  createCommission,
  updateCommission,
} from '../redux/commissions/actionCreators';

export default connect(
  state => ({}),
  { updateCommission, createCommission }
);
