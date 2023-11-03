import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../store";
import OAuth from "../components/OAuth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.users);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await axios.post("/api/auth/signin", {
        email,
        password,
      });

      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.response.data.message));
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="font-semibold text-3xl text-center p-4 my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border rounded-lg p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="border rounded-lg p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-slate-900 p-2 border rounded-lg uppercase text-white
        hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
        <div className="flex gap-2">
          <p>Dont have an account?</p>
          <Link to={"/signup"}>
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default SignIn;
