function validateUserInput(req, res, next){
	let isPass = true;

	switch(req.path){
		case "/login": validateLogin(req, res, isPass);
			break;
		case "/registration": validateRegistration(req, res, isPass);
			break;
	}

	if(!isPass){
		return
	}

	next();
}

function validateLogin(req, res, isPass){
	if(!req.body){
		res.json({code: 1, msg: "credentials missed"});
		return
	}
	if(!req.body.name && !req.body.email || !req.body.password){
		res.json({code: 1, msg: "name or email is needed"});
		return
	}
	isPass = false;
}

function validateRegistration(req, res, isPass){
	if(!req.body){
		res.json({code: 1, msg: "credentials missed"});
		return
	}
	if(!req.body.name || !req.body.email || !req.body.password){
		res.json({code: 1, msg: "name, email and password is needed"});
		return
	}
	isPass = false;
}


module.exports = {validateUserInput};
