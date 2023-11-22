import { App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { HttpsError } from 'firebase-functions/v2/https';
import { Configuration } from '../model/app';

export default class ConfigurationService {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(app: App) {
    this.collection = getFirestore(app).collection('configuration');
  }

  public async initializeConfiguration() {
    const configuration = await this.collection.get();
    if (configuration.empty) {
      const data = {
        isActive: true,
        eventLocations: [
          {
            id: '0',
            locationName: 'HxGN Dachterrasse',
            rolesAllowed: ['hxgn'],
          },
        ],
      };
      await this.collection.add(data);
    }
  }

  public async getConfiguration(): Promise<Configuration> {
    try {
      return await this.collection
        .where('isActive', '==', true)
        .get()
        .then((config) => {
          return config.docs.map((doc) => {
            const data = { ...doc.data(), id: doc.id };
            return data as Configuration;
          })[0];
        });
    } catch (error: any) {
      throw new HttpsError('internal', error.message);
    }
  }

  public async upateConfiguration(req: Configuration): Promise<Configuration> {
    try {
      const party = req;
      await this.collection.doc(req.id).set(party);
      return { ...party, id: req.id };
    } catch (error: any) {
      throw new HttpsError('internal', error.message);
    }
  }

  public async createConfiguration(req: Configuration): Promise<Configuration> {
    try {
      const config = req;
      const doc = await this.collection.add(config);
      return { ...config, id: doc.id };
    } catch (error: any) {
      throw new HttpsError('internal', error.message);
    }
  }
}
