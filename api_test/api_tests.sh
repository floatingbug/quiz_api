#show commands
if [ $# -eq 0 ]; then
	echo "register: create a new user"
	echo "addQuiz: add a new quiz to db"
	exit 0
fi
#register a user
if [ $1 == "register" ]; then
	curl -v -H "content-type: application/json" -d '{"name": "tom", "email": "bli@bla.blob", "password": "k"}' http://127.0.0.1:8000/registration -w "\n"
#add quiz
elif [ $1 == "addQuiz" ]; then
	curl -v -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidG9tIiwiZW1haWwiOiJibGlAYmxhLmJsb2IiLCJwYXNzd29yZCI6ImsiLCJpYXQiOjE3MDAzMDIwNDF9.enBu6phT6w9XfeW-_a97jItKKDWUAYGkmq3ZjaLl5L0"\
	http://127.0.0.1:8000/add-quiz -w "\n"
elif [ $1 == "getQuiz" ]; then
	if [ ! $# -ge 2 ]; then
		echo "getQuiz requires a quiz-id"
		exit 1
	fi
	curl -v -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidG9tIiwiZW1haWwiOiJibGlAYmxhLmJsb2IiLCJwYXNzd29yZCI6ImsiLCJpYXQiOjE3MDAzMDIwNDF9.enBu6phT6w9XfeW-_a97jItKKDWUAYGkmq3ZjaLl5L0"\
	http://127.0.0.1:8000/get-quiz?id=$2 -w "\n"
fi
