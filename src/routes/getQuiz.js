function getQuiz({store}){
	return (req, res)=>{
		handleRequest(req, res, store);
	}
}

async function handleRequest(req, res, store){
	if(!req.query || !req.query.id){
		res.json({success: false, msg: "id for quiz is needed"});
		return
	}
	const id = req.query.id;

	try{
		const result = await store.getQuiz(id);
		return res.json({success: true, msg: "Sent quiz data", data: result});
	}
	catch(err){
		return res.json({success: false, msg: err});
	}
}


module.exports = {getQuiz};
