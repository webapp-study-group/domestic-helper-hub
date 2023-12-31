import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw('alter table `company` add column `last_page_num` integer null')
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw('alter table `company` drop column `last_page_num`')
}
