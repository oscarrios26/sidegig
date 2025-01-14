import "./LogIn.css"
import { useState, useEffect } from "react";
import { logIn } from "../../services/users";
import { TailSpin } from "react-loader-spinner";
import Modal from "react-modal";
import SignUp from "../SignUp/SignUp";


Modal.setAppElement("#root");

export default function LogIn({ setUser, openLogIn, setOpenLogIn, openLogInModal, setOpenLogInModal }) {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [passwordEye, setPasswordEye] = useState(false)
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
			[e.target.name]: e.target.value
		});
	};

  const onLogIn = async (event) => {
    event.preventDefault();
    const userCredentials = {
      username: credentials.username.toLowerCase(),
      password: credentials.password
    }
    try {
      setLoading(true);
      await logIn(userCredentials)
      window.location.reload()
      setLoading(false);
		} catch (error) {
			setCredentials({
				isError: true,
				errorMsg: "Invalid Credentials",
				username: "",
				password: "",
      });
      setLoading(false);
		}
  };
  
  const hadleClick = () => {
    setOpen(!open)
    credentials.isError = false
    if (openLogIn) {
      setOpenLogIn((prev) => !prev)
    }
    if (openLogInModal) {
      setOpenLogInModal((prev) => !prev)
    }
  }

  function showPassword() {
  let input = document.getElementById("email-input");
  if (input.type === "password") {
    input.type = "text";
    setPasswordEye(true)
  } else {
    input.type = "password";
    setPasswordEye(false)
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
                required
                value={credentials.username}
                name="username"
                onChange={handleChange} />
              <div>
              <input
                type="password"
                placeholder="password"
                className="text"
                id="email-input"
                required
                value={credentials.password}
                name="password"
                  onChange={handleChange} />
                {passwordEye ? 
                  <i class="fa fa-eye-slash eye" onClick={showPassword}></i>
                  : 
                  <i class="fa fa-eye eye" onClick={showPassword}></i>
                }
              </div>
              <button className="logIn-btn">{loading ? <TailSpin
                height="23px"
                width="56px"
                color="red"
                ariaLabel="tail-spin-loading"
                radius="3"
                visible={true} />
                : "Submit"}
              </button>
            </form>
            <div className="sign-up-div">
              Don't have an account? <SignUp setOpen={setOpen} setUser={setUser} />     
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
