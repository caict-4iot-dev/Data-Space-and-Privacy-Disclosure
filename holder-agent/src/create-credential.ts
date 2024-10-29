import {agent} from './veramo/setup.js'
import {decodeJWT} from "did-jwt";

async function main() {
    const identifier = await agent.didManagerGetByAlias({alias: 'default-dp'})
    console.log('identifier', identifier);

    const verifiableCredential = await agent.createVerifiableCredential({
        credential: {
            // dp- iss
            issuer: {id: identifier.did},
            '@context': ['https://www.w3.org/2018/credentials/v1', 'https://example.com/1/2/3'],
            type: ['VerifiableCredential', 'Custom'],
            issuanceDate: new Date().toISOString(),
            credentialSubject: {
                id: 'did:web:example.com',
                you: 'Rock',
            },
        },
        proofFormat: 'jwt',
    })
    const decoded = decodeJWT(verifiableCredential.proof.jwt)
    console.log(`New credential created`, decoded)
    console.log(JSON.stringify(verifiableCredential, null, 2))
}

main().catch(console.log)
