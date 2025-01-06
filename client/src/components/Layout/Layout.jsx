import Nav from "../Nav/Nav";
import "./Layout.css";
export default function Layout(props) {
	return (
		<div className="layout-flex">
      <Nav location={props.location} setUser={props.setUser} user={props.user} userId={props.userId} dateJoined={props.dateJoined} logInModal={props.logInModal} setLogInModal={props.setLogInModal} />
			<div>{props.children}</div>
		</div>
	);
}