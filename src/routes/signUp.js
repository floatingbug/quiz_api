const nodemailer = require("nodemailer");

function signUp({store}){
	return handleRequest.bind(null, store);
}

async function handleRequest(store, req, res){
	const credentials = {
		name: req.body.name.replace(/\s/g, ""),
		email: req.body.email.replace(/\s/g, ""),
		password: req.body.password.replace(/\s/g, "")
	};

	//check if user allready exists in db
	try{
		const result = await store.checkIfUserExists(credentials);
	
		if(result){
			return res.json({success: false, msg: "This user allready signed up"});
		}
	}
	catch(err){
		return res.json({success: false, msg: err});
	}


	//add user to db.
	try{
		const result = await store.signUp(credentials);
		
		if(result.insertedCount === 0){
			return res.json({success: false, msg: "Sign up user failed. Try again later"});
		}
	}
	catch(err){
		return res.json({success: false, msg: err});
	}

	//get confirmationcode
	let confirmationcode = "";
	try{
		const result = await store.checkIfUserExists(credentials);
		if(!result){
			return res.json({success: false, msg: "Sign up user failed. Try again later"});
		}
		confirmationcode = result.confirmationcode;
	}
	catch(err){
		return res.send({success: false, msg: err});
	}

	//send confirm email.
	try{
		const result = await sendEmail(credentials.email, confirmationcode);
	}
	catch(err){
		return res.json({success: false, msg: "Sending confirmation E-mail failed"});
	}

	res.json({success: true, msg: "Please confirm your e-mail"});
}

async function sendEmail(email, confirmationcode){
	const SERVER_URL = process.env.SERVER_URL;
	const EMAIL_ADRESS = process.env.EMAIL_ADRESS;
	const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
	
	const transporter = nodemailer.createTransport({
    service: 'gmail',
		auth: {
			user: EMAIL_ADRESS, 
			pass: EMAIL_PASSWORD
		}
	});
	const confLink = `${SERVER_URL}/confirm-email?confirmationcode=${confirmationcode}`;
	const mailOptions = {
		from: 'thomas.hof1984@gmail.com',
		to: email,
		subject: 'Confirmation for GuessMate',
		text: `Please click on the follow link to confirm your accound: ${confLink}`
	};
	
	try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-Mail has sent:', info.response);
    } catch (error) {
        console.error('Failed to send E-Mail:', error);
		throw new Error();
    }
}


module.exports = {signUp};
