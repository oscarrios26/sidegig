import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logIn } from "../../services/users";
import "./LogIn.css"
import Modal from "react-modal";
import SignUp from "../SignUp/SignUp";

Modal.setAppElement("#root");

export default function LogIn({user, setUser}) {
  const [open, setOpen] = useState(false)
	const [credentials, setCredentials] = useState({
    password: "",
    username: "",
		isError: false,
		errorMsg: "",
	});

	const handleChange = (e) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

  const onLogIn = async (event) => {
		event.preventDefault();
		try {
			const user = await logIn(credentials);
      setUser(user.username);
			localStorage.setItem("user", JSON.stringify(user));
		} catch (error) {
			console.error(error);
			// setUser({
			// 	isError: true,
			// 	errorMsg: "Invalid Credentials",
			// 	email: "",
			// 	password: "",
			// });
		}
	};
  return (
    <>
      <div onClick={() => setOpen(!open)}>
        <h3 className="log-in">Log In</h3>
      </div>
      <div>
        <Modal isOpen={open} className="parent-modal-div">
          <h2 className="login-title">Sign In</h2>
          <div className="modal-div">
            <form className="credentials-form" onSubmit={onLogIn}>
              <input
                type="text"
                placeholder="username"
                className="text"
                value={credentials.username}
                name="username"
                onChange={handleChange} />
              <input
                type="text"
                placeholder="password"
                className="text"
                value={credentials.password}
                name="password"
                onChange={handleChange} />
              <button className="logIn-btn">Log In</button>
            </form>
            <div className="sign-up-div">
              Don't have an account{" "} <SignUp setOpen={setOpen} setUser={setUser} />                     
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
