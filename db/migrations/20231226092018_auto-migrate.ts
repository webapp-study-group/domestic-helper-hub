import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  {
    const rows = await knex.select('id', 'religion').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `religion`')
    await knex.raw("alter table `domestic_helper` add column `religion` text check (`religion` in ('Christian','Catholic','Muslim','Hindu','Hinduist','Buddhist','Judaist','Other'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ religion: row.religion }).where({ id: row.id })
    }
  }
  {
    const rows = await knex.select('id', 'religion').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `religion`')
    await knex.raw("alter table `domestic_helper` add column `religion` text null check(`religion` in ('Christian','Catholic','Muslim','Hindu','Hinduist','Buddhist','Judaist','Other'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ religion: row.religion }).where({ id: row.id })
    }
  }
}


export async function down(knex: Knex): Promise<void> {
  {
    const rows = await knex.select('id', 'religion').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `religion`')
    await knex.raw("alter table `domestic_helper` add column `religion` text null check(`religion` in ('Christian','Catholic','Muslim','Hindu','Buddhist','Judaist','Other'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ religion: row.religion }).where({ id: row.id })
    }
  }
  {
    const rows = await knex.select('id', 'religion').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `religion`')
    await knex.raw("alter table `domestic_helper` add column `religion` text check (`religion` in ('Christian','Catholic','Muslim','Hindu','Buddhist','Judaist','Other'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ religion: row.religion }).where({ id: row.id })
    }
  }
}
