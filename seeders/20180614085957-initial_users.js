'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(`
      insert into "Users"(name, email) values
      ('Nguyễn Đức Minh', 'ndminh@gmail.com'),
      ('Cao Chính Nghĩa', 'ccnghia@gmail.com'),
      ('Phùng Trắc Nhạ', 'ptnha@gmail.com'),
      ('Trần Hồng Thắm', 'ththam@gmail.com'),
      ('Võ Minh Tâm', 'vmtam@gmail.com'),
      ('Trần Dũng Đức', 'tdduc@gmail.com'),
      ('Nguyễn Diệu Hiền', 'ndhien@gmail.com');
      `, {raw: true})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
