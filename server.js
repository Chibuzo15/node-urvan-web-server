const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = 3000

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log("Unable to append to server.log.")
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screenIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send({
    //     name: 'Andrew',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // });
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMssg: 'Welcome to Urvan Home'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

// bad - send back json with errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to handle request"
    });
});

app.get('/maintenance', (req, res) => {
    res.render('maintenance.hbs')
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))