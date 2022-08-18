'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Usuario',
      lastName: 'Demo',
      email: 'test@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario2',
      lastName: 'Demouser',
      email: 'test2@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
},{

  firstName: 'Usuario3',
  lastName: 'Demouser',
  email: 'test3@test.com',
  // Important: Password not encrypted yet! 
  password: '1234',
  roleId: 1,
  image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
  createdAt: new Date,
  updatedAt: new Date
}
  ], {});
  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('Users', null, {});
     
  }
};
