import { NavLink, Link } from "react-router-dom";
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
  <div className="auth-div">
    <div className="username">
      {props.user && <p className="user-p">Welcome, {props.user}</p>}
    </div>
    <Link to={`/${props.userId}/saved-jobs`}><button className="nav-btn">Saved <i class="fa fa-bookmark-o"></i></button></Link>
    <button className="nav-btn">Inbox <i class="fa fa-envelope"></i></button>
    <JobForm userId={props.userId} userName={props.user} dateJoined={props.dateJoined} />
    <button onClick={()=>handleClick()} className="signout-btn">
      Sign Out
    </button>
	</div>
);

	return (
		<nav className="nav">
      <div className="div-logo">
        <NavLink to="/home" className="logo">
          sidegig
        </NavLink>
        <div className="location">
          {!props.location.city ? '' : <p className="location-p">{`${props.location.city}, ${props.location.state}`}</p>}
        </div>
      </div>
      <div className="div-login">
        {props.user ? authenticatedOptions : 
          <LogIn user={props.user} setUser={props.setUser} logInModal={props.logInModal} setLogInModal={props.setLogInModal} />
        }
      </div>
    </nav>
    
	);
}