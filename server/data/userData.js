import bcrypt from 'bcryptjs';

//Using hashSync method since this is just seeding data

const users = [
  {
    name: 'Dan Level User',
    email: 'dan@techlog.com',
    password: bcrypt.hashSync('123456', 10),
    company: null,
    isAdmin: true,
    isDan: true
  },
  {
    name: 'Reach Admin',
    email: 'admin@reach.no',
    company: null,
    isAdmin: true,
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Reach User',
    email: 'user@reach.no',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'DO Admin',
    email: 'admin@deepocean.no',
    company: null,
    isAdmin: true,
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'DO User',
    email: 'user@deepocean.no',
    password: bcrypt.hashSync('123456', 10)
  }
]

export default users;