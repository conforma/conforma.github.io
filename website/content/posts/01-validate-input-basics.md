---
title: Validating arbitary data
date: 2026-01-13T00:30:43-05:00
author: Simon Baird
---
In this tutorial we'll introduce some basic Conforma concepts
and work through some examples of applying policies against some arbitrary
input data.

## ec validate input

Conforma can perform policy checks on arbitrary data with `ec
validate input`. Let's try an example.


A simple data file:

```yaml
# file: input.yaml

animals:
  - name: Charlie
    species: dog
  - name: Luna
    species: cat
```


A minimal Conforma policy defined in Rego:

```rego
# file: no-cats/main.rego

package main

# METADATA
# title: No cats
# description: Disallow felines.
# custom:
#   short_name: no_cats
#   solution: Please ensure no cats are
#     present in the animal list.
#
deny contains result if {
	some animal in input.animals
	animal.species == "cat"
	result := {"code": "main.no_cats", "msg": "No cats allowed!"}
}
```

To use that, Conforma needs a policy file specifying a policy source:

```yaml
# file: policy.yaml

sources:
  - policy:
      - ./no-cats
```


Now we can run Conforma like this:

```ec
$ ec validate input --file input.yaml --policy policy.yaml
Success: false
Result: FAILURE
Violations: 1, Warnings: 0, Successes: 0
Input File: input.yaml

Results:
✕ [Violation] main.no_cats
  FilePath: input.yaml
  Reason: No cats allowed!

For more information about policy issues, see the policy documentation: https://conforma.dev/docs/policy/
Error: success criteria not met

```


## Using --info for more detailed output

The metadata associated with the policy rule is important for
Conforma. Adding the `--info` flag will use the metadata to show more
verbose/user-friendly output:

```ec
$ ec validate input --file input.yaml --policy policy.yaml --info
Success: false
Result: FAILURE
Violations: 1, Warnings: 0, Successes: 0
Input File: input.yaml

Results:
✕ [Violation] main.no_cats
  FilePath: input.yaml
  Reason: No cats allowed!
  Title: No cats
  Description: Disallow felines. To exclude this rule add "main.no_cats" to the `exclude` section of the policy configuration.
  Solution: Please ensure no cats are present in the animal list.

For more information about policy issues, see the policy documentation: https://conforma.dev/docs/policy/
Error: success criteria not met

```


## Using --show-successes to show passing checks

Let's "fix" the violation and run it again:

```ec
$ sed -i "s/cat/rabbit/" input.yaml

```

```yaml
# file: input.yaml

animals:
  - name: Charlie
    species: dog
  - name: Luna
    species: rabbit
```

```ec
$ ec validate input --file input.yaml --policy policy.yaml --info
Success: true
Result: SUCCESS
Violations: 0, Warnings: 0, Successes: 1
Input File: input.yaml


```


By default there's not much output on success, but we can add
the `--show-successes` flag to change that:

```ec
$ ec validate input --file input.yaml --policy policy.yaml --info --show-successes
Success: true
Result: SUCCESS
Violations: 0, Warnings: 0, Successes: 1
Input File: input.yaml

Results:
✓ [Success] main.no_cats
  FilePath: input.yaml
  Title: No cats
  Description: Disallow felines.


```


(Turn rabbits back into cats for the next step):

```ec
$ sed -i "s/rabbit/cat/" input.yaml

```


## Warnings

We can use "warn" to produce a warning instead of a violation:

(Append to the existing file...)

```rego
# file: no-cats/main.rego

# METADATA
# title: Charlie warning
# description: Charlie is a troublemaker!
# custom:
#   short_name: charlie_watch
#   solution: Keep a close eye on Charlie.
#
warn contains result if {
	some animal in input.animals
	animal.name == "Charlie"
	result := {"code": "main.charlie_watch", "msg": "Charlie is here"}
}
```

```ec
$ ec validate input --file input.yaml --policy policy.yaml --info --show-successes
Success: false
Result: FAILURE
Violations: 1, Warnings: 1, Successes: 0
Input File: input.yaml

Results:
✕ [Violation] main.no_cats
  FilePath: input.yaml
  Reason: No cats allowed!
  Title: No cats
  Description: Disallow felines. To exclude this rule add "main.no_cats" to the `exclude` section of the policy configuration.
  Solution: Please ensure no cats are present in the animal list.

› [Warning] main.charlie_watch
  FilePath: input.yaml
  Reason: Charlie is here
  Title: Charlie warning
  Description: Charlie is a troublemaker!
  Solution: Keep a close eye on Charlie.

For more information about policy issues, see the policy documentation: https://conforma.dev/docs/policy/
Error: success criteria not met

```

Warnings are considered non-blocking.


## Adding more detail to the violation reason

```rego
# file: no-cats/main.rego

deny contains result if {
	some animal in input.animals
	animal.species == "cat"
	result := {"code": "main.no_cats", "msg": sprintf("A cat named %s was found!", [animal.name])}
}
```
```ec
$ ec validate input --file input.yaml --policy policy.yaml
Success: false
Result: FAILURE
Violations: 1, Warnings: 1, Successes: 0
Input File: input.yaml

Results:
✕ [Violation] main.no_cats
  FilePath: input.yaml
  Reason: A cat named Luna was found!

› [Warning] main.charlie_watch
  FilePath: input.yaml
  Reason: Charlie is here

For more information about policy issues, see the policy documentation: https://conforma.dev/docs/policy/
Error: success criteria not met

```


If there are multiple cats, we now get multiple different violations:

```yaml
# file: input.yaml

animals:
  - name: Charlie
    species: dog
  - name: Luna
    species: cat
  - name: Fluffy
    species: cat
```

```ec
$ ec validate input --file input.yaml --policy policy.yaml
Success: false
Result: FAILURE
Violations: 2, Warnings: 1, Successes: 0
Input File: input.yaml

Results:
✕ [Violation] main.no_cats
  FilePath: input.yaml
  Reason: A cat named Fluffy was found!

✕ [Violation] main.no_cats
  FilePath: input.yaml
  Reason: A cat named Luna was found!

› [Warning] main.charlie_watch
  FilePath: input.yaml
  Reason: Charlie is here

For more information about policy issues, see the policy documentation: https://conforma.dev/docs/policy/
Error: success criteria not met

```


## Machine readable output

Text output is the default, but you can also output json or yaml,
which includes some additional information.

```ec
$ ec validate input --file input.yaml --policy policy.yaml --info --output json
{"success":false,"filepaths":[{"filepath":"input.yaml","violations":[{"msg":"A cat named Fluffy was found!","metadata":{"code":"main.no_cats","description":"Disallow felines. To exclude this rule add \"main.no_cats\" to the `exclude` section of the policy configuration.","solution":"Please ensure no cats are present in the animal list.","title":"No cats"}},{"msg":"A cat named Luna was found!","metadata":{"code":"main.no_cats","description":"Disallow felines. To exclude this rule add \"main.no_cats\" to the `exclude` section of the policy configuration.","solution":"Please ensure no cats are present in the animal list.","title":"No cats"}}],"warnings":[{"msg":"Charlie is here","metadata":{"code":"main.charlie_watch","description":"Charlie is a troublemaker!","solution":"Keep a close eye on Charlie.","title":"Charlie warning"}}],"successes":null,"success":false,"success-count":0}],"policy":{"sources":[{"policy":["./no-cats"]}]},"ec-version":"v0.8.79","effective-time":"2026-01-13T05:30:43.860003948Z"}
Error: success criteria not met

```


## Strict vs non-strict

By default we produce a non-zero exit code if there are any
violations, which is useful to interrupt a script or a CI task. You can change
that behavior if you need to with --strict=false:

```ec
$ ec validate input --file input.yaml --policy policy.yaml > output.txt; echo "Exit code: $?"; head -3 output.txt
Error: success criteria not met
Exit code: 1
Success: false
Result: FAILURE
Violations: 2, Warnings: 1, Successes: 0

```

```ec
$ ec validate input --file input.yaml --policy policy.yaml --strict=false > output.txt; echo "Exit code: $?"; head -3 output.txt
Exit code: 0
Success: false
Result: FAILURE
Violations: 2, Warnings: 1, Successes: 0

```

