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
const {signIn} = require("./src/routes/signIn");
const {confirmEmail} = require("./src/routes/confirmEmail");
const {getAllQuizzes} = require("./src/routes/getAllQuizzes");
const {guessAnswers} = require("./src/routes/guessAnswers");


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
	api.post("/sign-in", signIn({store, jwt}));
	api.get("/confirm-email", confirmEmail({store}));
	api.post("/add-quiz", addQuiz({store})); 
	api.get("/get-quiz", getQuiz({store}));
	api.get("/get-all-quizzes", getAllQuizzes({store}));
	api.get("/guess-answers", guessAnswers({store}));

	return api;
}


module.exports = {createApi};
