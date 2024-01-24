function addQuiz({store}){
	return (req, res)=>{
		handleRequest(req, res, store);
	}
}

async function handleRequest(req, res, store){
	const body = req.body;

	//---Validation---//
	if(!body || !body.title || !body.quiz){
		res.json({success: false, msg: "Title and quiz are required"});
		return;
	}
	
	const userID = req.user.userID;
	const creator = req.user.name;
	const title = req.body.title;
	const quiz = req.body.quiz;
	
	// if(!checkQuizStructure(quiz)){
	// 	return res.json({success: false, msg: "Invalid quiz-structure"});
	// }
	
	//check if user has allready 4 quizzes (max. of quizzes is 4)
	try{
		const quizCount = await store.countQuizzes(userID);
		if(quizCount >= 4){
			return res.json({success: false, msg: "This user has allready 4 quizzes"});
		}
	}
	catch(err){
		return res.json({success: false, msg: err.message});
	}

	//---add quiz---//
	try{
		const result = await store.addQuiz({creator, userID, title, quiz});
		if(!result.acknowledged){
			return res.json({success: false, msg: "Adding quiz has been failed"});
		}
	}
	catch(err){
		return res.json({success: false, msg: err});
	}

	return res.json({success: true, msg: "Quiz has been successfully added"});
}


module.exports = {addQuiz};


function checkQuizStructure(quiz){
	if(!Array.isArray(quiz) || quiz.length > 4){
		return false;
	}
	return true;
}
