import {faker} from "@faker-js/faker"

const createRandomUser = () => {
  return {
    id: faker.number.int({min: 1000000,max: 9999999}),
    name: faker.internet.userName(),
    role: faker.person.jobDescriptor(),
  }
}

const randomUsers = faker.helpers.multiple(createRandomUser, {count: 40})

export default randomUsers