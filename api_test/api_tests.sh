#register a user
if [ $1 == "register" ]; then
	curl -v -H "content-type: application/json" -d '{"name": "tom", "email": "bli@bla.blob", "password": "k"}' http://127.0.0.1:8000/registration -w "\n"
#add quiz
elif [ $1 == "addQuiz" ]; then
	curl -v -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidG9tIiwicGFzc3dvcmQiOiJrIiwidXNlclJhbmsiOjEsImlhdCI6MTY5OTYxMTE4OH0.RLMnnLeZNk-ROJYQHHZFczcfsRfOnmJu_HYNFPYc52s"\
	http://127.0.0.1:8000/add-quiz -w "\n"
elif [ $1 == "getQuiz" ]; then
	if [ $2 == "" ]; then
		echo "getQuiz command requires a quiz-id as parameter"
		return
	fi
	curl -v -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidG9tIiwicGFzc3dvcmQiOiJrIiwidXNlclJhbmsiOjEsImlhdCI6MTY5OTYxMTE4OH0.RLMnnLeZNk-ROJYQHHZFczcfsRfOnmJu_HYNFPYc52s"\
	http://127.0.0.1:8000/get-quiz?id=$2
fi
