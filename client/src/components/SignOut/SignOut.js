import { signOut } from "../../services/users";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignOut({ setUser }) {
	const navigate = useNavigate();
	useEffect(() => {
		const signOutUser = async () => {
			await signOut();
			setUser(null);
			navigate("/home");
		};
		signOutUser();
	}, [setUser, navigate]);

	return null;
}
