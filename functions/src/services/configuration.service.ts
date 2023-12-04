import { App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { HttpsError } from 'firebase-functions/v2/https';
import { Configuration } from '../model/app';

const initalState = {
  isActive: true,
  eventLocations: [
    {
      id: '0',
      locationName: 'Admin - All Locations',
      rolesAllowed: ['admin'],
    },
  ],
};

export default class ConfigurationService {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(app: App) {
    this.collection = getFirestore(app).collection('configuration');
  }

  public async initializeConfiguration() {
    const configuration = await this.collection.get();
    if (configuration.empty) {
      await this.collection.add(initalState);
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
      const config = req;
      this.ensureAdminLocation(config);
      await this.collection.doc(req.id).set(config);
      return { ...config, id: req.id };
    } catch (error: any) {
      throw new HttpsError('internal', error.message);
    }
  }

  public async createConfiguration(req: Configuration): Promise<Configuration> {
    try {
      const config = req;
      this.ensureAdminLocation(config);
      const doc = await this.collection.add(config);
      return { ...config, id: doc.id };
    } catch (error: any) {
      throw new HttpsError('internal', error.message);
    }
  }

  private ensureAdminLocation(config: Configuration) {
    const initalAdminLocation = initalState.eventLocations[0];
    if (
      !config.eventLocations.find(
        (x) =>
          x.id === initalAdminLocation.id &&
          x.locationName === initalAdminLocation.locationName &&
          x.rolesAllowed.includes('admin')
      )
    ) {
      config.eventLocations = [...config.eventLocations, initalState.eventLocations[0]];
    }
  }
}
