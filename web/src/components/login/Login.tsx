import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { add, auth, getAll } from "../../services/firebase.service";

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
        console.log(error);
      });
  };

  const handleRequestParties = async () => {
    await add({
      id: "",
      eventName: "test",
      description: "test",
      startDateTime: new Date(),
      endDateTime: new Date(),
      location: {
        id: "test",
        locationName: "test",
      },
      musicGenre: "test",
      artists: ["test"],
      price: "FREE",
    });

    await getAll().then((res) => {
      console.log(res);
    });
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
      <button onClick={() => handleRequestParties()}>Send request</button>
    </div>
  );
};
