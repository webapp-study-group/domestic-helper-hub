import { filter } from 'better-sqlite3-proxy'
import { proxy } from './proxy'

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

// for (let row of filter(proxy.domestic_helper, { religion: 'Hindu' })) {
//   row.religion = 'Hinduist'
// }
