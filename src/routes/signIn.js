function signIn({store, jwt}){
	return handleRequest.bind(null, store, jwt);
}

async function handleRequest(store, jwt, req, res){
	const credentials = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	};
	let user = {};

	//check if credentials are correct
	try{
		const result = await store.checkCredentials(credentials);
		if(!result){
			return res.json({success: false, msg: "Wrong name or password"});
		}
		user = result;
	}
	catch(err){
		return res.json({success: false, msg: err});
	}

	//create jwt
	const token = jwt.sign(user, process.env.JWT_KEY);
	res.json({token});
}


module.exports = {signIn};
