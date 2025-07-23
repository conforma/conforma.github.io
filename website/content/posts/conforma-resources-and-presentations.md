---
title: "Learning About Conforma: Essential Resources and Presentations"
date: 2025-07-23T13:00:41+02:00
author: "Stefano Pentassuglia"
---

Whether you're just getting started with supply chain security or looking to deepen your understanding of policy enforcement in container workflows, these resources provide valuable insights from industry experts and real-world implementations.

These conference presentations, demos, and educational videos showcase how organizations are using Conforma to secure their software supply chains.

<!--more-->

## Conference Presentations & Talks

### 1. Enforcing Organization Policies with Conforma
**Speaker:** Zoran Regvart, Red Hat  
**Format:** Conference Presentation  
**Link:** [Watch on YouTube](https://www.youtube.com/watch?v=OmnF_Bm4KOU)

This comprehensive session explores how Conforma leverages Sigstore signatures, in-toto attestations, and other tamper-proof sources to enforce organizational policies. The presentation focuses on the Tekton ecosystem and covers:

- The critical importance of ensuring container images meet organizational policies
- How Conforma enforces policies using secure, tamper-proof sources  
- Configuring policies to validate that specific Tekton Tasks (like code scanners) have been executed during the container image build process

*Perfect for those familiar with Sigstore who want to understand how to go beyond simple signature checks to comprehensive image validation.*

### 2. Policy-Driven Supply Chain Security with Conforma
**Speaker:** Mark Reynolds, Red Hat
**Event:** DevConf.US 2024  
**Format:** Conference Talk with Live Demo  
**Link:** [Watch on YouTube](https://www.youtube.com/watch?v=JgXXAjRuHfo&list=PLU1vS0speL2a-MgC0CmlLi8-cC1VwRjvB&index=78)

This talk demonstrates how Conforma serves as a decision engine for enforcing provenance, regulatory compliance, and security requirements. Key highlights include:

- User-friendly policy configuration and requirements definition
- Image signature verification and attestation validation
- CVE alert checking and security compliance
- Integration with Open Policy Agent's Rego rule system for extensible policy evaluation

The session includes a live demonstration of building an image, verifying it using the conforma CLI, and customizing enforcement policies.

### 3. Building Trust Through Proactive Security
**Speakers:** Przemyslaw Roguski & Ralph Bean, Red Hat  
**Event:** Open Source Summit North America 2025  
**Format:** Conference Session with Hands-on Demo  
**Link:** [Session Details](https://ossna2025.sched.com/event/1zfp2/building-trust-through-proactive-security-key-parts-of-the-trusted-software-supply-chain-przemyslaw-roguski-ralph-bean-red-hat)

This comprehensive session covers Red Hat's Secure Software Development Lifecycle (SDLC) framework and includes:

- Proactive vs. reactive security measures
- SDLC objectives and implementation strategies
- Automated testing and open-source SDLC solutions
- Proactive vulnerability management during build phases
- Secure software building with attestation data production (CSAF/VEX and SBOM)
- Future of AI testing in supply chain security

*Features Ralph's hands-on demonstration showing how conforma works within Konflux in practice.*

### 4. Achieving Simplicity and Security with Konflux
**Format:** TechGenie Presentation  
**Link:** [Watch on YouTube](https://www.youtube.com/watch?v=sR8U5-UPGQs)

This presentation showcases how Konflux integrates with Conforma to provide both simplicity and security in software development workflows.

## Next Steps

Ready to get hands-on? Visit our [contribution guide](/contribute/) to learn how you can get involved with the Conforma project. 