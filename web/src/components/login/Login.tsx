import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../services/firebase.service";
import { useState } from "react";
import axios from "axios";

type UserLogin = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserLogin>();
  const [user, setUser] = useState<any>(null);

  const handleLogin = (data: UserLogin) => {
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const sendRequest = () => {
    axios.post(
      "http://127.0.0.1:5001/night-403820/us-central1/addParty",
      {
        name: "test",
        date: "2021-10-10",
        time: "10:00",
        location: "test",
        description: "test",
      },
      {
        headers: {
          Authorization: "Bearer " + user?.uid,
        },
      }
    );
  };

  // Retrieve the auth token for a user
  const getUserAuthToken = async () => {
    try {
      // Get the user by their user ID

      // Generate an auth token for the user
      const token = auth.currentUser?.getIdToken(true);
      console.log(token);
      return token;
    } catch (error) {
      console.error("Error retrieving auth token:", error);
      throw error;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "auto" }}>
      <form
        onSubmit={handleSubmit((data) => handleLogin(data))}
        style={{ display: "flex", flexDirection: "column", margin: "auto" }}
      >
        <input
          placeholder="email"
          type="email"
          {...register("email", { required: true })}
        />
        <input
          placeholder="password"
          type="password"
          {...register("password", { required: true })}
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ textAlign: "center", color: "white" }}>
        {user?.displayName ?? "not logged in"}
      </p>
      <button onClick={() => getUserAuthToken()}>Send request</button>
    </div>
  );
};
