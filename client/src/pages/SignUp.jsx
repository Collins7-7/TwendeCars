import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/auth/signup", {
        username: userName,
        email,
        password,
      });
      setLoading(false);
      navigate("/signin");
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
    setUserName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-semibold text-3xl my-7 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="p-2 border rounded-lg"
          value={userName}
          id="username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          className="p-3 border rounded-lg"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 border rounded-lg"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={loading}
          className="text-white bg-slate-900 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default SignUp;
