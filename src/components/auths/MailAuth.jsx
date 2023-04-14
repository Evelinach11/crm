import { auth } from "../../firebase";
import { MailForm } from "../MailForm";
import { setUser } from "store/slices/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";

export const MailAuth = ({ dispatch, navigate }) => {
  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
            role: user.role,
          })
        );
        navigate("/");
      })
      .catch(() => {
        alert("Invalid email or password");
      });
  };

  return <MailForm title="Sign in" handleClick={handleLogin} />;
};
