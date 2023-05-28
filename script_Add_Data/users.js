import bcrypt from 'bcryptjs/dist/bcrypt.js';

const users = [
  {
    name: 'Lawliet',
    email: 'ljerezparra@gmail.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
    isEditor: true,
  },
];
export default users;
