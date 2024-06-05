import { NavLink } from "react-router-dom";
import "./Nav.css";

const authenticatedOptions = (
	<>
		<NavLink to="/sign-out" className="sign-out">
			Sign Out
		</NavLink>
	</>
);

export default function Nav(props) {
	return (
		<nav>
			<div className="nav-flex">
				<NavLink to="/home" className="logo">
					sidegig
        </NavLink>
        <input type="text" className="input-location"/>
        <h3 className="location">{`${props.location.city},${props.location.state}`}</h3>
			</div>
			{props.user ? authenticatedOptions : null}
		</nav>
	);
}