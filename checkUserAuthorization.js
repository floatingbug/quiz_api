function checkUserAuthorization({jwt}){
	return async (req, res, next)=>{
		let decoded = null;
		const secret = process.env.JWT_SECRET;
		const token = req.headers["authorization"];

		//if user access secure ressource then validation else return next
		if(req.path === "/add-quiz" && token){
			decoded = await validateToken({jwt, token, secret});
		}
		else{
			return next();
		}
		
		//if validation is successful, save user and proceed with the request
		if(decoded){
			req.user = decoded;
			next();
		}
		else{
			res.status(401).json({error: "unauthorized"});
		}
	};
}

async function validateToken({jwt, token, secret}){
	let decoded = undefined;

	try{
		decoded = await jwt.verify(token, secret);
	}
	catch(error){
		console.log("fail to validate JWT: ", error);
	}
	return decoded;
};


module.exports = {checkUserAuthorization};
