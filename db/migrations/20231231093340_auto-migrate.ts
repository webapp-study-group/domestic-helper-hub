import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  if (!(await knex.schema.hasTable('language'))) {
    await knex.schema.createTable('language', table => {
      table.increments('id')
      table.integer('text').notNullable().unique()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('helper_language'))) {
    await knex.schema.createTable('helper_language', table => {
      table.increments('id')
      table.integer('domestic_helper_id').unsigned().notNullable().references('domestic_helper.id')
      table.integer('language_id').unsigned().notNullable().references('language.id')
      table.timestamps(false, true)
    })
  }
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('helper_language')
  await knex.schema.dropTableIfExists('language')
}
