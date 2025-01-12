import { useState, useEffect } from "react";
import { logIn } from "../../services/users";
import "./LogIn.css"
import Modal from "react-modal";
import SignUp from "../SignUp/SignUp";

Modal.setAppElement("#root");

export default function LogIn({ setUser, openLogIn, setOpenLogIn, openLogInModal, setOpenLogInModal }) {

  const [open, setOpen] = useState(false)
	const [credentials, setCredentials] = useState({
    password: "",
    username: "",
		isError: false,
		errorMsg: "",
  });
  
  useEffect(() => {
    setOpen(openLogIn)
  }, [openLogIn])

  useEffect(() => {
    setOpen(openLogInModal)
  }, [openLogInModal])


	const handleChange = (e) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

  const onLogIn = async (event) => {
		event.preventDefault();
    try {
      await logIn(credentials)
      window.location.reload()
		} catch (error) {
			setCredentials({
				isError: true,
				errorMsg: "Invalid Credentials",
				username: "",
				password: "",
			});
		}
  };
  
  const hadleClick = () => {
    setOpen(!open)
    if (openLogIn) {
      setOpenLogIn((prev) => !prev)
    }
    if (openLogInModal) {
      setOpenLogInModal((prev) => !prev)
    }
  }

  return (
    <>
      <div onClick={() => setOpen(!open)}>
        <h3 className="log-in">Log In</h3>
      </div>
      <div>
        <Modal isOpen={open} className="parent-modal-div">
          <div className="exitlogin-div">
            <button className="exit-login" onClick={hadleClick}>X</button>
          </div>
          <div className="modal-div">
            <form className="credentials-form" onSubmit={onLogIn}>
              <p className="login-title">Sign In</p>
              <div className="div-errormsg"> {credentials.isError ? credentials.errorMsg : null}</div>
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
              <button className="logIn-btn">Submit</button>
            </form>
            <div className="sign-up-div">
              Don't have an account? <SignUp setOpen={setOpen} setUser={setUser}/>                     
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
