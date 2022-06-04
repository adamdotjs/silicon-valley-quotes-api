const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
const characters = require(__dirname + '/data/characters.json');

app.use(cors());

const randomIndex = (obj) => Math.floor(Math.random() * obj.length);

app.get('/', (req, res) => {
	res.send(characters);
});

app.get('/api/all', (req, res) => {
	res.send(characters);
});

app.get('/api/random', (req, res) => {
	const randomCharacter = characters[randomIndex(characters)];
	res.send(randomCharacter.quotes[randomIndex(randomCharacter.quotes)]);
});

app.get('/api/character/:character/all', (req, res) => {
	const character = req.params.character.toLowerCase();
	const charIndex = characters.findIndex((char) => char.name.toLowerCase() === character);
	res.send(characters[charIndex].quotes);
});

app.get('/api/character/:character/random', (req, res) => {
	const character = req.params.character.toLowerCase();
	const charIndex = characters.findIndex((char) => char.name.toLowerCase() === character);
	res.send(characters[charIndex].quotes[randomIndex(characters[charIndex].quotes)]);
});

app.listen(PORT, () => {
	console.log('running on port 8000');
});
