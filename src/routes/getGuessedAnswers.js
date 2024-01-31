function getGuessedAnswers({store}){
	return (req, res)=>{
		requestHandler(req, res, store);
	}
}

async function requestHandler(req, res, store){
	const userID = req.user.userID;

	try{
		const result = await store.getGuessedAnswers();
		if(result.length <= 0){
			return res.json({success: false, msg: "No guessed answers found"});
		}
		res.json({success: true, msg: "Sent guessed answers", data: result});
	}
	catch(err){
		res.json({success: false, msg: err});
	}
}


module.exports = {getGuessedAnswers};
