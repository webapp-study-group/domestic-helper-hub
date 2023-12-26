import { proxySchema } from 'better-sqlite3-proxy'
import { db } from './db'

export type Company = {
  id?: null | number
  name: string
  main_page: string
  last_page_num: null | number
}

export type DomesticHelper = {
  id?: null | number
  name: null | string
  site_id: null | string
  age: number
  gender: null | ('Female' | 'Male')
  marital: null | ('Married' | 'Single' | 'Widowed' | 'Separated' | 'Divorced')
  kids: number
  nationality: null | ('Filipino' | 'Indonesian' | 'Indian' | 'Afghan' | 'Sri Lankan' | 'Kenyan' | 'Asian' | 'Azerbaijani' | 'Other')
  religion: null | ('Christian' | 'Catholic' | 'Muslim' | 'Hinduist' | 'Buddhist' | 'Judaist' | 'Sikh' | 'Atheist' | 'Other')
  source_url: string
  company_id: number
  company?: Company
}

export type DBProxy = {
  company: Company[]
  domestic_helper: DomesticHelper[]
}

export let proxy = proxySchema<DBProxy>({
  db,
  tableFields: {
    company: [],
    domestic_helper: [
      /* foreign references */
      ['company', { field: 'company_id', table: 'company' }],
    ],
  },
})
