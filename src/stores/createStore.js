const {randomUUID} = require("crypto");
const quizArray = [];
const users = [
	{
		name: "tom",
		email: "dia@blo.hell",
		password: "k"
	}
]

function createStore(){
	const store = {
		addQuiz,
		getQuiz,
		isValidCredentials,
		boo,
	};

	return store;
}

function boo(){
	console.log("boo");
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

async function addQuiz(quizData){
	const quiz = {
		id: randomUUID(),
		creator: quizData.creator,
	}

	quizArray.push(quiz)

	return quiz;
}

async function getQuiz({quizId}){
	const quiz = quizArray.find(quiz => quiz.id == quizId);

	return quiz;
}


module.exports = {createStore};
