import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../store";
import { AiOutlineGoogle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuthClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await axios.post("/api/auth/google", {
        username: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleAuthClick}
      type="button"
      className="bg-yellow-500 p-2 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-85"
    >
      <div className="flex justify-center gap-4 items-center">
        Continue with Google
        <AiOutlineGoogle className=" text-red-500" />
      </div>
    </button>
  );
}

export default OAuth;
