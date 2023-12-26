import { Parser, int, object, optional, string, url, values } from 'cast.ts'
import { Page, BrowserContext, chromium, firefox, webkit } from 'playwright'
import { Company, DomesticHelper, proxy } from './proxy'
import { filter, find } from 'better-sqlite3-proxy'

// https://www.helperplace.com/resume/hong-kong/domestic-helper/hastuti/150084

async function main() {
  let browser = await chromium.launch({ headless: false })
  let context = await browser.newContext()
  // let page = await context.newPage()

  collectList_HelperPlace(context).catch(e => {
    console.error(e)
  })
  // collectList_JollyHelper(context).catch(e => {
  //   console.error(e)
  // })
}

function storeProfile(
  _profile: {
    name: string | undefined
    site_id: string | undefined
    age: string | undefined
    gender: string | undefined
    marital: string
    kids: string
    nationality: string
    religion: string
  },
  extra: {
    url: string
    company: Company
    site_id_parser: Parser<string>
  },
) {
  try {
    let profileParser = object({
      name: optional(string({ trim: true, nonEmpty: true })),
      site_id: extra.site_id_parser,
      age: int(),
      gender: values(['Female' as const, 'Male' as const]),
      marital: values([
        'Married' as const,
        'Single' as const,
        'Widowed' as const,
        'Separated' as const,
        'Divorced' as const,
      ]),
      kids: int(),
      // FIXME: add more nationality
      nationality: values([
        'Filipino' as const,
        'Indonesian' as const,
        'Indian' as const,
        'Afghan' as const,
        'Sri Lankan' as const,
        'Kenyan' as const,
        'Asian' as const,
        'Azerbaijani' as const,
        'Other' as const,
      ]),
      // FIXME: add more religion
      religion: values([
        'Christian' as const,
        'Catholic' as const,
        'Muslim' as const,
        'Hinduist' as const,
        'Buddhist' as const,
        'Judaist' as const,
        'Sikh' as const,
        'Atheist' as const,
        'Other' as const,
      ]),
    })
    let profile = profileParser.parse(_profile)
    let row = find(proxy.domestic_helper, { source_url: extra.url })
    let domestic_helper: DomesticHelper = {
      name: profile.name || null,
      site_id: profile.site_id,
      age: profile.age,
      gender: profile.gender,
      marital: profile.marital,
      kids: profile.kids,
      nationality: profile.nationality,
      religion: profile.religion,
      source_url: extra.url,
      company_id: extra.company.id!,
    }
    if (row) {
      // update existing record
      proxy.domestic_helper[row.id!] = domestic_helper
    } else {
      // insert new record
      proxy.domestic_helper.push(domestic_helper)
    }
  } catch (error) {
    console.error(`failed to collect ${extra.company.name} profile:`, _profile)
    // console.error(error)
    throw error
  }
}

export async function collectList_HelperPlace(context: BrowserContext) {
  let page = await context.newPage()

  let company = find(proxy.company, { name: 'HelperPlace' })
  if (!company) throw new Error('Forgot to seed company?')

  let pageNum: number = company.last_page_num || 0
  pageNum++
  await page.goto(
    `https://www.helperplace.com/find-candidate-hongkong?country=Hong-Kong&job_position=Domestic-Helper&page=${pageNum}`,
  )
  function collectUrls() {
    return page.evaluate(() => {
      return Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
          'candidate-detail-block .product-detail a[href*="/resume/hong-kong/domestic-helper/"]',
        ),
        a => a.href,
      )
    })
  }

  let urls = await collectUrls()
  let subPage = await page.context().newPage()
  async function patchOldRecords(company: Company) {
    for (let row of filter(proxy.domestic_helper, {
      company_id: company.id!,
      site_id: null,
    })) {
      await collectProfile_HelperPlace(subPage, row.source_url, company)
    }
  }
  await patchOldRecords(company)
  for (; urls.length > 0; ) {
    for (let url of urls) {
      await collectProfile_HelperPlace(subPage, url, company)
    }
    company.last_page_num = pageNum

    await page.evaluate(() => {
      let a = document.querySelector<HTMLAnchorElement>(
        '.page-item .next.page-link',
      )
      if (!a) throw new Error('failed to find next page link')
      a.click()
    })

    // wait
    for (;;) {
      let newUrls = await collectUrls()
      if (newUrls[0] == urls[0]) {
        continue
      } else {
        urls = newUrls
        break
      }
    }
    pageNum++
  }
  await subPage.close()

  await page.close()
}

export async function collectProfile_HelperPlace(
  page: Page,
  url: string,
  company: Company,
) {
  await page.goto(url)
  let _profile = await page.evaluate(() => {
    let name = document
      .querySelector('h1.listing-about-title')
      ?.childNodes[0].textContent?.trim()
    let site_id = location.href.split('/').slice(-2).join('/')
    // e.g. "(37 Years)"
    let age = document
      .querySelector('.resume-age')
      ?.textContent?.trim()
      .match(/\(([0-9]+) Years?\)/)?.[1]
    // e.g. [ "Female", "Divorced", "1 Kid", "Indonesian", "Muslim" ]
    let [gender, marital, kids, nationality, religion] =
      document
        .querySelector('.listing-about-sub-title')
        ?.textContent?.split('|')
        .map(text => text.trim()) || []
    kids = kids?.match(/([0-9]+)\s+Kids?/)?.[1] || kids
    if (kids == 'No Kids') {
      kids = '0'
    }
    if (religion == 'Hindu') {
      religion = 'Hinduist'
    }
    return { name, site_id, age, gender, marital, kids, nationality, religion }
  })
  storeProfile(_profile, {
    url,
    company,
    site_id_parser: string({
      trim: true,
      nonEmpty: true,
      match: /[a-z0-9-]+\/[0-9]+/,
    }),
  })
}

export async function collectList_JollyHelper(context: BrowserContext) {
  let page = await context.newPage()

  let company = find(proxy.company, { name: 'JollyHelper (Indonesian)' })
  if (!company) throw new Error('Forgot to seed company?')

  await page.goto('https://www.jollyhelper.com/indonesian-domestic-helper/')
  function collectUrls() {
    return page.evaluate(() => {
      return Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
          'a.btn-view[href*="/helper/"]',
        ),
        a => a.href,
      )
    })
  }

  let urls = await collectUrls()
  let subPage = await page.context().newPage()
  // await collectProfile_JollyHelper(
  //   subPage,
  //   'https://www.jollyhelper.com/helper/2730/',
  //   company,
  // )
  for (let url of urls) {
    await collectProfile_HelperPlace(subPage, url, company)
  }
  await subPage.close()

  await page.close()
}
export async function collectProfile_JollyHelper(
  page: Page,
  url: string,
  company: Company,
) {
  await sleep(1000)
  await page.goto(url)
  let _profile = await page.evaluate(() => {
    let divList = Array.from(document.querySelectorAll('.helper-exp'))
    let site_id = divList[0].textContent?.match(/Helper ID: ([A-Z0-9-]+)/)?.[1]

    function findByTitle(title: string) {
      divList = Array.from(
        document.querySelectorAll<HTMLDivElement>('.title'),
      ).filter(div => div.innerText == title)
      if (divList.length != 1)
        throw new Error('Failed to find Jolly Helper ' + title)
      return divList[0].nextElementSibling?.textContent?.trim()
    }

    let age = findByTitle('Age')

    let gender = findByTitle('Gender')

    let marital_status = findByTitle('Marital Status') || ''
    let [marital, kids] = marital_status.split(',').map(s => s.trim())
    kids = kids?.match(/([0-9]+) Children/)?.[1] || kids

    let about = findByTitle('About')
    let name = about?.match(/My name is ([a-zA-Z-]+)/)?.[1]

    let Nationality = findByTitle('Nationality') || ''
    let [nationality, religion] = Nationality.split('/').map(s => s.trim())

    // TODO
    return { site_id, name, age, gender, marital, kids, nationality, religion }
  })
  console.log('profile:', _profile)
  storeProfile(_profile, {
    url,
    company,
    site_id_parser: string({
      trim: true,
      nonEmpty: true,
      match: /[A-Z]+-[0-9]+/,
    }),
  })
}

main().catch(e => console.error(e))

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
