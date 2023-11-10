require("dotenv").config();
const express = require("express");
const api = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const {checkUserAuthorization} = require("./checkUserAuthorization");
const {validateUserInput} = require("./validateUserInput");
const {addQuiz} = require("./src/routes/addQuiz");
const {getQuiz} = require("./src/routes/getQuiz");
const {registrateUser} = require("./src/routes/registrateUser");
const {loginUser} = require("./src/routes/loginUser");


function createApi({store}){
	api.use(bodyParser.json());
	
	//validate user input
	api.use("/", validateUserInput);

	//check authorization if api-calls made
	api.use("/", checkUserAuthorization({jwt}));
	
	//routes
	api.post("/registration", registrateUser({store, jwt}));
	api.get("/add-quiz", addQuiz({store})); 
	api.get("/get-quiz", getQuiz({store}));

	return api;
}


module.exports = {createApi};
