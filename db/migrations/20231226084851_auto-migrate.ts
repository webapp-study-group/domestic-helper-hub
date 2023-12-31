import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  {
    const rows = await knex.select('id', 'marital').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `marital`')
    await knex.raw("alter table `domestic_helper` add column `marital` text check (`marital` in ('Married','Single','Widowed','Separated','Divorced'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ marital: row.marital }).where({ id: row.id })
    }
  }
  {
    const rows = await knex.select('id', 'marital').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `marital`')
    await knex.raw("alter table `domestic_helper` add column `marital` text null check(`marital` in ('Married','Single','Widowed','Separated','Divorced'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ marital: row.marital }).where({ id: row.id })
    }
  }
}


export async function down(knex: Knex): Promise<void> {
  {
    const rows = await knex.select('id', 'marital').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `marital`')
    await knex.raw("alter table `domestic_helper` add column `marital` text null check(`marital` in ('Married','Single','Widowed','Separated'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ marital: row.marital }).where({ id: row.id })
    }
  }
  {
    const rows = await knex.select('id', 'marital').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `marital`')
    await knex.raw("alter table `domestic_helper` add column `marital` text check (`marital` in ('Married','Single','Widowed','Separated'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ marital: row.marital }).where({ id: row.id })
    }
  }
}
