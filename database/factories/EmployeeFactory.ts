// import employee from 'App/Models/Employee'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Employee from 'App/Models/Employee'

export default Factory.define(Employee, ({ faker }: any) => {
  return {
    //
    id: faker.datatype.number(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthdate: String(faker.date.birtdate()),
    gender: faker.name.gender(),
    maritalStatus: faker.random.words() ,
    department: faker.commerce.department() ,
    position: faker.name.jobTitle(),
    dateHired: String(faker.date.past()),
    employmentStatus: faker.random.words(),
    contactNumber: faker.phone.imei(),
    email: faker.internet.email() ,
    address: faker.address.buildingNumber() ,
    city: faker.address.city() ,
    nationality: faker.address.country(),

  }
}).build()
