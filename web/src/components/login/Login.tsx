import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { auth } from '../../services/firebase.service';

type UserLogin = {
  email: string;
  password: string;
};

export const Login = () => {
  const { handleSubmit, register } = useForm<UserLogin>();

  const handleLogin = (data: UserLogin) => {
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
      <div id="firebaseui-auth-container"></div>
      <form
        onSubmit={handleSubmit((data) => handleLogin(data))}
        style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}
      >
        <input placeholder="email" type="email" {...register('email', { required: true })} />
        <input placeholder="password" type="password" {...register('password', { required: true })} />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => auth.signOut()}>Logout</button>
      <p style={{ textAlign: 'center', color: 'white' }}>
        {(auth.currentUser?.displayName || auth.currentUser?.email) ?? 'not logged in'}
      </p>
    </div>
  );
};
