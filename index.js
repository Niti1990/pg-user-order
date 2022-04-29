const express = require('express');
const app = express();
// const dotenv = require('dotenv');
// dotenv.config();
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
	// user: 'wfmftpkl',
	// host: 'tai.db.elephantsql.com',
	// database:'wfmftpkl',
	// password: '7biRqqJSOfI6fcG6Pcm_KFHEbP0Oq7S3',
	// port: 5432,
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_Database,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT,
});
//READ
app.get('/', (req, res) => {
	pool
		.query('SELECT * FROM users ')
		.then((data) => res.json(data.rows))
		.catch((e) => res.sendStatus(404));
});
app.get('/:id', (req, res) => {
	const { id } = req.params; // we retrieve the id from the url
	pool
		.query('SELECT * FROM users WHERE id=$1;', [id]) // we inject the id in the request
		.then((data) => res.json(data.rows)) //we can send the data as a  JSON
		.catch((e) => res.sendStatus(404)); // IN case of problem we sne dan HTTP code
});
// CREATE
app.post('/', (req, res) => {
	const { name } = req.body; // we retrieve the id from the form (body-parser)
	pool
		.query('INSERT INTO users(name) values($1) RETURNING *;', [name]) // we inject the name in the request
		.then((data) => res.status(201).json(data))
		.catch((e) => res.sendStatus(404));
});

app.listen('3000', () => {
	console.log('connected');
});
