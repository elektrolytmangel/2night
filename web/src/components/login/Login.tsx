import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth, getAll, getDirect } from '../../services/firebase.service';

type UserLogin = {
  email: string;
  password: string;
};

export const Login = () => {
  const { handleSubmit, register } = useForm<UserLogin>();
  const [parties, setParties] = useState<any>(null);

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

  const handleRequestParties = async () => {
    /*await add({
      eventName: 'test',
      description: 'test',
      startDateTime: new Date(),
      endDateTime: new Date(),
      location: {
        id: '25',
        locationName: 'SLF',
      },
      musicGenre: 'test',
      artists: ['test'],
      price: 'FREE',
    });*/

    if (parties?.length > 0) {
      /*await update({ ...parties[0], artists: ['Peppito'] }).then((res: any) => {
        console.log('single request', res);
      });*/
      await getDirect(parties[0].id);
    }

    await getAll().then((res) => {
      console.log(res);
      setParties(res);
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
      <button onClick={() => handleRequestParties()}>Send request</button>
      <p style={{ textAlign: 'start', color: 'white' }}>{JSON.stringify(parties)}</p>
    </div>
  );
};
