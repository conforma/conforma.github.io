---
title: "DevConf.US 2026: Closing the Gap Between Build Evidence and Compliance Enforcement"
date: 2026-09-24T10:40:00-04:00
author: "Cuiping Huo & Simon Baird"
---

We're excited to share that Conforma was featured at DevConf.US 2026. The talk tackles a gap many teams run into: you collect plenty of build evidence — SBOMs, SLSA provenance, signatures, attestations — but that evidence doesn't enforce anything on its own.

<!--more-->

## The Challenge: Evidence Without Enforcement

Modern build systems produce a wealth of security metadata. The hard part is turning that data into decisions: which images are allowed to ship, and why? Without enforcement, a signed image still isn't a *trusted* image — the signature only tells you who built it, not whether it meets your policies.

## Closing the Gap with Policy-as-Code

The talk works through a series of live demos that build up from the basics to real-world policy enforcement with Conforma:

- Validating structured data against a policy written in Rego
- Validating a real, signed container image — and catching a source-correlation attack where the signature is valid but the source doesn't match
- Writing one custom rule that different teams tune through `ruleData`, no rule changes required
- Using `effective_on` to roll out a new rule as a warning first, so teams get a grace period before it becomes a hard failure

Each demo is small and self-contained, showing how Conforma turns build evidence into enforceable, auditable decisions.

## Watch the Talk

The recording, slides, and demo repository are now available on our Resources page.

**[Watch "Closing the Gap Between Build Evidence and Compliance Enforcement"](/resources/#closing-the-gap-between-build-evidence-and-compliance-enforcement)**

While you're there, explore our collection of other conference presentations, demos, and educational content about securing software supply chains with Conforma.
