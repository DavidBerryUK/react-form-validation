# Rule Processors

Rules are what determine if a field is valid. They are attached to a schema definition.

For a field to be valid, all rules attached to it must pass.

Rules are generally 'optional', e.g. if no data is passed into them they will passed with a favourable result.

If a field is mandatory, then the **RuleMandatory()** should be added, This will then force the other rules to be evaluated once content is available.

Each rule should have unit tests, and be optomised to run fast as they are executed very frequently.
