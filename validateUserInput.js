function validateUserInput(req, res, next){
	let isUserInputCorrect = false;

	switch(req.path){
		case "/sign-in": isUserInputCorrect = validateSignIn(req);
			break;
		case "/sign-up": isUserInputCorrect = validateSignUp(req); 
			break;
		default:
			return next();
	}

	if(!isUserInputCorrect){
		return res.json({success: false, msg: "Invalid user input"});
	}

	next();
}

function validateSignIn(req){
	if(!req.body){
		return false;
	}
	if(!req.body.name && !req.body.email || !req.body.password){
		return false;
	}

	return true;
}

function validateSignUp(req){
	if(!req.body){
		return false;
	}
	if(!req.body.name || !req.body.email || !req.body.password){
		return false;
	}
	if(typeof req.body.name != "string" || typeof req.body.email != "string" || typeof req.body.password != "string"){
		return false
	}

	return true;
}


module.exports = {validateUserInput};
