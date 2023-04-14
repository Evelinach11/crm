import { auth } from "../../firebase";
import { setUser } from "store/slices/userSlice";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const GoogleAuth = ({ dispatch, navigate }) => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch(
          setUser({ email: user.email, id: user.uid, token: user.accessToken })
        );
        navigate("/");
      })
      .catch((error) => {
        alert("Invalid authentification");
      });
  };

  return (
    <div>
      <Button variant="danger">
        <FontAwesomeIcon onClick={googleSignIn} icon={faGoogle} />
      </Button>
    </div>
  );
};
