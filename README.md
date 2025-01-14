# Data Space and Privacy Disclosure

This is A Privacy Protection Scheme for Selective Disclosure Based on Zero-Knowledge Proofs in Personal Data Space Scenarios.


![Workflow of Data Space and Privacy Disclosure](/screencuts/WorkflowDataSpaceandPrivacyDisclosure.png)



## Inspiration

The concept of personal data spaces is the intersection of data spaces and personal data management. In the context of personal data space exchange, when a verifier requests a proof from a credential holder, the holder can selectively disclose the minimum information required by the verifier. In verifiable credentials, implementing predicate proofs (e.g., proving the subject is over 18) often relies on zk-SNARKs. However, the prover can only demonstrate the validity of the condition but cannot prove that the actual value from the VC is used in the verifier circuit designed by a trusted third party. Not only that, zk-SNARKs is not efficient in generating a proof.

Existing techniques for selective disclosure does not support claim in predicate form during selective disclosure very well. SD-JWT is a widely used authentication standard specifically designed to support selective disclosure. BBS Signature technology enables the holder of a signature to create zero-knowledge proofs while selectively disclosing a subset of signed messages. However, neighter of them can implement predicate selective disclosure.

To solve the chanllenges of zk-SNARKs in implementing claim in predicate form during selective disclosure, we attempt to use TEE together with predicate selective disclosure technology based on zero-knowledge proofs, to ensure that credential holders input the actual parameters from the claims in the VC issued by the credential issuer. This is why we launch this project named "Data Space and Privacy Disclosure".

## What it does

To address the issue of trusted setups and achieve trusted compilation and witness computation of zk-SNARK circuits designed for verifiers in untrusted environments, a verifiable credential framework combining TEE technology (particularly Intel SGX) with ZKP is proposed. This framework ensures that zk-SNARK circuits designed by the verifier can be safely set up and execute the intended compilation and witness computation in a TEE-supported third-party environment, and it can verify the parameters input by the credential holder through a remote attestation mechanism.

As a result, in the context of personal data space exchange, the method we adopt, i.e. predicate selective disclosure technology based on zero-knowledge proofs, is more concise and efficient, with better privacy protection.

## How we built it
The workflow of our framework is as follows:

(1) The verifiable data registry utilizes blockchain technology. Issuers, holders, and verifiers need to register and verify decentralized identifiers (DIDs) through the blockchain and use a credential data structure. The legality and consistency of credentials are ensured by the DIDs stored in the blockchain and the norms of the verifiable credential data structure.
(2) Issuers generate credentials based on statements about the subject. Issuers hash each statement's original parameters with a salt and send them to the holders.
(3) In specific scenarios, holders may need to prove the authenticity of statements to verifiers. Holders provide relevant credentials to verifiers by generating and sending a verifiable presentation.
(4) When holders need to prove the authenticity of statements to verifiers in the form of predicates during selective disclosure (e.g., proving their age is over 18 without revealing their actual age or other statements), verifiers first verify the SCONE CAS using Intel Attestation Services (IAS). Verifiers then manually upload session details to the SCONE CAS as a prerequisite for deployment. The secrets in the session are the hash values of each statement in the VC and the issuer's digital signature.
(5) Verifiers need to create a SCONE confidential image containing a specific zk-SNARK circuit and a universal authentication function, and deploy it in a third-party cloud environment supporting Intel SGX.
(6) Holders input the selectively disclosed parameters and salt values into the SCONE container.
(7) The SCONE container calls the EREPORT instruction to generate a report and sends it to the SCONE LAS on the same platform to request a signature to generate a QUOTE.
(8) The SCONE LAS performs local attestation on the Enclave where the off-chain functionality resides to ensure it is on the same platform, then signs the report with the attestation key to obtain a QUOTE and return it.
(9) The SCONE container sends the QUOTE to the SCONE CAS.
(10) The SCONE CAS sends the QUOTE to the attestation service and generates an attestation verification report as a return.
(11) If the attestation verification report is positive, it indicates that the zk-SNARK circuit and authentication function within the Enclave have completed remote attestation. Based on the session, the SCONE CAS injects the hash values of each statement in the VC and the issuer's digital signature into the authentication function in the SCONE container.

## Challenges we ran into
In order to more comprehensively showcase our work in the competition video, we referred to the videos of several award-winning projects from past DIF Hackathons. After discussion, we established the following guidelines to outline the details we need to pay attention to before and after recording the video:

1. The video should be approximately 3 minutes long.
2. Basic structure of the video: First, introduce the team background in one sentence, mentioning that we are from the China Academy of Information and Communications Technology (CAICT) and DIF China Sig. Then, describe what the project is about in a few sentences. Finally, demonstrate the process, incorporating flowcharts or relevant entity diagrams.
3. Additional points: The video should highlight that the blockchain infrastructure used is the Xinghuo Blockchain from CAICT, as well as its browser extension wallet.
4. To ensure the content is detailed and the language is smooth during recording, a script should be written first, followed by the video recording.

## Accomplishments that we're proud of

We further deepened our understanding of zero-knowledge proofs and DID, learning how to write zero-knowledge proof circuits using Rust and verify them with snarkjs.

Based on our recent research work on this project, we wrote a paper and created a demo, which was very impressive.

We formed a four-person team for the competition, held multiple discussions, and collaborated with each other to complete this competition entry.

## What we learned

We have learned a lot these days:

1. We learned the Rust language to write zero-knowledge proof circuits for selective disclosure, and we used the snarkjs library for verification. We find it very impressive.
2. Within such a short period, we wrote a substantial amount of code for both the front-end and back-end, and most of the code was implemented very well.
3. We have a team with such strong execution capabilities, and under the guidance of the newly established DIF China SIG, the team members collaborated very well.

## What's next for Data Space and Privacy Disclosure

We will make improvements in the following three areas:

1. Provide a set of SDKs to help users more efficiently write zero-knowledge proof circuits tailored to their specific business needs;
2. Research methods to generate and verify proofs more efficiently, enabling the system to support large-scale applications;
3. Support multiple TEE hardware options to offer developers greater flexibility.

##  Built with
javascript、rust、sd-jwt、snarkjs、vc、veramo、zkp

## "Try it out" links

+ Github codes: https://github.com/caict-4iot-dev/Data-Space-and-Privacy-Disclosure
+ Youtube link: https://youtu.be/xEWs7sywk5M

