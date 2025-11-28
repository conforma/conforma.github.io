---
title: Resources
---

Whether you're just getting started with supply chain security or looking to deepen your understanding of policy enforcement in container workflows, these resources provide valuable insights from industry experts and real-world implementations.

These conference presentations, demos, educational videos and articles showcase how organizations are using Conforma to secure their software supply chains.

## Enforcing Organization Policies with Enterprise Contract

**Speaker:** Zoran Regvart, Red Hat  
**Event:** SOSS Community Day Europe 2024  
**Format:** Conference Talk with Live Demo   
**Link:** [Watch on YouTube](https://www.youtube.com/watch?v=OmnF_Bm4KOU)

{{< rawhtml >}}
<br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/OmnF_Bm4KOU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<br>
{{< /rawhtml >}}

This talk explores how Conforma leverages Sigstore signatures, in-toto attestations, and other tamper-proof sources to enforce organizational policies. The presentation focuses on the Tekton ecosystem and covers:

- The critical importance of ensuring container images meet organizational policies
- How Conforma enforces policies using secure, tamper-proof sources  
- Configuring policies to validate that specific Tekton Tasks (like code scanners) have been executed during the container image build process

*Perfect for those familiar with Sigstore who want to understand how to go beyond simple signature checks to comprehensive image validation.*

## Policy-Driven Supply Chain Security with Conforma

**Speaker:** Mark Bestavros, Red Hat  
**Event:** DevConf.US 2024  
**Format:** Conference Talk with Live Demo  
**Link:** [Watch on YouTube](https://www.youtube.com/watch?v=JgXXAjRuHfo)

{{< rawhtml >}}
<br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/JgXXAjRuHfo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<br>
{{< /rawhtml >}}

This talk demonstrates how Conforma serves as a decision engine for enforcing provenance, regulatory compliance, and security requirements. Key highlights include:

- User-friendly policy configuration and requirements definition
- Image signature verification and attestation validation
- CVE alert checking and security compliance
- Integration with Open Policy Agent's Rego rule system for extensible policy evaluation

The session includes a live demonstration of building an image, verifying it using the conforma CLI, and customizing enforcement policies.

## Building Trust Through Proactive Security

**Speakers:** Przemyslaw Roguski & Ralph Bean, Red Hat  
**Event:** Open Source Summit North America 2025  
**Format:** Conference Talk with Live Demo  
**Link:** [Talk Details](https://ossna2025.sched.com/event/1zfp2/building-trust-through-proactive-security-key-parts-of-the-trusted-software-supply-chain-przemyslaw-roguski-ralph-bean-red-hat)

{{< rawhtml >}}
<br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/CzWuBeWQDb8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<br>
{{< /rawhtml >}}

This comprehensive session covers Red Hat's Secure Software Development Lifecycle (SDLC) framework and includes:

- Proactive vs. reactive security measures
- SDLC objectives and implementation strategies
- Automated testing and open-source SDLC solutions
- Proactive vulnerability management during build phases
- Secure software building with attestation data production (CSAF/VEX and SBOM)
- Future of AI testing in supply chain security

*Features Ralph's hands-on demonstration showing how conforma works within Konflux in practice.*

## Achieving Simplicity and Security with Konflux

**Speaker:** Dheeraj Singh Jodha, Red Hat  
**Event:** TechGenie Pune 2024  
**Format:** Virtual Presentation  
**Link:** [Watch on YouTube](https://www.youtube.com/watch?v=sR8U5-UPGQs)  
  
{{< rawhtml >}}
<br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/sR8U5-UPGQs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<br>
{{< /rawhtml >}}

This presentation showcases how Konflux integrates with Conforma to provide both simplicity and security in software development workflows. Key highlights include:

- Overview of modern supply chain threats in open-source software
- Introduction to Konflux for secure and automated CI
- Demo: onboarding, testing, vulnerability scanning, and custom policy-based gating (via Conforma)
- Empowering teams to shift left on security through policy-driven pipelines

## How we use software provenance at Red Hat

**Author:** Ralph Bean, Red Hat  
**Format:** Article  
**Link:** [Read on developers.redhat.com](https://developers.redhat.com/articles/2025/05/15/how-we-use-software-provenance-red-hat)  

This article explores how Red Hat's Konflux platform uses software provenance to establish trust in build processes. Key topics include:

- Understanding software provenance and in-toto attestations
- The neutral observer/attester pattern for verifiable build records
- How Conforma validates artifacts through policy-based verification
- Practical examples of attestation data and usage

*Ideal for developers looking to understand how detailed provenance tracking enables trustworthy software supply chains.*