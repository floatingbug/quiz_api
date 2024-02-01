function checkUserAuthorization({jwt}){
	return async (req, res, next)=>{
		const secret = process.env.JWT_KEY;
		const token = req.headers["authorization"];
		let decoded = null;
		console.log("------------->", token)

		//if user access secure ressource then validation else return next
		switch(req.path){
			case "/add-quiz": decoded = await validateToken({jwt, token, secret});
				break;
			case "/get-quiz": decoded = await validateToken({jwt, token, secret});
				break;
			case "/get-all-quizzes": decoded = await validateToken({jwt, token, secret});
				break;
			case "/guess-answers": decoded = await validateToken({jwt, token, secret});
				break;
			case "/get-guessed-answers": decoded = await validateToken({jwt, token, secret});
				break;
			default: return next();
		}

		if(!decoded){
			return res.json({success: false, msg: "Ressource need a valid jwt"});
		}

		req.user = decoded;
		next();
	};
}


async function validateToken({jwt, token, secret}){
	if(!token){return false}

	try{
		return await jwt.verify(token, secret);
	}
	catch(error){
		console.log("fail to validate JWT: ", error);
		return false;
	}
};


module.exports = {checkUserAuthorization};
