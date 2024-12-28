import { NavLink } from "react-router-dom";
import "./Nav.css";
import LogIn from "../LogIn/LogIn";
import { signOut } from "../../services/users";
import { useNavigate } from "react-router-dom";
import JobForm from "../JobForm/JobForm";

export default function Nav(props) {
const navigate = useNavigate();
  const handleClick= async ()=> {
		await signOut();
		props.setUser(null);
		navigate("/home");
}

const authenticatedOptions = (
	<>
    <button onClick={()=>handleClick()}>
      Sign Out
    </button>
    <JobForm userId={props.userId} userName={props.user} />
	</>
);

	return (
		<nav>
      <div className="nav-flex">
        <NavLink to="/home" className="logo">
          sidegig
        </NavLink>
        <input type="text" className="input-location" />
        {!props.location.city ? '' : <h3 className="location">{`${props.location.city}, ${props.location.state}`}</h3>}
        {props.user && <h4>Welcome, {props.user}</h4>}
        {props.user ? authenticatedOptions : 
          <LogIn user={props.user} setUser={props.setUser}/>
        }
      </div>
    </nav>
    
	);
}