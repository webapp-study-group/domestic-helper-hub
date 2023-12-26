import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  {
    const rows = await knex.select('id', 'name').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `name`')
    await knex.raw("alter table `domestic_helper` add column `name` text null")
    for (let row of rows) {
      await knex('domestic_helper').update({ name: row.name }).where({ id: row.id })
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
  {
    const rows = await knex.select('id', 'religion').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `religion`')
    await knex.raw("alter table `domestic_helper` add column `religion` text null check(`religion` in ('Christian','Catholic','Muslim','Hindu','Buddhist','Judaist','Other'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ religion: row.religion }).where({ id: row.id })
    }
  }
  await knex.raw('alter table `domestic_helper` add column `site_id` text null')
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw('alter table `domestic_helper` drop column `site_id`')
  {
    const rows = await knex.select('id', 'religion').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `religion`')
    await knex.raw("alter table `domestic_helper` add column `religion` text null check(`religion` in ('Christian','Catholic','Muslim','Hindu','Buddhist','Other'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ religion: row.religion }).where({ id: row.id })
    }
  }
  {
    const rows = await knex.select('id', 'religion').from('domestic_helper')
    await knex.raw('alter table `domestic_helper` drop column `religion`')
    await knex.raw("alter table `domestic_helper` add column `religion` text check (`religion` in ('Christian','Catholic','Muslim','Hindu','Buddhist','Other'))")
    for (let row of rows) {
      await knex('domestic_helper').update({ religion: row.religion }).where({ id: row.id })
    }
  }
  // FIXME: alter column (domestic_helper.name) to be non-nullable not supported in sqlite
  // you may set it to be non-nullable with sqlite browser manually
}
