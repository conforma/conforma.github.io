---
title: "Tips and Tricks"
date: 2025-12-08T10:02:36-05:00
author: "Conforma Team"
draft: false
---

<style>
table {
  width: 100% !important;
  table-layout: auto;
  border-collapse: collapse;
}
table td, table th {
  word-wrap: break-word;
  vertical-align: top;
  padding: 12px;
  border: 1px solid #dee2e6;
}
table th {
  background-color: #f8f9fa;
  font-weight: bold;
}
table tbody tr:nth-child(odd) {
  background-color: #ffffff;
}
table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}
table tbody tr:hover {
  background-color: #e9ecef;
}
h4 {
  font-weight: 500 !important;
}
.script-section {
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
}
.script-section-light {
  background-color: #ffffff;
}
.script-section-dark {
  background-color: #f8f9fa
}
.repository-section {
  background-color: inherit;
  padding: 20px;
  margin: 20px 0;
}
</style>

This document serves as a comprehensive guide to all the utility scripts available in the "hack" and "hacks" directories across the [Conforma organization](https://github.com/conforma) repositories. These scripts provide essential tooling for development, testing, deployment, and maintenance of the Conforma ecosystem.

Additionally, this document contains tips, tricks, and other bits of ephemera related to the Conforma ecosystem.

<!--more-->

## Introduction

The Conforma organization maintains several repositories that contain utility scripts in their "hack" or "hacks" directories. These scripts are essential tools for developers, maintainers, and operators working with the Conforma ecosystem. This guide provides a comprehensive overview of all available scripts, their purposes, and usage instructions.

## Table of Contents

### Repositories
- [CLI Repository](#cli-repository)
- [Config Repository](#config-repository)
- [CRDs Repository](#crds-repository)
- [Hacks Repository](#hacks-repository)
- [Infra-Deployments-CI Repository](#infra-deployments-ci-repository)
- [Policy Repository](#policy-repository)
- [Review-Rot Repository](#review-rot-repository)
- [Tekton-Catalog Repository](#tekton-catalog-repository)

### Reference Sections
- [Script Categories](#-script-categories)
- [Common Usage Patterns](#-common-usage-patterns)
- [Best Practices](#-best-practices)
- [Troubleshooting Common Issues](#-troubleshooting-common-issues)
- [Contributing](#-contributing)

### Tricks and Tips
- [ec inspect](#ec-inspect)

<div class="repository-section">

## CLI Repository

**Repository**: [conforma/cli](https://github.com/conforma/cli)  
**Purpose**: Command line client for verifying artifacts and evaluating policies

The CLI repository contains the `ec` tool, which is used to evaluate Conforma policies for Software Supply Chain security. It validates container image signatures, provenance, and evaluates policies over container image provenance.

### Scripts in `/hack` directory:

#### Development & Testing Scripts

<div class="script-section script-section-dark">

<a id="demosh"></a>**`demo.sh`** [🔗](https://github.com/conforma/cli/blob/main/hack/demo.sh)

**Purpose**: 
- Runs a demonstration of the EC tool against pre-built images.
- Creates a demo namespace and `EnterpriseContractPolicy`, then evaluates policies against sample images.
- Perfect for testing and demonstrations.

**Environment Variables:**
- `EC_DEBUG=1` - Enables debug output for detailed logging

**Example Usage:**
```bash
# Basic demo run
./hack/demo.sh

# With debug output
EC_DEBUG=1 ./hack/demo.sh
```

**Sample Output:**
```
Using ec version v0.7.0+redhat
✨ Creating demo namespace and policy...
🩺 Evaluating policy for quay.io/example/image:latest
💲 ec validate image --image quay.io/example/image:latest --policy demo/ec-demo
{
  "success": true,
  "violations": [],
  "warnings": []
}
```

</div>

<div class="script-section script-section-light">

<a id="setup-dev-environmentsh"></a>**`setup-dev-environment.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/setup-dev-environment.sh)

**Purpose**:
- Sets up a complete development environment
- Creates a Kind cluster with Tekton Pipeline
- Installs Enterprise Contract Policy CRDs
- Loads Tekton Task bundles
- Essential for local development setup

**Environment Variables:**
- `KIND_CLUSTER_NAME` - Name of the Kind cluster (default: "ec")
- `REGISTRY_PORT` - Port for the local registry (default: 5000)

**Example Usage:**
```bash
# Default setup
./hack/setup-dev-environment.sh

# Custom cluster name and registry port
KIND_CLUSTER_NAME=my-ec-cluster REGISTRY_PORT=5001 ./hack/setup-dev-environment.sh
```

**Sample Output:**
```
✨ Installing development resources
✨ Waiting for the image registry to become available
deployment.apps/registry condition met
✨ Generating ingress controller certificate
✨ Waiting for Tekton Pipelines to become available
deployment.apps/tekton-pipelines-controller condition met
✨ Done
The work namespace is set as current and prepared to run the verify-enterprise-contract Tekton Task.
```

</div>

<div class="script-section script-section-dark">

<a id="setup-test-environmentsh"></a>**`setup-test-environment.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/setup-test-environment.sh)

**Purpose**:
- Sets up testing environment
- Similar to dev environment but optimized for testing
- Configures test-specific resources

</div>

<div class="script-section script-section-light">

<a id="rebuildsh"></a>**`rebuild.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/rebuild.sh)

**Purpose**:
- Rebuilds test images
- Regenerates images used in demos and tests
- Updates attestation data when needed

</div>

#### Build & Release Scripts

<div class="script-section script-section-dark">

<a id="cut-releasesh"></a>**`cut-release.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/cut-release.sh)

**Purpose**:
- Automates the release process
- Creates release tags and builds
- Handles version management
- Publishes release artifacts

</div>

<div class="script-section script-section-light">

<a id="derive-versionsh"></a>**`derive-version.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/derive-version.sh)

**Purpose**:
- Derives version information from git
- Calculates semantic version from git history
- Used by build processes

**Arguments:**
- `[BUILD_SUFFIX]` - Optional build suffix (e.g., "redhat") appended as build metadata

</div>

<div class="script-section script-section-dark">

**`add-auto-tag.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/add-auto-tag.sh)

**Purpose**:
- Adds automatic tagging to repositories
- Automates version tagging workflow
- Integrates with CI/CD pipelines

</div>

#### Deployment & Infrastructure Scripts

<div class="script-section script-section-light">

<a id="update-infra-deploymentssh"></a>**`update-infra-deployments.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/update-infra-deployments.sh)

**Purpose**:
- Updates infrastructure deployment configurations
- Synchronizes with infra-deployments repository
- Updates deployment manifests

</div>

<div class="script-section script-section-dark">

<a id="update-build-definitionssh"></a>**`update-build-definitions.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/update-build-definitions.sh)

**Purpose**:
- Updates build definition references
- Keeps build definitions in sync
- Updates Tekton pipeline references

</div>

<div class="script-section script-section-light">

**`bump-tekton-bundles.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/bump-tekton-bundles.sh)

**Purpose**:
- Updates Tekton bundle references
- Bumps bundle versions in configurations
- Ensures latest task definitions are used
</div>

#### Image & Registry Scripts

<div class="script-section script-section-dark">

**`copy-snapshot-image.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/copy-snapshot-image.sh)

**Purpose**:
- Copies snapshot images between registries
- Facilitates image promotion workflows
- Copies container images from snapshots to target repositories with proper tagging

**Arguments:**
- `SNAPSHOT_SPEC` - JSON specification of the snapshot
- `TARGET_REPO` - Target repository for image copying

**Example Usage:**
```bash
# Copy image from snapshot to target repository
./copy-snapshot-image.sh '{
  "components": [{
    "containerImage": "quay.io/source/app@sha256:abc123...",
    "source": {
      "git": {
        "revision": "abc123def456",
        "url": "https://github.com/myorg/myapp"
      }
    }
  }]
}' "quay.io/target/promoted-app"
```

**Sample Output:**
```
Target repo: quay.io/target/promoted-app
Verifying snapshot contains a single component
Pushing image with tag latest
Copying quay.io/source/app@sha256:abc123... to quay.io/target/promoted-app:latest
✅ Image copied successfully
Pushing image with tag kf-abc123def456
Copying quay.io/source/app@sha256:abc123... to quay.io/target/promoted-app:kf-abc123def456
✅ Image copied successfully
```

</div>

<div class="script-section script-section-light">

**`generate-test-signed-images.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/generate-test-signed-images.sh)

**Purpose**:
- Creates test images with signatures
- Generates signed images for testing keyless acceptance tests
- Creates attestation data
- Sets up complete Sigstore infrastructure

**Prerequisites:** Requires entries in `/etc/hosts` for local services

**Usage:** `./generate-test-signed-images.sh` (no arguments)

 **Environment Variables:**
  - `REKOR_URL` - Rekor transparency log URL
  - `FULCIO_URL` - Fulcio certificate authority URL
  - `ISSUER_URL` - OIDC issuer URL
  - `TUF_MIRROR` - TUF metadata mirror URL

</div>

<div class="script-section script-section-dark">

**`ubi-base-image-bump.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/ubi-base-image-bump.sh)

**Purpose**:
- Updates UBI base image references
- Keeps base images current
- Handles security updates

</div>

#### Specialized Tools

<div class="script-section script-section-light">

**`expand-snapshot.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/expand-snapshot.sh)

**Purpose**:
- Expands application snapshot data
- Processes snapshot resources
- Extracts component information

- **Arguments:**
  - `SNAPSHOT_NAME` - Name of the snapshot (with optional namespace prefix)
  - `CLI_SNAPSHOT_PATH` - Output path for CLI snapshot JSON
  - `BUNDLE_SNAPSHOT_PATH` - Output path for bundle snapshot JSON
- **Usage:** `./expand-snapshot.sh "namespace/snapshot-name" cli.json bundle.json`
</div>

<div class="script-section script-section-dark">

**`reduce-snapshot.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/reduce-snapshot.sh)

**Purpose**:
- Reduces snapshot data for testing
- Creates minimal test snapshots
- Optimizes for specific test scenarios
</div>

<div class="script-section script-section-light">

**`view-clair-reports.sh`**[🔗](https://github.com/conforma/cli/blob/main/hack/view-clair-reports.sh)

**Purpose**:
- Views Clair vulnerability scan reports
- Displays security scan results
- Helps with vulnerability assessment

</div>

</div>

---

<div class="repository-section">

## Config Repository

**Repository**: [conforma/config](https://github.com/conforma/config)  
**Purpose**: Enterprise Contract configuration files for various environments

The Config repository contains policy.yaml files for different environments including Konflux CI, Red Hat internal builds, and GitHub Actions workflows.

### Scripts in `/hack` directory:

<div class="script-section script-section-dark">

**`update-infra-deployments.sh`**[🔗](https://github.com/conforma/config/blob/main/hack/update-infra-deployments.sh)

**Purpose**:
- Updates infrastructure deployment configurations
- Synchronizes configuration changes with deployment repositories
- Ensures consistency across environments
</div>

<div class="script-section script-section-light">

**`verify-policy-sources.sh`**[🔗](https://github.com/conforma/config/blob/main/hack/verify-policy-sources.sh)

**Purpose**:
- Verifies policy source integrity
- Validates policy bundle references
- Checks for broken or invalid policy sources
- Ensures all referenced policies are accessible
</div>

</div>

---

<div class="repository-section">

## CRDs Repository

**Repository**: [conforma/crds](https://github.com/conforma/crds)  
**Purpose**: Custom Resource Definitions for Enterprise Contract Policies

The CRDs repository provides Kubernetes CRD definitions for EnterpriseContractPolicy resources, enabling policy management in Kubernetes environments.

### Scripts in `/hack` directory:

<div class="script-section script-section-dark">

**`next-version.sh`**[🔗](https://github.com/conforma/crds/blob/main/hack/next-version.sh)

**Purpose**:
- Calculates next version number
- Determines appropriate version bumps
- Integrates with release workflows

</div>

<div class="script-section script-section-light">

**`update-infra-deployments.sh`**[🔗](https://github.com/conforma/crds/blob/main/hack/update-infra-deployments.sh)

**Purpose**:
- Updates CRD deployments
- Synchronizes CRD changes with infrastructure
- Ensures latest CRD versions are deployed

</div>

</div>

---

<div class="repository-section">

## Hacks Repository

**Repository**: [conforma/hacks](https://github.com/conforma/hacks)  
**Purpose**: Collection of ad hoc scripts and tooling used by the Conforma team

This repository serves as a central location for utility scripts that don't belong to a specific component but are useful across the organization.

### Scripts in root directory:

<div class="script-section script-section-dark">

**`chains-logs.sh`**[🔗](https://github.com/conforma/hacks/blob/main/chains-logs.sh)

**Purpose**:
- Retrieves Tekton Chains logs
- Collects logs from Tekton Chains components
- Useful for debugging supply chain attestation issues

</div>

<div class="script-section script-section-light">

**`copy-public-sig-key.sh`**[🔗](https://github.com/conforma/hacks/blob/main/copy-publich-sig-key.sh)

**Purpose**:
- Copies public signing keys
- Distributes public keys for signature verification
- Manages key rotation workflows

</div>

<div class="script-section script-section-dark">

**`rpm-version-checker.sh`**[🔗](https://github.com/conforma/hacks/blob/main/rpm-version-checker.sh)

**Purpose**:
- Checks RPM package versions
- Validates RPM package versions in builds
- Ensures version consistency

</div>

<div class="script-section script-section-light">

<a id="show-deployed-ec-policiessh"></a>**`show-deployed-ec-policies.sh`**[🔗](https://github.com/conforma/hacks/blob/main/show-deployed-ec-policies.sh)

**Purpose**:
- Shows currently deployed EC policies
- Queries multiple repositories to determine active policy versions across the Konflux ecosystem
- Provides essential visibility into policy deployment status

**Arguments:**
- `[--raw]` - Shows raw grep results without processing
- `[--short]` - Shows simplified output with just version information
- `[default]` - Shows commit messages for deployed policy versions

**Example Usage:**
```bash
# Default: Show commit messages for deployed policies
./show-deployed-ec-policies.sh

# Short format: Just show version information
./show-deployed-ec-policies.sh --short

# Raw format: Show unprocessed grep results
./show-deployed-ec-policies.sh --raw
```

**Sample Output (Default):**
```
git@github.com:redhat-appstudio/infra-deployments.git:
--------------------------------------------------------
    commit 9e347db8c2f1a3b5d7e9f0a1c3e5g7h9i1k3m5o7
    Author: Policy Bot <policy@conforma.dev>
    Date:   Mon Dec 8 15:30:00 2024 -0500
    
        Update policy bundle to include new SLSA requirements
        
        - Add stricter provenance validation
        - Update trusted task definitions
        - Enhance supply chain security checks

git@gitlab.cee.redhat.com:releng/konflux-release-data.git:
----------------------------------------------------------
    commit a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
    Author: Release Engineering <releng@redhat.com>
    Date:   Mon Dec 8 14:15:00 2024 -0500
    
        Sync with latest enterprise contract policies
```

</div>

<div class="script-section script-section-dark">

<a id="show-latest-build-versionssh"></a>**`show-latest-build-versions.sh`**[🔗](https://github.com/conforma/hacks/blob/main/show-latest-build-versions.sh)

**Purpose**:
- Displays latest build versions
- Shows current versions of key components
- Helps track component updates

</div>

<div class="script-section script-section-light">

**`test_go_gather.sh`**[🔗](https://github.com/conforma/hacks/blob/main/test_go_gather.sh)

**Purpose**:
- Tests the `go-gather` tool
- Validates `go-gather` functionality
- Runs integration tests

</div>

<div class="script-section script-section-dark">

**`trust-local-cert.sh`**[🔗](https://github.com/conforma/hacks/blob/main/trust-local-cert.sh)

**Purpose**:
- Configures trust for local certificates
- Sets up certificate trust for development
- Enables local HTTPS testing

</div>

<div class="script-section script-section-light">

**`update-tekton-task-bundles.sh`**[🔗](https://github.com/conforma/hacks/blob/main/update-tekton-task-bundles.sh)

**Purpose**:
- Updates Tekton task bundle references
- Synchronizes task bundle versions
- Ensures latest task definitions are used

</div>

### Subdirectories:


**`provenance/`** - Contains provenance-related utilities
<div class="script-section script-section-dark">

**`record.sh`**[🔗](https://github.com/conforma/hacks/blob/main/provenance/record.sh)

**Purpose**:
- Records provenance data for testing
- Provides sample pipeline and task definitions
- Provides attestation examples for different SLSA versions
</div>

**`prune_quay_tags/`** - Quay.io tag management

<div class="script-section script-section-dark">

<a id="prune_quay_tagssh"></a>**`prune_quay_tags.sh`**[🔗](https://github.com/conforma/hacks/blob/main/prune_quay_tags/prune_quay_tags.sh)

**Purpose**:
- Advanced container tag cleanup tool
- Removes old container image tags based on age criteria
- Essential for managing registry storage and cleaning up old builds
- Provides sophisticated filtering options

**Required Flags:**
- `--repo <repository>` - Quay.io repository name (e.g., "myorg/myrepo")
- `--filter <regex>` - Regular expression to filter tag names
- `--days <N>` OR `--before <YYYY-MM-DD>` - Age criteria for deletion

**Optional Flags:**
- `--token <token>` - Quay.io API token for authentication
- `--dry-run` - Show what would be deleted without actually deleting

**Example Usage:**

```bash
# Dry run: Show PR tags older than 30 days
./prune_quay_tags.sh --repo myorg/myapp --filter "^pr-" --days 30 --dry-run

# Delete development tags before specific date
./prune_quay_tags.sh --repo myorg/myapp --filter ".*-dev$" --before 2024-01-01

# Clean up nightly builds older than 7 days
./prune_quay_tags.sh --repo myorg/myapp --filter "nightly-.*" --days 7 --token $QUAY_TOKEN
```

**Sample Output:**
```
🔍 Repo:    myorg/myapp
🔎 Filter:  ^pr-
📅 Cutoff:  Before 2024-11-08 10:30:00 EST
🧪 Dry‑run: ON

pr-123-abc123def                                                         2024-10-15 14:22:00 EST 💡 would be deleted
pr-456-def456ghi                                                         2024-10-20 09:15:00 EST 💡 would be deleted
pr-789-ghi789jkl                                                         2024-11-01 16:45:00 EST 💡 would be deleted

🧪 Dry-run: would delete 3 tags matching "^pr-"
```

</div>

</div>

---

<div class="repository-section">

## Infra-Deployments-CI Repository

**Repository**: [conforma/infra-deployments-ci](https://github.com/conforma/infra-deployments-ci)  
**Purpose**: Keep infra-deployments updated with latest Enterprise Contract components

This repository automates the process of keeping infrastructure deployments synchronized with the latest Enterprise Contract components.

### Scripts in `/hack` directory:

<div class="script-section script-section-dark">

**`create-pr.sh`**[🔗](https://github.com/conforma/infra-deployments-ci/blob/main/hack/create-pr.sh)

**Purpose**:
- Creates pull requests for infrastructure updates
- Automates PR creation for component updates
- Handles version bumps and dependency updates
- Integrates with CI/CD workflows

</div>

</div>

---

<div class="repository-section">

**Repository**: [conforma/knative-service](https://github.com/conforma/knative-service)  
**Purpose**: Event-driven service for automatic enterprise contract verification

The Knative Service provides a Kubernetes-native, event-driven service that automatically triggers enterprise contract verification for application snapshots.

### Scripts in `/hack` directory:

#### Testing & Demo Scripts

<div class="script-section script-section-dark">

**`check-apiserversource.sh`**[🔗]

**Purpose**:
- Verifies ApiServerSource configuration
- Validates Knative eventing setup
- Ensures proper event routing

</div>

<div class="script-section script-section-light">

**`test_ecp_lookup.sh`**[🔗]

**Purpose**:
- Tests EnterpriseContractPolicy lookup
- Validates policy resolution
- Tests namespace-specific configurations

</div>

<div class="script-section script-section-dark">

**`wait-for-ready-pod.sh`**[🔗]

**Purpose**:
- Waits for pod readiness
- Utility for deployment scripts
- Ensures services are ready before testing

</div>


<div class="script-section script-section-light">

<a id="demo-vsa-generationsh"></a>**`demo-vsa-generation.sh`**[🔗](https://github.com/conforma/knative-service/blob/main/hack/demos/demo-vsa-generation.sh)

**Purpose**:
- Demonstrates VSA (Verification Summary Attestation) generation

### Complete End-to-End VSA Workflow Demo

Shows the complete VSA workflow including cross-namespace snapshot watching, policy validation, and Rekor integration. This comprehensive demo validates the entire Enterprise Contract verification pipeline.

**Configuration Variables (set in script):**
- `LOCAL_REGISTRY` - In-cluster registry address
- `EXTERNAL_REGISTRY` - External registry port mapping  
- `IMAGE_NAME` - Demo application image name
- `USER_NAMESPACE` - Namespace for cross-namespace demonstration

**Example Usage:**
```bash
# Run the complete VSA generation demo
./hack/demos/demo-vsa-generation.sh
```

**Sample Output:**
```
🎯 VSA Generation Demo
======================
This demo shows the complete end-to-end workflow with:
  ✅ Cross-namespace Snapshot watching
  ✅ In-cluster registry (image accessibility)
  ✅ Image signatures (cosign)
  ✅ SLSA provenance attestations
  ✅ Policy validation
  ✅ VSA generation and upload

📋 Demo Configuration:
  Registry: registry.registry.svc.cluster.local:5000
  Image: registry.registry.svc.cluster.local:5000/vsa-demo-app:demo-1733680123
  Snapshot: vsa-demo-1733680123
  User Namespace: demo-user-namespace

🏗️  Building and signing demo image...
✅ Image built and pushed successfully
✅ Image signed with cosign
✅ SLSA provenance attestation created

📸 Creating Snapshot resource...
✅ Snapshot created in demo-user-namespace

⏱️  Waiting for VSA generation...
✅ TaskRun completed successfully
✅ VSA uploaded to Rekor transparency log
✅ VSA signature verified

🎉 Demo completed successfully!
```

</div>

</div>

---

<div class="repository-section">

## Policy Repository

**Repository**: [conforma/policy](https://github.com/conforma/policy)  
**Purpose**: Rego policies for Enterprise Contract validation

The Policy repository contains the core policy rules written in Rego that define the Enterprise Contract compliance requirements.

### Scripts in `/hack` directory:

<div class="script-section script-section-light">

**`add-auto-tag.sh`**[🔗]

**Purpose**:
  - Adds automatic tagging. 
  - Automates version tagging for policy releases. 
  - Integrates with release workflows

</div>

<div class="script-section script-section-dark">

**`derive-version.sh`**[🔗]

**Purpose**:


  - Derives version from git history.
  - Calculates semantic versions.
  - Used in build and release processes

</div>

<div class="script-section script-section-light">

**`ec-opa.sh`**

**Purpose**:
  - Runs OPA with Enterprise Contract context. 
  - Executes policy evaluation. 
  - Provides EC-specific OPA configuration

</div>

<div class="script-section script-section-dark">

<a id="refresh-examplessh"></a>**`refresh-examples.sh`**[🔗](https://github.com/conforma/policy/blob/main/hack/refresh-examples.sh)

**Purpose**:
  - Updates example data and test cases. 
  - Refreshes JSON sample files used by acceptance tests. 
  - Updates trusted task definitions. 
  - Maintains current image references and attestation data

**Environment Variables:**
  - `IMAGE` - Container image to use (default: quay.io/konflux-ci/ec-golden-image:latest)
  - `ORIGINAL_IMAGE_REPO` - Original repository for attachments
  - `REPOSITORY` - Git repository URL for the image source

**Usage:** `./refresh-examples.sh` (no arguments, uses environment variables)

</div>

<div class="script-section script-section-light">

**`regal.sh`**[🔗]

**Purpose**:
- Runs Regal linter for Rego policies
- Validates policy syntax and style
- Ensures policy quality standards

</div>

<div class="script-section script-section-dark">

**`update-bundles.sh`**[🔗]

**Purpose**:
- Updates policy bundle references
- Synchronizes policy bundle versions
- Ensures latest policies are packaged

</div>

<div class="script-section script-section-light">

**`update-infra-deployments.sh`**[🔗]

**Purpose**:
- Updates infrastructure with new policies
- Deploys policy changes to infrastructure
- Maintains policy consistency across environments

</div>

<div class="script-section script-section-dark">

**`validate-acceptable-bundles.sh`**[🔗]

**Purpose**:
- Validates acceptable bundle configurations
- Ensures bundle references are valid
- Checks bundle accessibility and integrity

</div>

</div>

---

<div class="repository-section">

## Review-Rot Repository

**Repository**: [conforma/review-rot](https://github.com/conforma/review-rot)  
**Purpose**: Generates review-rot page for the Conforma team

This repository generates automated reports about pull request review status across Conforma repositories.

### Scripts in `/hacks` directory:

<div class="script-section script-section-dark">

<a id="maintenance-helpersh"></a>**`maintenance-helper.sh`**[🔗](https://github.com/conforma/review-rot/blob/main/hacks/maintenance-helper.sh)

**Purpose**:
- Assists with repository maintenance tasks
- Automates routine maintenance operations
- Helps with bulk repository updates

</div>

</div>

---

<div class="repository-section">

## Tekton-Catalog Repository

**Repository**: [conforma/tekton-catalog](https://github.com/conforma/tekton-catalog)  
**Purpose**: Tekton tasks provided by the Conforma team

This experimental repository contains Tekton task definitions that are consumed as Tekton Bundles produced by the CLI repository.

### Scripts in `/hack` directory:

<div class="script-section script-section-dark">

**`sync-ec-cli-tasks.sh`**[🔗](https://github.com/conforma/tekton-catalog/blob/main/hack/sync-ec-cli-tasks.sh)

**Purpose**:
- Synchronizes tasks with Conforma CLI repository
- Keeps task definitions in sync with CLI implementations
- Ensures task compatibility with latest Conforma versions
- Automates task bundle updates

</div>

</div>

## 🚀 Common Usage Patterns

### 🛠️ Development Environment Setup

**Quick Start for New Developers:**
```bash
# 1. Set up complete development environment
cd cli/
./hack/setup-dev-environment.sh

# 2. Run a demo to verify everything works
EC_DEBUG=1 ./hack/demo.sh

# 3. Check what policies are currently deployed
cd ../hacks/
./show-deployed-ec-policies.sh --short
```

### 🔄 Daily Development Workflow

**Typical development cycle:**
```bash
# Update your development environment
./hack/update-infra-deployments.sh

# Test your changes
./hack/demo.sh

# Check build versions
./show-latest-build-versions.sh
```

### 🧹 Registry Maintenance

**Clean up old container images:**
```bash
# Preview what would be deleted (dry run)
./prune_quay_tags.sh --repo myorg/myapp --filter "^pr-" --days 30 --dry-run

# Actually delete old PR images
./prune_quay_tags.sh --repo myorg/myapp --filter "^pr-" --days 30

# Clean up development tags older than 1 week
./prune_quay_tags.sh --repo myorg/myapp --filter ".*-dev$" --days 7
```

### 📦 Image Promotion Pipeline

**Promote images through environments:**
```bash
# 1. Copy snapshot image to staging
./copy-snapshot-image.sh "$SNAPSHOT_JSON" "quay.io/myorg/app-staging"

# 2. Expand snapshot for bundle processing
./expand-snapshot.sh "namespace/snapshot-name" cli.json bundle.json

# 3. Validate with policies
ec validate image --file-path cli.json --policy staging/policy
```

## 📂 Script Categories

<div style="width: 100%; overflow-x: auto;">

| Category | Purpose | Key Scripts |
|----------|---------|-------------|
| 🏗️ **Development Setup** | Prepare development environments | <ul><li><code><a href="#setup-dev-environmentsh">setup-dev-environment.sh</a></code></li><li><code><a href="#setup-test-environmentsh">setup-test-environment.sh</a></code></li></ul>|
| 🧪 **Testing & Demo** | Run tests and demonstrations | <ul><li><code><a href="#demosh">demo.sh</a></code></li><li><code><a href="#demo-vsa-generationsh">demo-vsa-generation.sh</a></code></li></ul> |
| 🚀 **Build & Release** | Build and release components | <ul><li><code><a href="#cut-releasesh">cut-release.sh</a></code></li><li><code><a href="#derive-versionsh">derive-version.sh</a></code></li><li><code><a href="#rebuildsh">rebuild.sh</a></code></li></ul> |
| 🏭 **Infrastructure** | Manage deployments and infrastructure | <ul><li><code><a href="#update-infra-deploymentssh">update-infra-deployments.sh</a></code></li><li><code><a href="#update-build-definitionssh">update-build-definitions.sh</a></code></li></ul> |
| 🧹 **Maintenance** | Routine maintenance and updates | <ul><li><code><a href="#prune_quay_tagssh">prune_quay_tags.sh</a></code></li><li><code><a href="#maintenance-helpersh">maintenance-helper.sh</a></code></li><li><code><a href="#refresh-examplessh">refresh-examples.sh</a></code></li></ul> |
| 📊 **Monitoring** | Check status and versions | <ul><li><code><a href="#show-deployed-ec-policiessh">show-deployed-ec-policies.sh</a></code></li><li><code><a href="#show-latest-build-versionssh">show-latest-build-versions.sh</a></code></li></ul> |

</div>

## ✨ Best Practices

### 📋 Before Running Scripts

<div style="width: 100%; overflow-x: auto;">

| ✅ **Do** | ❌ **Don't** |
|-----------|--------------|
| <ul><li>Read script headers for usage instructions</li><li>Check environment variables and prerequisites</li><li>Verify you're in the correct directory</li></ul> | <ul><li>Run scripts without understanding their purpose</li><li>Assume default values will work in your environment</li><li>Run scripts from arbitrary locations</li></ul> |
| <ul><li>Test in development environments first</li><li>Use <code>--dry-run</code> flags when available</li></ul> | <ul><li>Run destructive operations in production</li><li>Skip dry-run testing for cleanup scripts</li></ul> |

</div>

### 🔧 Environment Setup Checklist

```bash
# Verify required tools are installed
command -v kubectl >/dev/null 2>&1 || echo "❌ kubectl not found"
command -v kind >/dev/null 2>&1 || echo "❌ kind not found" 
command -v cosign >/dev/null 2>&1 || echo "❌ cosign not found"
command -v skopeo >/dev/null 2>&1 || echo "❌ skopeo not found"

# Check authentication
kubectl auth can-i create pods --namespace=default
docker login quay.io
```

### 🚨 Safety Guidelines

- **Always use `--dry-run`** for destructive operations first
- **Backup important data** before running maintenance scripts
- **Check script output** for errors before proceeding
- **Use version control** to track configuration changes
- **Test in isolated environments** before production use

## 🔧 Troubleshooting Common Issues

### 🐛 Development Environment Problems

**Kind cluster creation fails:**
```bash
# Check if cluster already exists
kind get clusters

# Delete existing cluster if needed
kind delete cluster --name ec

# Verify Docker/Podman is running
docker ps
```

**Registry authentication errors:**
```bash
# Check authentication status
docker login quay.io

# For Podman users
podman login quay.io

# Verify credentials are stored
cat ~/.docker/config.json | jq '.auths'
```

### 🚨 Script Execution Issues

**Permission denied errors:**
```bash
# Make scripts executable
chmod +x hack/*.sh

# Check script location
ls -la hack/demo.sh
```

**Missing dependencies:**
```bash
# Install common tools on Fedora/RHEL
sudo dnf install kubectl podman skopeo cosign

# Install on Ubuntu/Debian
sudo apt install kubectl podman skopeo
```

### 📊 Policy and Image Issues

**Policy validation failures:**
```bash
# Check policy syntax
ec opa test ./policy

# Verify image signatures
cosign verify --key cosign.pub quay.io/example/image:tag

# Debug with verbose output
EC_DEBUG=1 ./hack/demo.sh
```

**Image not found errors:**
```bash
# Verify image exists
skopeo inspect docker://quay.io/example/image:tag

# Check registry connectivity
curl -I https://quay.io/v2/
```

## 🤝 Contributing

### Adding New Scripts

When contributing new scripts to any repository:

<div style="width: 100%; overflow-x: auto;">

| Step | Action | Example |
|------|--------|---------|
| 1️⃣ | Include appropriate license headers | Copy from existing scripts |
| 2️⃣ | Add usage documentation in comments | <code># Usage: ./script.sh [options]</code> |
| 3️⃣ | Follow existing naming conventions | Use kebab-case: <code>my-new-script.sh</code> |
| 4️⃣ | Test thoroughly before committing | Test in clean environment |
| 5️⃣ | Update this documentation | Add to appropriate repository section |

</div>

### 📝 Documentation Standards

```bash
#!/usr/bin/env bash
# Copyright The Conforma Contributors
# SPDX-License-Identifier: Apache-2.0

# Brief description of what the script does
#
# Usage: ./script.sh [OPTIONS] ARGS
#   OPTIONS:
#     --flag VALUE    Description of flag
#     --dry-run       Show what would be done
#   ARGS:
#     arg1           Description of argument
#
# Examples:
#   ./script.sh --flag value arg1
#   ./script.sh --dry-run arg1
```


## ec-inspect
### Inspecting Policy Data

The **`ec inspect policy-data`** command is a powerful utility for examining and analyzing policy configurations and their associated data within the Enterprise Contract ecosystem. This command is essential for debugging policy issues, understanding policy structure, and auditing policy configurations.

**Purpose**:
- Inspects and displays detailed information about policy data
- Analyzes policy configuration structure and content
- Validates policy data integrity and format
- Provides debugging information for policy troubleshooting
- Extracts rule data and policy sources for analysis

**Usage:**
```bash
$ ec inspect policy-data [OPTIONS]
```

**Arguments:**
- `--policy <POLICY>` - Policy configuration file or Kubernetes resource reference
- `--output <FORMAT>` - Output format: `json`, `yaml`, or `text` (default: `text`)
- `--verbose` - Enable verbose output with additional details
- `--rule-data` - Display rule data configurations
- `--sources` - Show policy source information
- `--effective-time <TIME>` - Inspect policy data as of specific time (RFC3339 format)

**Example Usage:**

**1. Basic policy data inspection:**
```bash
# Inspect policy from file
ec inspect policy-data --policy policy.yaml

# Inspect policy from Kubernetes resource
ec inspect policy-data --policy "namespace/policy-name"
```

**2. Output in different formats:**
```bash
# JSON output for programmatic processing
ec inspect policy-data --policy policy.yaml --output json

# YAML output for readability
ec inspect policy-data --policy policy.yaml --output yaml
```

**3. Detailed inspection with verbose output:**
```bash
# Show detailed information including source resolution
ec inspect policy-data --policy policy.yaml --verbose --sources --rule-data
```

**4. Inspect specific policy components:**
```bash
# Focus on rule data configuration
ec inspect policy-data --policy policy.yaml --rule-data --output json

# Show only policy sources
ec inspect policy-data --policy policy.yaml --sources
```

**Sample Output (Text Format):**
```
Policy Configuration Analysis
=============================

Policy Source: policy.yaml
Effective Time: 2024-12-08T15:30:00Z

Sources:
--------
- Name: policies
  Policy Sources:
    - git::github.com/conforma/policy.git//policy/lib?ref=main
    - git::github.com/conforma/policy.git//policy/release?ref=main
  Data Sources:
    - git::github.com/conforma/policy.git//data?ref=main

Configuration:
--------------
Include Rules:
  - slsa_source_version_controlled
  - github_certificate
  - step_image_registries

Rule Data:
----------
allowed_registry_prefixes:
  - quay.io/redhat-appstudio/
  - registry.redhat.io/
  - registry.access.redhat.com/

allowed_gh_workflow_repos:
  - myorg/myrepo

trusted_tasks:
  - name: buildah
    ref: quay.io/konflux-ci/tekton-catalog/task-buildah:0.1
  - name: git-clone
    ref: quay.io/konflux-ci/tekton-catalog/task-git-clone:0.1

Public Key: 
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEZP/0htjhVt2y0ohjgtIIgICOtQtA
naYJRuLprwIv6FDhZ5yFjYUEtsmoNcW7rx2KM6FOXGsCX3BNc7qhHELT+g==
-----END PUBLIC KEY-----

Validation Status: ✅ Valid
Source Resolution: ✅ All sources accessible
Rule Data Validation: ✅ All required data present
```

**Sample Output (JSON Format):**
```json
{
  "policy": {
    "sources": [
      {
        "name": "policies",
        "policy": [
          "git::github.com/conforma/policy.git//policy/lib?ref=main",
          "git::github.com/conforma/policy.git//policy/release?ref=main"
        ],
        "data": [
          "git::github.com/conforma/policy.git//data?ref=main"
        ],
        "ruleData": {
          "allowed_registry_prefixes": [
            "quay.io/redhat-appstudio/",
            "registry.redhat.io/"
          ],
          "allowed_gh_workflow_repos": [
            "myorg/myrepo"
          ],
          "trusted_tasks": [
            {
              "name": "buildah",
              "ref": "quay.io/konflux-ci/tekton-catalog/task-buildah:0.1"
            }
          ]
        }
      }
    ],
    "configuration": {
      "include": [
        "slsa_source_version_controlled",
        "github_certificate",
        "step_image_registries"
      ]
    },
    "publicKey": "-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEZP/0htjhVt2y0ohjgtIIgICOtQtA\nnaYJRuLprwIv6FDhZ5yFjYUEtsmoNcW7rx2KM6FOXGsCX3BNc7qhHELT+g==\n-----END PUBLIC KEY-----"
  },
  "metadata": {
    "effectiveTime": "2024-12-08T15:30:00Z",
    "sourceResolution": "success",
    "validationStatus": "valid",
    "resolvedSources": 3,
    "includedRules": 3
  }
}
```

**Common Use Cases:**

**1. Policy Debugging:**
```bash
# Debug policy configuration issues
ec inspect policy-data --policy policy.yaml --verbose

# Check if all sources are accessible
ec inspect policy-data --policy policy.yaml --sources --output json | jq '.metadata.sourceResolution'
```

**2. Policy Auditing:**
```bash
# Generate policy audit report
ec inspect policy-data --policy policy.yaml --output json > policy-audit.json

# Extract rule data for compliance review
ec inspect policy-data --policy policy.yaml --rule-data --output yaml
```

**3. Policy Validation:**
```bash
# Validate policy structure before deployment
ec inspect policy-data --policy policy.yaml --verbose

# Check policy at specific point in time
ec inspect policy-data --policy policy.yaml --effective-time "2024-01-01T00:00:00Z"
```

**4. Integration with Scripts:**
```bash
# Extract trusted tasks for automation
TRUSTED_TASKS=$(ec inspect policy-data --policy policy.yaml --rule-data --output json | jq -r '.policy.sources[0].ruleData.trusted_tasks[].ref')

# Validate multiple policies
for policy in policies/*.yaml; do
  echo "Inspecting $policy..."
  ec inspect policy-data --policy "$policy" --output json | jq '.metadata.validationStatus'
done
```

**Troubleshooting:**

**Policy source resolution failures:**
```bash
# Check source accessibility with verbose output
ec inspect policy-data --policy policy.yaml --sources --verbose

# Test with specific git reference
ec inspect policy-data --policy policy.yaml --effective-time "2024-01-01T00:00:00Z"
```

**Rule data validation errors:**
```bash
# Inspect rule data structure
ec inspect policy-data --policy policy.yaml --rule-data --output yaml

# Validate against expected schema
ec inspect policy-data --policy policy.yaml --verbose | grep -A 10 "Rule Data Validation"
```

