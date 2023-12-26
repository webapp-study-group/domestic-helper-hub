import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw("alter table `domestic_helper` add column `marital` text null check(`marital` in ('Married','Single','Widowed','Separated'))")
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw('alter table `domestic_helper` drop column `marital`')
}
