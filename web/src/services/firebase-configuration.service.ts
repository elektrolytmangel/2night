import { httpsCallable } from 'firebase/functions';
import { Configuration } from '../model/app';
import { functions } from './firebase.service';

export const getConfiguration = async () => {
  const get = httpsCallable(functions, 'getConfiguration');
  return await get()
    .then((result) => {
      return result.data as Configuration;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const createConfiguration = async (configuration: Configuration) => {
  const createConfiguration = httpsCallable(functions, 'postConfiguration');
  return await createConfiguration(configuration)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateConfiguration = async (configuration: Configuration) => {
  const putConfiguration = httpsCallable(functions, 'putConfiguration');
  return await putConfiguration(configuration)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
