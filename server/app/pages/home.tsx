import { o } from '../jsx/jsx.js'
import { prerender } from '../jsx/html.js'
import SourceCode from '../components/source-code.js'
import { proxy } from '../../../db/proxy.js'
import { db } from '../../../db/db.js'
import { mapArray } from '../components/fragment.js'
import Style from '../components/style.js'
import { Context, DynamicContext } from '../context.js'
import { filter } from 'better-sqlite3-proxy'

let select_nationality = db.prepare(/* sql */ `
select
  nationality
, count(id) as count
from domestic_helper
group by nationality
order by count desc
	`)

let nationality_rows = select_nationality.all() as {
  nationality: string
  count: number
}[]

let style = Style(/* css */ `
.helper {
  border: 1px solid black;
  padding: 1rem;
  display: inline-block;
}
.profile-pic {
  max-width: 132px;
  max-height: 132px;
}
`)

let content = (
  <div id="home">
    {style}
    <p>Server Start Time: {new Date().toLocaleString()}</p>
    <p>{proxy.domestic_helper.length.toLocaleString()} Helpers in DB</p>

    <SearchResult />
  </div>
)

function SearchResult(attrs: {}, context: DynamicContext) {
  let params = new URLSearchParams(context.routerMatch?.search)
  let nationality = params.get('nationality')
  let matched_domestic_helper = proxy.domestic_helper
  if (nationality && nationality !== 'All') {
    matched_domestic_helper = filter(proxy.domestic_helper, {
      nationality: nationality as any,
    })
  }
  return (
    <>
      <form>
        <select name="nationality">
          <option>All ({proxy.domestic_helper.length})</option>
          {[
            nationality_rows.map(row => (
              <option
                value={row.nationality}
                selected={row.nationality == nationality ? '' : undefined}
              >
                {row.nationality} ({row.count})
              </option>
            )),
          ]}
        </select>{' '}
        <input type="submit" value="Search" />
      </form>
      <p>{matched_domestic_helper.length.toLocaleString()} matches</p>
      <p>Search Time: {new Date().toLocaleString()}</p>
      {mapArray(matched_domestic_helper, helper => (
        <div class="helper">
          <div>
            #{helper.id} {helper.name}
          </div>
          <div>
            ({helper.nationality} / {helper.religion})
          </div>
          <div>
            <img class="profile-pic" src={helper.profile_pic} />
          </div>
        </div>
      ))}
    </>
  )
}

// console.log('content:', content)

// And it can be pre-rendered into html as well
// let Home = prerender(content)
let Home = content

export default Home
