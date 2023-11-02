const {randomUUID} = require("crypto");
const quizArray = [];

function createStore(){
	const store = {
		addQuiz,
		getQuiz,
		isValidCredentials,
	};

	return store;
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

async function isValidCredentials(user){

}


module.exports = {createStore};
