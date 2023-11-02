function loginUser({store}){
	return async (req, res)=>{
		const result = store.isValidCredentials(req.body);
		res.send(result);
	}
}


module.exports = {loginUser};
