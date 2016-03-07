var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');

var app = express();
var port = 3000;
var db = mongojs('bird-sightings');
var collection = db.collection("sightings");
var ObjectId = mongojs.ObjectId;


app.use(bodyParser.json());

app.post('/api/sighting', function(req, res, next) {
	console.log(req.body);
	collection.insert(req.body, function(err, response) {
		console.log(response);
	})
	return res.status(200).send("POST");
});
app.get('/api/sighting', function(req, res, next) {
	console.log('get');
	collection.find({name: req.query.name}, function(err, sighting) {
		return res.status(200).send(sighting);
	});
	
});
app.put('/api/sighting', function(req, res, next) {
	console.log('put')
	collection.update({_id: ObjectId(req.query.id)}, {$set:  req.body}, function(err, response) {
		console.log(response);
		return res.status(200).send(response);
	});
});
 
app.delete('/api/sighting', function(req, res, next) {
	console.log('delete')
	collection.remove({_id: ObjectId(req.query.id)}, function(err, response) {
		return res.status(200).send(response);
	});
});



app.listen(port, function() {
	//console.log('listening')
});