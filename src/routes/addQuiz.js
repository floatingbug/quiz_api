function addQuiz({store}){
	return async (req, res)=>{
		const quizData = {
			creator: "tom",
		}
		const result = await store.addQuiz(quizData);
		console.log(result);

		res.json(result);
	}
}


module.exports = {addQuiz};
