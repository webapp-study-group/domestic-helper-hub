import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw("alter table `domestic_helper` add column `gender` text null check(`gender` in ('Female'))")
  await knex.raw("alter table `domestic_helper` add column `nationality` text null check(`nationality` in ('Filipino','Other'))")
  await knex.raw("alter table `domestic_helper` add column `religion` text null check(`religion` in ('Christian','Catholic','Other'))")
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw('alter table `domestic_helper` drop column `religion`')
  await knex.raw('alter table `domestic_helper` drop column `nationality`')
  await knex.raw('alter table `domestic_helper` drop column `gender`')
}
