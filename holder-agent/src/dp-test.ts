import {agent} from './veramo/setup.js'
import {decodeJWT} from 'did-jwt'

/**
 * 凭证流程：
 *
 * 持有者使用agent.didManagerCreate（）创建属于自己的DID 并将其存储到数据库中。
 *
 * 颁发者使用agent.createVerifiableCredential()颁发凭证。
 *
 * 颁发者可以建立DIDComm信道，则颁发者可以使用agent.packDIDCommMessage()和agent.sendDIDCommMessage()将凭证发送给持有者。
 *
 * 验证者从持有人请求凭证，可能使用@veramo/selective-diclosure，也可能使用DIDComm，许多其他协议也可以与Veramo一起实现和使用。
 *
 * 持有者使用agent.createVerifiablePresentation()或agent.打包凭证。
 *
 * 持有者将 ’演示文稿‘ 发送给验证者（使用DIDComm或其他协议）。
 *
 * 验证者调用agent.verifyCredential()来解释、验证并可选地存储其包含的凭据。
 *
 *
 * 代码示例：
 *
 * sendDIDCommMessage：
 *
 * await agent.sendDIDCommMessage({
 *       messageId: mediateRequestMessage.id,
 *       packedMessage,
 *       recipientDidUrl: mediator.did,
 * })
 *
 * packDIDCommMessage:
 *
 * await agent.packDIDCommMessage({
 *       packing: 'anoncrypt',
 *       message: {
 *         type: FORWARD_MESSAGE_TYPE,
 *         to: [mediator.did],
 *         id: msgId,
 *         body: {
 *           next: recipient.did,
 *         },
 *         attachments: [
 *           { media_type: DIDCommMessageMediaType.ENCRYPTED, data: { json: JSON.parse(innerMessage.message) } },
 *         ],
 *       },
 *})
 *
 * createVerifiablePresentation
 *
 * await agent.createVerifiablePresentation({
 *       presentation: {
 *         verifiableCredential: [verifiableCredential1],
 *         holder: didEthrIdentifier.did,
 *       },
 *       challenge: 'VERAMO',
 *       proofFormat: 'lds',
 * })
 */

// 创建 did 存储到数据库中
const identifier = await agent.didManagerCreate({alias: 'default'})
//创建凭证
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
// 凭证解密
const token = verifiableCredential.proof.jwt
const {payload} = decodeJWT(token)

/**
 * 找到凭证
 * @param {column} 查询字段
 * @param {value} 查询值
 */
const credentials1 = await agent.dataStoreORMGetVerifiableCredentialsByClaims({
    where: [{ column: 'id', value: [did] }],
});

agent.didManagerListKeys()

// 验证凭证
let credential;
const issuanceDate = '2019-08-19T09:15:20.000Z' // 1566206120
const expirationDate = '2019-08-20T10:42:31.000Z' // 1566297751
credential = await agent.createVerifiableCredential({
    proofFormat: 'jwt',
    credential: {
        issuer: identifier.did,
        issuanceDate,
        expirationDate,
        credentialSubject: {
            hello: 'world',
        },
    },
})
// 在固定时间内验证凭证
const result2 = await agent.verifyCredential({
    credential,
    policies: {now: 1566297000},
})

