import { getFirestore } from 'firebase-admin/firestore';
import { HttpsError } from 'firebase-functions/v2/https';
import { PartyRequest, PartyResponse } from '../model/app';
import { App } from 'firebase-admin/app';

export default class PartyService {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(app: App) {
    this.collection = getFirestore(app).collection('parties');
  }

  getParty = async (partyId: string): Promise<PartyResponse> => {
    try {
      const doc = await this.collection.doc(partyId).get();
      return { ...doc.data(), id: doc.id } as PartyResponse;
    } catch (error: any) {
      throw new HttpsError('internal', error.message);
    }
  };

  getParties = async (): Promise<PartyResponse[]> => {
    try {
      const docs = await this.collection.get();
      return docs.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      }) as PartyResponse[];
    } catch (error: any) {
      throw new HttpsError('internal', error.message);
    }
  };

  createParty = async (req: PartyRequest): Promise<PartyResponse> => {
    try {
      const party = req;
      const writeResult = await this.collection.add(party);
      const createdParty = await writeResult.get();
      return { ...createdParty.data(), id: createdParty.id } as PartyResponse;
    } catch (error: any) {
      throw new HttpsError('internal', error.message);
    }
  };

  updateParty = async (partyId: string, req: PartyRequest) => {
    try {
      const party = req;
      await this.collection.doc(partyId).set(party);
      return { ...party, id: partyId };
    } catch (error: any) {
      throw new HttpsError('internal', error.message);
    }
  };

  deleteParty = async (partyId: string) => {
    try {
      await this.collection.doc(partyId).delete();
      return { id: partyId };
    } catch (error: any) {
      throw new HttpsError('internal', error.message);
    }
  };
}
