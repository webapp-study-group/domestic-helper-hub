import { proxySchema } from 'better-sqlite3-proxy'
import { db } from './db'

export type Method = {
  id?: null | number
  method: string
}

export type Url = {
  id?: null | number
  url: string
}

export type UaType = {
  id?: null | number
  name: string
  count: number
}

export type UaBot = {
  id?: null | number
  name: string
  count: number
}

export type UserAgent = {
  id?: null | number
  user_agent: string
  count: number
  ua_type_id: null | number
  ua_type?: UaType
  ua_bot_id: null | number
  ua_bot?: UaBot
}

export type RequestLog = {
  id?: null | number
  method_id: number
  method?: Method
  url_id: number
  url?: Url
  user_agent_id: null | number
  user_agent?: UserAgent
  timestamp: number
}

export type UaStat = {
  id?: null | number
  last_request_log_id: number
}

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
  nationality: null | ('Filipino' | 'Indonesian' | 'Indian' | 'Afghan' | 'Sri Lankan' | 'Kenyan' | 'Asian' | 'Azerbaijani' | 'Chinese' | 'Italian' | 'Other')
  religion: null | ('Christian' | 'Catholic' | 'Muslim' | 'Hinduist' | 'Buddhist' | 'Judaist' | 'Sikh' | 'Atheist' | 'Other')
  source_url: string
  company_id: number
  company?: Company
  profile_pic: null | string
}

export type Language = {
  id?: null | number
  name: string
}

export type HelperLanguage = {
  id?: null | number
  domestic_helper_id: number
  domestic_helper?: DomesticHelper
  language_id: number
  language?: Language
}

export type DBProxy = {
  method: Method[]
  url: Url[]
  ua_type: UaType[]
  ua_bot: UaBot[]
  user_agent: UserAgent[]
  request_log: RequestLog[]
  ua_stat: UaStat[]
  company: Company[]
  domestic_helper: DomesticHelper[]
  language: Language[]
  helper_language: HelperLanguage[]
}

export let proxy = proxySchema<DBProxy>({
  db,
  tableFields: {
    method: [],
    url: [],
    ua_type: [],
    ua_bot: [],
    user_agent: [
      /* foreign references */
      ['ua_type', { field: 'ua_type_id', table: 'ua_type' }],
      ['ua_bot', { field: 'ua_bot_id', table: 'ua_bot' }],
    ],
    request_log: [
      /* foreign references */
      ['method', { field: 'method_id', table: 'method' }],
      ['url', { field: 'url_id', table: 'url' }],
      ['user_agent', { field: 'user_agent_id', table: 'user_agent' }],
    ],
    ua_stat: [],
    company: [],
    domestic_helper: [
      /* foreign references */
      ['company', { field: 'company_id', table: 'company' }],
    ],
    language: [],
    helper_language: [
      /* foreign references */
      ['domestic_helper', { field: 'domestic_helper_id', table: 'domestic_helper' }],
      ['language', { field: 'language_id', table: 'language' }],
    ],
  },
})
