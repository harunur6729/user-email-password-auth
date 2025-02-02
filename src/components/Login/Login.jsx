import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    //reset error and success
    setLoginError("");
    setSuccess("");

    // if(!password){
    //     setLoginError('invalid password');
    //     return;
    // }

    //add validation
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if(result.user.emailVerified){
          setSuccess('User Logged in Successfull')
        }
        else{
          alert('Please verify your email address.')
        }
      })
      .catch((error) => {
        console.error(error);
        setLoginError(error.message);
      });
  };

  const handleForgetPassword = () =>{
    const email = emailRef.current.value;
    if(!email){
      console.log('Please provide your email ', email)
      return;
    }
    else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      console.log('please write a valid email')
      return;
    }
    //send validation email
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      alert('please check your email')
    })
    .catch(error =>{
      console.log(error)
    })
  }
  
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                ref={emailRef}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="border relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered w-full"
                  name="password"
                  required
                />
                <span
                  className="absolute top-3 right-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye className="text-2xl"></FaEye>
                  ) : (
                    <FaEyeSlash className="text-2xl"></FaEyeSlash>
                  )}
                </span>
              </div>

              <label className="label">
                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                className="  btn btn-primary w-1/2"
                type="submit"
                value="Login"
              />
            </div>
          </form>
          <small className="relative">
            New to this website? Please{" "}
            <Link className="text-blue-500" to="/register">
              Register
            </Link>{" "}
          </small>
          <div>
            {success && (
              <p className="text-green-600 text-center pb-2">{success}</p>
            )}
            {loginError && <p className="text-red-600">{loginError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
