import { faker } from "@faker-js/faker";
import { Party } from "../model/party";

export const getFakeParties = (count: number) => {
  // Generate the list of Party entries
  const parties: Party[] = [];

  for (let i = 0; i < count; i++) {
    const party: Party = {
      id: faker.database.mongodbObjectId(),
      location: {
        id: faker.database.mongodbObjectId(),
        locationName: faker.science.chemicalElement().name,
      },
      description: faker.lorem.paragraph(),
      price: faker.commerce.price({ min: 5, max: 45 }),
      artists: [faker.animal.bear(), faker.animal.cat()],
      musicGenre: faker.music.genre(),
      eventName: faker.commerce.productName(),
      startDateTime: faker.date.future(),
      endDateTime: faker.date.future(),
    };

    parties.push(party);
  }

  return parties;
};
