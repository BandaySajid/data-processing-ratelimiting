const express = require('express');
const fs = require('fs');
const ratelimit = require('express-rate-limit');

const PORT = process.env.PORT || 3000;

const limiter = ratelimit({
    windowMs : 1000, //each 1 second,
    max : 100, //max 10 requests per second,
    standardHeaders : true, // returns rate limit info in `RateLimit-*` headers
    legacyHeaders : false // disabling the `X-RateLimit-*` headers
})

const app = express();
app.use(express.json());
app.use(limiter);


const output = fs.createWriteStream('output.ndjson')


app.post('/', async(req, res)=>{
    console.log(req.body)
    output.write(JSON.stringify(req.body) + "\n");
    res.status(200).json({
        status : 'cool',
        data : req.body
    });
});

app.listen(PORT, ()=>{
    console.log('server is up on ' + PORT);
});
