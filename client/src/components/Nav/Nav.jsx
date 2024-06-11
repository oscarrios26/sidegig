import { NavLink } from "react-router-dom";
import "./Nav.css";
import LogIn from "../LogIn/LogIn";

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
        <input type="text" className="input-location" />
        {!props.location.city ? '' : <h3 className="location">{`${props.location.city}, ${props.location.state}`}</h3>}
        {props.user ? authenticatedOptions : 
          <LogIn user={props.user} setUser={props.setUser} />
        }
      </div>
      {props.user ? authenticatedOptions : null}
      {props.user && <h4>Welcome, {props.user}</h4>}
    </nav>
    
	);
}