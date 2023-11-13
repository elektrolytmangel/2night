import { getFirestore } from 'firebase-admin/firestore';
import { Configuration } from '../model/app';
import { App } from 'firebase-admin/app';

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
            id: '25',
            locationName: 'SLF',
            rolesAllowed: ['admin'],
          },
        ],
      };
      await this.collection.add(data);
    }
  }

  public async getConfiguration(): Promise<Configuration> {
    return await this.collection
      .where('isActive', '==', true)
      .get()
      .then((config) => {
        return config.docs.map((doc) => {
          const data = doc.data();
          return data as Configuration;
        })[0];
      });
  }
}
