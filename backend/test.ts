import { SDJwtVcInstance } from '@sd-jwt/sd-jwt-vc';
import type { DisclosureFrame } from '@sd-jwt/types';
import { createSignerVerifier, digest, ES256, generateSalt } from './utils';

(async () => {
    const { signer, verifier } = await createSignerVerifier();

    const sdjwt = new SDJwtVcInstance({
        signer,
        verifier,
        signAlg: ES256.alg,
        hasher: digest,
        hashAlg: 'SHA-256',
        saltGenerator: generateSalt,
    });

    const claims = {
        firstname: 'John',
        lastname: 'Doe',
        age: '23',
        id: '1234',
    };

    const disclosureFrame: DisclosureFrame<typeof claims> = {
        _sd: ['firstname', 'lastname', 'age'],
    };

    const credential = await sdjwt.issue(
        {
            iss: 'Issuer',
            iat: new Date().getTime(),
            vct: 'ExampleCredentials',
            ...claims,
        },
        disclosureFrame,
    );

    const valid = await sdjwt.validate(credential);

    const presentationFrame = { firstname: true, id: true, age: true };

    const presentation = await sdjwt.present<typeof claims>(
        credential,
        presentationFrame,
    );

    const requiredClaims = ['firstname', 'age', 'id'];

    const verified = await sdjwt.verify(presentation, requiredClaims);
    console.log(verified);
})();