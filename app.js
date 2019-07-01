var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	shortlink = require('./models/shortlinkModel'),
	bodyParser = require('body-parser');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/shortlinkdb');

app.get('/', (req, res) => {
    res.send('hello world');
    res.end();
});

app.get('/shortlinks', (req, res) => {
	shortlink.listAll((err, shortlinks) => {
		if(err)
			throw err;
		res.json(shortlinks);
	});
});

app.post('/shortlinks', (req, res) => {
	var link = req.body;
	shortlink.createShortlink(link, (err, link) => {
		if(err)
			throw err;
		res.json(link);
	});
});

app.put('/shortlinks/:_slug', (req, res) => {
	var slug = req.params._slug;
	var link = req.body;
	shortlink.updatelink(slug, link, {}, (err, link) => {
		if(err)
			throw err;
		res.json(link);
	});
});


app.listen(port, ()=>console.log('listening on port'));