---
title: "Tools"
date: 2025-12-02T10:02:18-05:00
author: "Conforma Team"
draft: false
---

Conforma leverages a powerful ecosystem of open-source tools to provide comprehensive supply chain security and policy enforcement. These tools work together to enable secure container image validation, policy evaluation, and artifact management.


## Core Tools

### Skopeo
**Purpose:** Container image and repository management  
**Website:** [https://github.com/containers/skopeo](https://github.com/containers/skopeo)

Skopeo is a command-line utility for performing various operations on container images and image repositories. Conforma uses Skopeo to:

- Inspect container images without pulling them locally
- Copy images between different registries and storage formats
- Retrieve image manifests and metadata for policy evaluation
- Access image layers and configuration data

### ORAS (OCI Registry As Storage)
**Purpose:** OCI artifact management  
**Website:** [https://oras.land/](https://oras.land/)

ORAS enables the storage and retrieval of arbitrary artifacts in OCI-compliant registries. Within Conforma's ecosystem, ORAS facilitates:

- Storing and retrieving attestations alongside container images
- Managing SBOM (Software Bill of Materials) artifacts
- Handling policy bundles and configuration artifacts
- Supporting the broader OCI artifact ecosystem

### Cosign
**Purpose:** Container image signing and verification  
**Website:** [https://sigstore.dev/](https://sigstore.dev/)

Cosign provides cryptographic signing and verification capabilities for container images using Sigstore. Conforma integrates with Cosign to:

- Verify container image signatures using keyless signing
- Validate attestations attached to container images
- Support both traditional key-based and keyless verification workflows
- Ensure image integrity and authenticity

### OPA (Open Policy Agent)
**Purpose:** Policy-as-code engine  
**Website:** [https://www.openpolicyagent.org/](https://www.openpolicyagent.org/)

OPA serves as the core policy evaluation engine, providing flexible policy-as-code capabilities. Conforma leverages OPA to:

- Evaluate Rego policies against container images and their metadata
- Make policy decisions based on image attributes, signatures, and attestations
- Support complex policy logic and custom business rules
- Enable declarative policy definition and management

**Conforma Default Policies:** [github.com/conforma/policy](https://github.com/conforma/policy) | [Policy Documentation](/docs/policy/release_policy.html)

### Rego
**Purpose:** Policy language for defining rules and logic  
**Website:** [https://www.openpolicyagent.org/docs/latest/policy-language/](https://www.openpolicyagent.org/docs/latest/policy-language/)

Rego is the declarative policy language used by OPA to define rules and logic. In Conforma, Rego enables:

- Writing expressive, readable policies for container image validation
- Defining complex business rules and compliance requirements
- Creating reusable policy modules and functions
- Implementing fine-grained access control and validation logic
- Supporting data transformation and query operations

**Example Policies:** [Release Policies](/docs/policy/packages/release_github_certificate.html) | [Policy Authoring Guide](/docs/policy/authoring.html)

### Conftest
**Purpose:** Policy testing and validation  
**Website:** [https://www.conftest.dev/](https://www.conftest.dev/)

Conftest provides a framework for testing and validating policies written in Rego. In the Conforma ecosystem, Conftest enables:

- Testing policy rules during development and CI/CD
- Validating policy syntax and logic
- Running policy tests against sample data
- Ensuring policy quality and correctness

**Policy Examples:** See [A Taste of Policies](/posts/a-taste-of-policies/) for practical examples of policy testing

## How These Tools Work Together

Conforma orchestrates these tools to create a comprehensive supply chain security solution:

1. **Image Discovery**: Skopeo inspects and retrieves container image metadata
2. **Artifact Management**: ORAS handles attestations and related artifacts stored alongside images
3. **Signature Verification**: Cosign validates image signatures and attestations
4. **Policy Evaluation**: OPA evaluates policies against the collected image data and attestations
5. **Policy Testing**: Conftest ensures policy quality during development

This integrated approach enables organizations to implement robust, policy-driven supply chain security that scales with their container workflows.

## Getting Started

To begin using these tools with Conforma:

1. Install the Conforma CLI, which includes integration with these tools
2. Configure your policy requirements using OPA's Rego language
3. Set up image signing workflows using Cosign and Sigstore
4. Test your policies using Conftest
5. Deploy Conforma to enforce policies in your CI/CD pipelines

For detailed installation and configuration instructions, visit our [documentation](/docs/).

