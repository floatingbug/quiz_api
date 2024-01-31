function confirmEmail({store}){
	return handleRequest.bind(null, store);
}

async function handleRequest(store, req, res){
	if(req.query.confirmationcode){
		const confirmationcode = req.query.confirmationcode;
		
		try{
			const result = await store.confirmEmail(confirmationcode);
			
			if(result.modifiedCount === 0){
				return res.json({success: false, msg:"Confirm e-mail failed"});
			}
		
			return res.redirect(process.env.SERVER_URL);
		}
		catch(err){
			return res.json({success: false, msg: err});
		}
	}
}


module.exports = {confirmEmail};
