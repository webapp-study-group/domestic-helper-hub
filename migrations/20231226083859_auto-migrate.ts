import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw('alter table `domestic_helper` drop column `religion`')
  await knex.raw('alter table `domestic_helper` drop column `nationality`')
  await knex.raw('alter table `domestic_helper` drop column `gender`')
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw("alter table `domestic_helper` add column `gender` text not null check(`gender` in ('Female'))")
  await knex.raw("alter table `domestic_helper` add column `nationality` text not null check(`nationality` in ('Filipino','Other'))")
  await knex.raw("alter table `domestic_helper` add column `religion` text not null check(`religion` in ('Christian','Catholic','Other'))")
}
