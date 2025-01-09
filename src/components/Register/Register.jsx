import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState(null);
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name,email, password, accepted);

    //reset error
    setRegisterError(""); //jodi reset na kori tahole state ar vitor error ta roe jabe;

    if (password.length < 6) {
      setRegisterError("Password should be at leaset 6 characters or longer");
      return; //jehetu 6 char pass na hole faild korbei tahole sudhu sudhu samne dike jete dewar ki dorkar.tai return kore dilam jate akhan thekei fire jai
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should have at least one uper case characters."
      );
      return;
    } else if (!accepted) {
      setRegisterError("please accept our terms and condition");
      return;
    }
    // cereate user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess("User Created Successfully");
        toast.success(success);
        //Update Profile
        updateProfile(result.user, {
          displayName:name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(()=>{
          console.log('profile updated')
        })
        .catch(error=>{
          console.error(error)
        })
        //send verification email
        sendEmailVerification(result.user).then(() => {
          alert("Please check your email and verify your account!");
        });
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div className="relative top-40  ">
      <ToastContainer></ToastContainer>
      <div className="mx-auto md:w-1/2  bg-yellow-50 text-center rounded-lg p-10">
        <h2 className="text-3xl mb-6 text-black font-semibold">
          Please Register:
        </h2>
        <div className="flex justify-center">
          <form className="w-1/2 " onSubmit={handleRegister}>
            <input
              className="mb-4 w-full bg-white border rounded-md py-2 px-4"
              type="text"
              name="name"
              id=""
              required
              placeholder="Enter your Name..."
            />
            <input
              className="mb-4 w-full bg-white border rounded-md py-2 px-4"
              type="email"
              name="email"
              id=""
              required
              placeholder="Enter your email..."
            />
            <br />

            {/* password field  */}

            <div className=" relative  rounded-md">
              <input
                className=" w-full py-2 px-4 bg-white border rounded-md"
                type={showPassword ? "text" : "password"} //jodi showPassword true hoi tahole type hobe text r false hole type hobe password
                name="password"
                id=""
                required
                placeholder="Enter your password..."
              />
              <span
                className="absolute top-2 right-2 text-2xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
              </span>
              {/**(!showPassword)atar mane holo click korar por true thakle false hobe r false thakle true hobe ,atar jonno akta user state use  kora hoeche*/}
            </div>
            <div className="flex mt-2">
              <input className="" type="checkbox" name="terms" id="terms" />
              <label htmlFor="terms">
                Accept our <a href="">Terms and conditions</a>
              </label>
            </div>
            <br />
            <input
              className="  btn btn-primary w-1/2"
              type="submit"
              value="Register"
            />
          </form>
        </div>
        {registerError && <p className="text-red-400">{registerError}</p>}
        <p>
          Already have an account? Please
          <Link className="text-blue-400" to="/login">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
