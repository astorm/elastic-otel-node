const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { OTLPTraceExporter } =  require('@opentelemetry/exporter-otlp-grpc');
const core = require("@opentelemetry/core");
const fs = require('fs')
const grpc = require('@grpc/grpc-js');

// APM secretToken
const bearerToken = '[YOUR SECRET TOKEN]'
process.env['OTEL_EXPORTER_OTLP_HEADERS'] = `Authorization=Bearer ${bearerToken}`

// APM Server URL
// 'https://--98.apm.us-east-1.aws.cloud.es.io:443'
const apmServerUrl = 'https://01--98.apm.us-east-1.aws.cloud.es.io:443'

const collectorOptions = {
  url: apmServerUrl, // url is optional and can be omitted - default is http://localhost:55681/v1/trace
  credentials: grpc.credentials.createSsl(),
};

const provider = new NodeTracerProvider();

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);

provider.addSpanProcessor(
  new SimpleSpanProcessor(
    new OTLPTraceExporter(collectorOptions)
  )
);

provider.register();

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});
