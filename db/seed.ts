import { seedRow } from 'better-sqlite3-proxy'
import { proxy } from './proxy'

// This file serve like the knex seed file.
//
// You can setup the database with initial config and sample data via the db proxy.

proxy.company[1] ||= {
  name: 'HelperPlace',
  main_page:
    'https://www.helperplace.com/find-candidate-hongkong?country=Hong-Kong&job_position=Domestic-Helper',
  last_page_num: null,
}

proxy.company[2] ||= {
  name: 'JollyHelper (Indonesian)',
  main_page: 'https://www.jollyhelper.com/indonesian-domestic-helper/',
  last_page_num: null,
}

proxy.company[3] ||= {
  name: 'JollyHelper (Philippine)',
  main_page: 'https://www.jollyhelper.com/philippine-domestic-helper/',
  last_page_num: null,
}

seedRow(proxy.language, { name: 'English' })
