const {randomUUID} = require("crypto");
const quizArray = [];

function createStore(){
	const store = {
		addQuiz,
		getQuiz,
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
	quizArray
}


module.exports = {createStore};
