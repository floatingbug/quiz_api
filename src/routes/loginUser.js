function loginUser({store, jwt}){
	return async (req, res)=>{
		console.log(req.headers.authorization);
		res.send(req.headers.authorization);
	}
}


module.exports = {loginUser};
