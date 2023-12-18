require("dotenv").config();
const express = require("express");
const api = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {checkUserAuthorization} = require("./checkUserAuthorization");
const {validateUserInput} = require("./validateUserInput");
const {addQuiz} = require("./src/routes/addQuiz");
const {getQuiz} = require("./src/routes/getQuiz");
const {signUp} = require("./src/routes/signUp");
const {loginUser} = require("./src/routes/loginUser");


function createApi({store}){
	api.use(bodyParser.json());
	api.use(cors({
		origin: true,
		credentials: true
	}));
	
	//validate user input
	api.use("/", validateUserInput);

	//check authorization if api-calls made
	api.use("/", checkUserAuthorization({jwt}));
	
	//routes
	api.post("/sign-up", signUp({store}));
	api.get("/add-quiz", addQuiz({store})); 
	api.get("/get-quiz", getQuiz({store}));

	return api;
}


module.exports = {createApi};
