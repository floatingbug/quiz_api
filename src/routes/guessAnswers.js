function guessAnswers({store}){
	return (req, res)=>{
		requestHandler(req, res, store);
	}
}

async function requestHandler(req, res, store){
	if(!req.query || ! req.query.id){
		return res.json({success: false, msg: "id of quiz is needed"});
	}
	if(!req.body || !req.body.guessedAnswers){
		return res.json({success: false, msg: "answers is needed"});
	}
	if(!req.body.quizOwner){
		return res.json({success: false, msg: "name of quiz owner is needed"});
	}
	if(!req.body.quizTitle){
		return res.json({success: false, msg: "quizTitle of quiz is needed"});
	}

	const quizOwner = req.body.quizOwner;
	const quizID = req.query.id;
	const guesserID = req.user.userID;
	const guesserName = req.user.name;
	const guessedAnswers = req.body.guessedAnswers;
	const quizTitle = req.body.quizTitle;
	const answers = [];

	//get answers from quiz
	try{
		const result = await store.getQuiz(quizID);
		if(!result){
			return res.json({success: false, msg: "Quiz with given id not existing"});
		}
		for(answer of result.quiz){
			answers.push(answer.madeAnswer);
		}
		console.log(answers);
	}
	catch(err){
		return res.json({success: false, msg: err.message});
	}

	//store guessed answers
	try{
		const result = await store.guessAnswers(quizTitle, quizOwner, quizID, guesserName, guesserID, guessedAnswers, answers);
		if(!result.acknowledged){
			return res.json({success: false, msg: "Fail to store answers on DB"});
		}
	}
	catch(err){
		return res.json({success: false, msg: err.message});
	}

	res.json({success: true, msg: "Answers have been stored in DB"});
}


module.exports = {guessAnswers};
