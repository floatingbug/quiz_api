const {randomUUID} = require("crypto");
const quizArray = [];
const users = [
	{
		name: "testUser",
		email: "testUser@test.de",
		password: "test",
		participating: []
	}
]

function createStore(){
	const store = {
		addQuiz,
		getQuiz,
		isValidCredentials,
		isQuizExisting,
		signUp,
	};

	return store;
}

async function signUp(credentials){
	users.push(credentials);

	return {success: true, message: "Please confirm your E-mail"};
}

function isValidCredentials(credentials){
	const result = users.find((user)=>{
		if((user.name === credentials.name || user.email === credentials.email) && 
			user.password === credentials.password){
			return user;
		}
	});

	return result;
}

function isQuizExisting(email){
	let isQuizExists = false;

	isQuizExists = quizArray.find(
		(quiz)=>{
			if(quiz.email === email){
				return true;
			}
		}
	);

	return isQuizExists;
}

async function addQuiz(quizData){
	const quiz = {
		id: randomUUID(),
		creator: quizData.creator,
		email: quizData.email,
		participants: []
	}

	quizArray.push(quiz)

	return quiz;
}

async function getQuiz({quizId}){
	const quiz = quizArray.find(quiz => quiz.id == quizId);

	return quiz;
}


module.exports = {createStore};
