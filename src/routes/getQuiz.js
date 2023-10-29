function getQuiz({store}){
	return async (req, res)=>{
		const quizId = req.query.id;
		const result = await store.getQuiz({quizId});

		res.json(result);
	}
}


module.exports = {getQuiz};
