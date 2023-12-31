import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw('alter table `domestic_helper` add column `profile_pic` text null')
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw('alter table `domestic_helper` drop column `profile_pic`')
}
