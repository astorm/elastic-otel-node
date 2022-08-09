'use strict';
require('./src/bootstrap.js')
const express = require('express')
const app = express()
const port = 3000
const api = require("@opentelemetry/api");


app.get('/', (req, res) => {
  console.log(api.context._getContextManager().active())
  // const tracer = api.trace.getTracer('foo')
  // const span = tracer.startSpan('test')
  // console.log(span)
  res.send('hello world')
})

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.get('/test-remote-context', (req, res) => {
  const https = require('http')
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/hello',
    method: 'GET'
  }
  const httpReq = https.request(options, httpRes => {
    console.log(`statusCode: ${res.statusCode}`)

    const data = []
    httpRes.on('data', d => {
      data.push(d)
    })

    httpRes.on('end', () => {
      res.end(data.join(''))
    })
  })

  httpReq.on('error', error => {
    console.error(error)
  })

  httpReq.end()

  // res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
