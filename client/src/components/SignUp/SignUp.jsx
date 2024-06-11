import "./SignUp.css";
import { useState } from "react";
import { signUp } from "../../services/users";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function SignUp({setOpen, setUser}) {
  const [modal, setModal] = useState(false)
  const [credentials, setCredentials] = useState({
		email: "",
		password: "",
		first_name: "",
		last_name: "",
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

  const onSignUp = async (event) => {
		event.preventDefault();
		try {
      const user = await signUp(credentials);
      setModal(!modal)
      setOpen((prev)=> !prev)
			setUser(user.username);
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
    <><div>
      <button className="sign-up-btn" onClick={() => setModal(!modal)}>Sign up</button>
    </div><div>
        <Modal isOpen={modal} className="parent-modal-div">
          <div className="flex-container">
			<div className="flex-form-container">
				<form className="flex-form-signup" onSubmit={onSignUp}>
					<input
						type="text"
						placeholder="first Name"
						className="su-text"
						value={credentials.first_name}
						name="first_name"
						onChange={handleChange}
					/>
					<input
						type="text"
						placeholder="last Name"
						className="su-text"
						value={credentials.last_name}
						name="last_name"
						onChange={handleChange}
					/>
					<input
						type="text"
						placeholder="username"
						className="su-text"
						value={credentials.username}
						name="username"
						onChange={handleChange}
					/>
					<input
						type="text"
						placeholder="email"
						className="su-text"
						value={credentials.email}
						name="email"
						onChange={handleChange}
					/>
					<input
						type="text"
						placeholder="password"
						className="su-text"
						value={credentials.password}
						name="password"
						onChange={handleChange}
					/>
					<button className="signup-btn">Sign Up</button>
				</form>
			</div>
		</div>
        </Modal>
      </div></>
  )
}