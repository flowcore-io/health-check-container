# Simple Health Check Image

A simple service that responds to the /health endpoint depending on how it is configured.

## Configuration

environment variables that can be set to configure the service


| Environment Variable | Description | Type | Default Value | Required |
|----------------------|-------------|:----:|---------------|:--------:|
| PORT | The port the service will listen on | `number` | `3000` | |
| LOG_LEVEL | The log level the service will log at | `string` | `info` | |
| LOG_PRETTY_PRINT | Whether the logs should be pretty printed | `boolean` | `true` | |
| HEALTH_ENDPOINT | The endpoint that will return the health status | `string` | `health` | |
| HEALTH_CHECK_DELAY   | The delay in ms before the health check will return | `number` | `0` | |
| SHOULD_PASS_HEALTH_CHECK | Whether the health check should pass or fail | `boolean` | `true` | |
| SHOULD_THROW_ERROR_ON_HEALTH_CHECK | Whether the health check should throw an error | `boolean` | `false` | |