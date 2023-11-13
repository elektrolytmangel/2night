import { getFirestore } from 'firebase-admin/firestore';
import { Configuration } from '../model/app';

export default class ConfigurationService {
  public async initializeConfiguration() {
    const configurationRef = getFirestore().collection('configuration');
    const configuration = await configurationRef.get();
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
      await configurationRef.add(data);
    }
  }

  public async getConfiguration(): Promise<Configuration> {
    const configurationRef = getFirestore().collection('configuration');
    return await configurationRef
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
