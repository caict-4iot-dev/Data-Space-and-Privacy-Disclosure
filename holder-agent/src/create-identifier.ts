import { agent } from './veramo/setup.js'

async function main() {
  const identifier = await agent.didManagerCreate({ alias: 'default-dp' })
  console.log(`New identifier created`)
  console.log(JSON.stringify(identifier, null, 2))
}

main().catch(console.log)
