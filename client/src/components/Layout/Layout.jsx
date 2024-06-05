import Nav from "../Nav/Nav";
import "./Layout.css";
export default function Layout(props) {
	return (
		<div className="layout-flex">
      <Nav location={props.location} />
			<div>{props.children}</div>
		</div>
	);
}