import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  {
    const rows = await knex.select('id', 'nationality').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `nationality`')
    await knex.raw("alter table `domestic_helper` add column `nationality` text check (`nationality` in ('Filipino','Indonesian','Indian','Afghan','Sri Lankan','Kenyan','Other'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ nationality: row.nationality }).where({ id: row.id })
    }
  }
  {
    const rows = await knex.select('id', 'nationality').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `nationality`')
    await knex.raw("alter table `domestic_helper` add column `nationality` text null check(`nationality` in ('Filipino','Indonesian','Indian','Afghan','Sri Lankan','Kenyan','Other'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ nationality: row.nationality }).where({ id: row.id })
    }
  }
}


export async function down(knex: Knex): Promise<void> {
  {
    const rows = await knex.select('id', 'nationality').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `nationality`')
    await knex.raw("alter table `domestic_helper` add column `nationality` text null check(`nationality` in ('Filipino','Indonesian','Indian','Afghan','Sri Lankan','Other'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ nationality: row.nationality }).where({ id: row.id })
    }
  }
  {
    const rows = await knex.select('id', 'nationality').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `nationality`')
    await knex.raw("alter table `domestic_helper` add column `nationality` text check (`nationality` in ('Filipino','Indonesian','Indian','Afghan','Sri Lankan','Other'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ nationality: row.nationality }).where({ id: row.id })
    }
  }
}
