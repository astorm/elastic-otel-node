# elastic-otel-node

Quick and dirty example of an express application configured to export to open telemetry.  

To use:

    % git clone git@github.com:astorm/elastic-otel-node.git
    % npm install
    
Then, edit `src/bootstrap.js` to include your APM Secret Token and APM Server URL

    #File: src/bootstrap.js    
    // APM secretToken
    const bearerToken = '[YOUR SECRET TOKEN]'
    process.env['OTEL_EXPORTER_OTLP_HEADERS'] = `Authorization=Bearer ${bearerToken}`

    // APM Server URL
    // https://01--98.apm.us-east-1.aws.cloud.es.io:443
    const apmServerUrl = 'https://01--98.apm.us-east-1.aws.cloud.es.io:443'
    
This configures an OpenTelemetry SDK to export directly to APM Server.  In this scenario APM Server acts as an OpenTelemetry collector.         
