import "./Nav.css";
import { NavLink, Link } from "react-router-dom";
import { signOut } from "../../services/users";
import JobForm from "../JobForm/JobForm";
import LogIn from "../LogIn/LogIn";

export default function Nav(props) {
  const handleClick= async ()=> {
		await signOut();
		props.setUser(null);
		window.location.reload()
}

const authenticatedOptions = (
  <div className="auth-div">
    <div className="username">
      {props.user && <p className="user-p">Welcome, {props.user}</p>}
    </div>
    <Link to={`/${props.userId}/saved-jobs`}><button className="nav-btn">Saved <i class="fa fa-bookmark-o"></i></button></Link>
    <Link to={`/${props.userId}/inbox`}><button className="nav-btn">Inbox <i class="fa fa-envelope"></i></button></Link>
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
          <LogIn user={props.user} setUser={props.setUser} openLogIn={props.openLogIn} setOpenLogIn={props.setOpenLogIn} setOpenLogInModal={props.setOpenLogInModal} openLogInModal={props.openLogInModal} />
        }
      </div>
    </nav>
    
	);
}