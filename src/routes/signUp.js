function signUp({store}){
	return async (req, res)=>{
		const credentials = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		};

		const result = await store.signUp(credentials);

		res.json(result);
	}
}


module.exports = {signUp};
