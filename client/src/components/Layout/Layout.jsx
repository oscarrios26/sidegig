import Nav from "../Nav/Nav";
import "./Layout.css";
export default function Layout(props) {
	return (
		<div className="layout-flex">
      <Nav location={props.location} setUser={props.setUser} user={props.user} userId={props.userId} />
			<div>{props.children}</div>
		</div>
	);
}