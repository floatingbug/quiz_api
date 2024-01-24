const {MongoClient} = require("mongodb");
const {randomUUID} = require("crypto");

function createStore(){
	const client = new MongoClient(process.env.DB_URL);
	const guessMate = client.db("guessMate");
	
	const store = {
		SERVER_ERROR: "Server can't access the db properly",
		isEmailConfirmd: false,
		confirmEmail,
		guessMate, //database
		client, //client for creating and closing db-connections
		signUp,
		checkIfUserExists,
		checkCredentials,
		addQuiz,
		countQuizzes,
		getQuiz,
		getAllQuizzes,
		printError,
	};

	return store;
}

async function signUp(credentials){
	try{
		await this.client.connect();
		const collUser = this.guessMate.collection("user");
		const doc = {
			userID: randomUUID(),
			name: credentials.name,
			email: credentials.email,
			password: credentials.password,
			confirmationcode: randomUUID(),
			isEmailConfirmed: false,
		};

		return await collUser.insertOne(doc);
	}
	catch(err){
		this.printError(err);
		throw new Error(this.SERVER_ERROR);
	}
	finally{
		await this.client.close();
	}
}

async function checkIfUserExists({email}){
	try{
		await this.client.connect();
		const collUser = this.guessMate.collection("user");
		const query = {email};
		
		return await collUser.findOne(query);
	}
	catch(err){
		this.printError(err);
		throw new Error(this.SERVER_ERROR);
	}
	finally{
		await this.client.close();
	}
}

async function confirmEmail(confirmationcode){
	try{
		await this.client.connect();
		const collUser = this.guessMate.collection("user");
		const filter = {confirmationcode};
		const updateDoc = {$set:{isEmailConfirmed: true}};
		
		return await collUser.updateOne(filter, updateDoc);
	}
	catch(err){
		printError(err);
		throw new Error(this.SERVER_ERROR);
	}
	finally{
		this.client.close();
	}
}

async function checkCredentials(credentials){
	try{
		await this.client.connect();
		const collUser = this.guessMate.collection("user");
		const query = {
			$or: [
				{email: credentials.email, password: credentials.password},
				{name: credentials.name, password: credentials.password}
			]
		};
		return await collUser.findOne(query);
	}
	catch(err){
		printError(err);
		throw new Error(this.SERVER_ERROR);
	}
	finally{
		this.client.close();
	}
}

async function addQuiz({creator, title, quiz, userID}){
	try{
		await this.client.connect();
		const collQuizzes = this.guessMate.collection("quizzes");
		const doc = {
			id: randomUUID(),
			userID,
			creator,
			title,
			quiz,
		};

		return await collQuizzes.insertOne(doc);
	}
	catch(err){
		printError(err);
		throw new Error(this.SERVER_ERROR);
	}
	finally{
		await this.client.close();
	}
}

async function countQuizzes(userID){
	const collQuizzes = this.guessMate.collection("quizzes");
	const query = {userID};

	try{
		await this.client.connect();
		return await collQuizzes.countDocuments(query);
	}
	catch(err){
		printError(err);
		throw new Error(this.SERVER_ERROR);
	}
	finally{
		await this.client.close();
	}
}

async function getQuiz(id){
	const collQuizzes = this.guessMate.collection("quizzes");
	const query = {id};

	try{
		await this.client.connect();
		return await collQuizzes.findOne(query);
	}
	catch(err){
		printError(err);
		throw new Error(this.SERVER_ERROR);
	}
	finally{
		await this.client.close();
	}
}

async function getAllQuizzes(userID){
	const collQuizzes = this.guessMate.collection("quizzes");
	const query = {userID};
	let quizzes = [];

	try{
		await this.client.connect();
		const quizzesCursor = await collQuizzes.find(query);
		for await (const doc of quizzesCursor){
			quizzes.push(doc); 
		}
		return quizzes;
	}
	catch(err){
		printError(err);
		throw new Error(this.SERVER_ERROR);
	}
	finally{
		await this.client.close();
	}
}

function printError(err){
	console.log("Error in file: createStore.js", err);
}


module.exports = {createStore};
