function loginUser({store}){
	return async (req, res)=>{
		const user = {
			name: "",
			email: "",
			password: req.body.password
		};
		
		if(req.body.email){
			user.email = req.body.email;
		}
		else{
			user.name = req.body.name
		}

		const await result = store.isValidCredentials(user);
	}
}


module.exports = {loginUser};
