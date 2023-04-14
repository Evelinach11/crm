import { auth } from "../../firebase";
import { setUser } from "store/slices/userSlice";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";

export const FacebookAuth = ({ dispatch, navigate }) => {
  const facebookSignIn = () => {
    const providerFacebook = new FacebookAuthProvider();
    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
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
      <Button onClick={facebookSignIn} variant="primary">
        <FontAwesomeIcon icon={faFacebook} />
      </Button>
    </div>
  );
};
