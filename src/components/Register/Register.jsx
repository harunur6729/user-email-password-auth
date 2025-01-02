import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";

const Register = () => {
  const [registerError, setRegisterError] = useState(null);
    const handleRegister = e =>{
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      console.log(email , password)
      //reset error
      setRegisterError('') //jodi reset na kori tahole state ar vitor error ta roe jabe;

      // cereate user
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential =>{
        const user = userCredential.user;
        console.log(user);
      })
      .catch(error =>{
        console.error(error);
        setRegisterError(error.message);
      })  
    }
  return (
    <div className="relative top-40  ">
      <div className="mx-auto md:w-1/2  bg-yellow-50 text-center rounded-lg p-10">
        <h2 className="text-3xl mb-6 text-black font-semibold">Please Register:</h2>
        <form onSubmit={handleRegister}>
          <input className="mb-4 w-3/4 bg-white border rounded-md py-2 px-4" type="email" name="email" id="" placeholder="Enter your email..."/>
          <br />
          <input className="mb--4 w-3/4 py-2 px-4 bg-white border rounded-md" type="password" name="password" id=""  placeholder="Enter your password..."/>
          <br />
          <input className=" mt-4 btn btn-primary w-3/4" type="submit" value="Register" />
        </form>
        {
          registerError && <p className="text-red-400">{registerError}</p>
        }
      </div>
    </div>
  );
};

export default Register;
