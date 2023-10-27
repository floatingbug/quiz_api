const express = require("express");
const api = express();

function createApi(){
	api.get("/", (req, res)=>{
		res.send("null")
	});

	return api;
}


module.exports = {createApi};
