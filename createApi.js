const express = require("express");
const api = express();
const bodyParser = require("body-parser");
const {addQuiz} = require("./src/routes/addQuiz");
const {getQuiz} = require("./src/routes/getQuiz");

function createApi({store}){
	api.use(bodyParser.json());

	api.get("/add-quiz", addQuiz({store})); 
	api.get("/get-quiz", getQuiz({store}));

	return api;
}


module.exports = {createApi};
