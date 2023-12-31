import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  if (!(await knex.schema.hasTable('company'))) {
    await knex.schema.createTable('company', table => {
      table.increments('id')
      table.text('name').notNullable().unique()
      table.text('main_page').notNullable().unique()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('domestic_helper'))) {
    await knex.schema.createTable('domestic_helper', table => {
      table.increments('id')
      table.text('name').notNullable()
      table.integer('age').notNullable()
      table.enum('gender', ['Female']).notNullable()
      table.enum('marital', ['Married', 'Single', 'Widowed']).notNullable()
      table.integer('kids').notNullable()
      table.enum('nationality', ['Filipino', 'Other']).notNullable()
      table.enum('religion', ['Christian', 'Catholic', 'Other']).notNullable()
      table.text('source_url').notNullable().unique()
      table.integer('company_id').unsigned().notNullable().references('company.id')
      table.timestamps(false, true)
    })
  }
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('domestic_helper')
  await knex.schema.dropTableIfExists('company')
}
