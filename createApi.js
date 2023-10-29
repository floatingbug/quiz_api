const express = require("express");
const api = express();
const {addQuiz} = require("./src/routes/addQuiz");

function createApi({store}){
	api.get("/add-quiz", addQuiz({store})); 

	return api;
}


module.exports = {createApi};
