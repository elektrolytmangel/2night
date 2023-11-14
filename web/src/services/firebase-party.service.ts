import { httpsCallable } from 'firebase/functions';
import { Party } from '../model/app';
import { functions } from './firebase.service';

export const get = async (id: string) => {
  const getParty = httpsCallable(functions, 'getParty');
  return await getParty({ id })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAll = async () => {
  const getParties = httpsCallable(functions, 'getParties');
  return await getParties()
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const add = async (partyRequest: any) => {
  const postParty = httpsCallable(functions, 'postParty', {
    limitedUseAppCheckTokens: true,
  });
  return await postParty(partyRequest)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const update = async (partyRequest: Party) => {
  const putParty = httpsCallable(functions, 'putParty');
  return await putParty(partyRequest)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const remove = async (id: string) => {
  const deleteParty = httpsCallable(functions, 'deleteParty');
  return await deleteParty({ id })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
