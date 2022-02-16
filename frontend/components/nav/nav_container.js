//ext
import { connect } from "react-redux";
//int - containers
import Nav from "./nav";
//int - actions
import { signout } from "../../actions/session_actions";
import { openModal } from "../../actions/modal_actions";

const mapSTP = (state) => ({
    currentUser: state.session.currentUser,
});

const mapDTP = (dispatch) => ({
    signout: () => dispatch(signout()),
    openModal: (modal) => dispatch(openModal(modal)),
});

export default connect(mapSTP, mapDTP)(Nav);
