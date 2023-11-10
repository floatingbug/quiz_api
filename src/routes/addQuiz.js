function addQuiz({store}){
	return async (req, res)=>{
		const quizData = {
			creator: "tom",
		}
		const result = await store.addQuiz(quizData);

		res.json(result);
	}
}


module.exports = {addQuiz};
