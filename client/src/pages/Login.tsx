import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are neccessary");
    }

    const credentials = { email, password };

    if (credentials) {
      try {
        setLoading(true);
        const validateUser = await axios.post(
          "/api/auth/login",
          JSON.stringify(credentials),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (validateUser.status === 200) {
          toast.success("Successfully logged in");
          navigate("/home");
        }
      } catch (err) {
        setLoading(false);
        console.error(err);
        toast.error("Unexpected Error");
      }
    }
  }

  return (
    <>
      {/*<!-- Component: Card with form --> */}
      <form
        onSubmit={handleLogin}
        className="max-w-xl mt-10 mx-10 md:mx-auto overflow-hidden rounded bg-gray-100 text-slate-500 shadow-md shadow-slate-200"
      >
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="mb-4 text-center">
            <h3 className="text-3xl font-bold text-slate-700">Login</h3>
          </header>
          <div className="flex flex-col space-y-8">
            {/*      <!-- Input field --> */}
            <div className="relative mt-6">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-teal-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="email"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-teal-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Your email
              </label>
            </div>
            {/*      <!-- Input field --> */}
            <div className="relative my-6">
              <input
                id="password"
                type={type}
                name="password"
                placeholder="your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-teal-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="password"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-teal-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Your password
              </label>
              <span
                className="absolute top-1.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400"
                onClick={handleToggle}
              >
                <Icon icon={icon} size={20} />
              </span>
            </div>
          </div>
        </div>
        {/*  <!-- Action base sized basic button --> */}
        <div className="flex justify-end p-6 ">
          <button className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-teal-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-teal-600 focus:bg-teal-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-teal-300 disabled:bg-teal-300 disabled:shadow-none">
            <span>Log in</span>
          </button>
        </div>

        {loading && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}

        <div className="my-4 mx-4">
          <p>
            Not have an account?{" "}
            <Link to="/signup">
              <span className="underline text-teal-500">Signup</span>
            </Link>
          </p>
        </div>
      </form>
      {/*<!-- End Card with form --> */}

      <ToastContainer autoClose={5000} />
    </>
  );
}
