function addQuiz({store, user}){
	return async (req, res)=>{
		//check if user allready has created a quiz
		const isQuizExisting = await store.isQuizExisting(req.user.email);
		if(isQuizExisting){
			return res.json({msg: "quiz allready exists"});
		}

		const quizData = {
			creator: req.user.name,
			email: req.user.email
		}
		const result = await store.addQuiz(quizData);

		res.json(result);
	}
}


module.exports = {addQuiz};
