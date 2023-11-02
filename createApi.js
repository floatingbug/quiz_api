const express = require("express");
const api = express();
const bodyParser = require("body-parser");
const {addQuiz} = require("./src/routes/addQuiz");
const {getQuiz} = require("./src/routes/getQuiz");
const {loginUser} = require("./src/routes/loginUser");

function createApi({store}){
	api.use(bodyParser.json());
	api.use("/login", validateUserInput);

	api.post("/login", loginUser({store}));
	api.get("/add-quiz", addQuiz({store})); 
	api.get("/get-quiz", getQuiz({store}));

	return api;
}

function validateUserInput(req, res, next){
	const MAX_LOGIN_ATTEMPTS = 10;
	const LOCK_TIME = 5*60*1000;
	const loginAttempts = {};

	if(!req.body){
		res.json({code: 1, msg: "credentials missed"});
		return
	}
	if(!req.body.name && !req.body.email){
		res.json({code: 1, msg: "name or email is needed"});
		return
	}

	next();
}


module.exports = {createApi};
