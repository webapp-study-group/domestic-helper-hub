import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  {
    const rows = await knex.select('id', 'gender').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `gender`')
    await knex.raw("alter table `domestic_helper` add column `gender` text check (`gender` in ('Female','Male'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ gender: row.gender }).where({ id: row.id })
    }
  }
  {
    const rows = await knex.select('id', 'gender').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `gender`')
    await knex.raw("alter table `domestic_helper` add column `gender` text null check(`gender` in ('Female','Male'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ gender: row.gender }).where({ id: row.id })
    }
  }
}


export async function down(knex: Knex): Promise<void> {
  {
    const rows = await knex.select('id', 'gender').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `gender`')
    await knex.raw("alter table `domestic_helper` add column `gender` text null check(`gender` in ('Female'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ gender: row.gender }).where({ id: row.id })
    }
  }
  {
    const rows = await knex.select('id', 'gender').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `gender`')
    await knex.raw("alter table `domestic_helper` add column `gender` text check (`gender` in ('Female'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ gender: row.gender }).where({ id: row.id })
    }
  }
}
