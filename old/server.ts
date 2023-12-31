import express from 'express'
import { print } from 'listening-on'
import { proxy } from './proxy'
import { db } from './db'
import { filter } from 'better-sqlite3-proxy'

let app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let select_nationality = db.prepare(/* sql */ `
select
  nationality
, count(id) as count
from domestic_helper
group by nationality
order by count desc
	`)

app.get('/', (req, res) => {
  let nationality_rows = select_nationality.all() as {
    nationality: string
    count: number
  }[]

  let matched_domestic_helper = proxy.domestic_helper
  if (req.query.nationality) {
    matched_domestic_helper = filter(proxy.domestic_helper, {
      nationality: req.query.nationality as any,
    })
  }

  res.end(`<html>
<head>
<style>
.helper {
  border: 1px solid black;
  padding: 1rem;
}
</style>
</head>
<body>
<p>
  ${proxy.domestic_helper.length.toLocaleString()} Helpers in DB
</p>
<form>
  <select name="nationality">
    ${nationality_rows
      .map(
        row => `
      <option value="${row.nationality}">
        ${row.nationality} (${row.count})
      </option>
`,
      )
      .join('')}
  </select>
  <input type="submit" value="Search">
</form>
<p>
  ${matched_domestic_helper.length.toLocaleString()} matches
</p>
${matched_domestic_helper
  .map(
    helper => `
<div class="helper">
  ${helper.name} (${helper.nationality} / ${helper.religion})
</div>
`,
  )
  .join('')}
</body>
</html>
`)
})

let port = 8100
app.listen(port, () => {
  print(port)
})
