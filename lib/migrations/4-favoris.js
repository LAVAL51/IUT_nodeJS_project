'use strict';

module.exports = {
  async up(knex) {
    await knex.schema.createTable('favoris', (table) => {
      table.integer('idUser').unsigned();
      table.integer('idMovie').unsigned();
      table.foreign('idUser').references('id').inTable('user');
      table.foreign('idMovie').references('id').inTable('movies');
    });
  },

  async down(knex) {
    await knex.schema.dropTableIfExists('favoris');
  }
}