function checkUserAuthorization({jwt}){
	return async (req, res, next)=>{
		let decoded = null;
		const secret = process.env.JWT_SECRET;
		const token = req.headers["authorization"];

		//validation
		if(req.path === "/add-quiz" && token){
			decoded = await validateToken({jwt, token, secret});
		}
		else{
			next();
		}
		
		//if validation is successful, then proceed with the request
		if(decoded){
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
