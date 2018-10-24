import faker from 'faker';
import uuid from 'uuid';

function* getContactGenerator(n = 1) {
  n = yield n;
  while (true) {
    n = yield [...new Array(n)].map(() => ({
      id: uuid.v4(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      country: faker.address.country(),
      phoneNumber: faker.phone.phoneNumber(),
      company: faker.company.companyName(),
      counter: 0,
    })) || 1;
  }
}

const contactGenerator = getContactGenerator();
contactGenerator.next();

export { contactGenerator };
