const { execFileSync } = require('child_process')
const { Client } = require('pg')

async function seedIfEmpty() {
  const client = new Client({ connectionString: process.env.DATABASE_URL })

  await client.connect()
  const { rows } = await client.query(
    'SELECT EXISTS (SELECT 1 FROM configs) AS "hasConfig"'
  )
  await client.end()

  if (rows[0].hasConfig) {
    console.log('Database already contains configuration; skipping seed.')
    return
  }

  console.log('Empty database detected; applying initial seed data.')
  execFileSync('npm', ['run', 'db:seed'], { stdio: 'inherit' })
}

seedIfEmpty().catch(error => {
  console.error('Unable to initialise database:', error)
  process.exit(1)
})
