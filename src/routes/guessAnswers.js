function guessAnswers({store}){
	return (req, res)=>{
		requestHandler(req, res, store);
	}
}

async function requestHandler(req, res, store){
	if(!req.query || ! req.query.id){
		res.json({success: false, msg: "id of quiz is needed"});
		return
	}

}


module.exports = {guessAnswers};
