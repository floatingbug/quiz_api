function getAllQuizzes({store}){
	return (req, res)=>{
		handleRequest(store, req, res);
	}
}

async function handleRequest(store, req, res){
	let userID = "";
	const body = req.body;
	if(!body || !body.userID){
		userID = req.user.userID;
	}
	else{
		userID = body.userID;
	}

	try{
		const quizzes = await store.getAllQuizzes(userID);
		return res.json({success: true, msg: "Sent all quizzes", data: quizzes});
	}
	catch(err){
		return res.json({success: false, msg: err.message});
	}
}


module.exports = {getAllQuizzes};
