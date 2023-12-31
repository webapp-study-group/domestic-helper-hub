import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(`language`, table => table.dropUnique([`text`]))
  await knex.raw('alter table `language` drop column `text`')
  await knex.raw('alter table `language` add column `name` text not null')
  await knex.schema.alterTable(`language`, table => table.unique([`name`]))
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(`language`, table => table.dropUnique([`name`]))
  await knex.raw('alter table `language` drop column `name`')
  await knex.raw('alter table `language` add column `text` integer not null')
  await knex.schema.alterTable(`language`, table => table.unique([`text`]))
}
