function registrateUser({store, jwt}){
	return async (req, res)=>{
		const secret = process.env.JWT_SECRET;

		const token = jwt.sign(
			{
				name: "tom", 
				password: "k",
				userRank: 1
			},
			secret
		);

		res.json({token})
	}
}


module.exports = {registrateUser};
