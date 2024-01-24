#show commands
if [ $# -eq 0 ]; then
	echo "signUp: create a new user"
	echo "addQuiz: add a new quiz to db"
	exit 0
fi

#sign up a user
if [ $1 == "signUp" ]; then
	curl -v -H "content-type: application/json" -d '{"name": "tom", "email": "thomas.hof1984@gmail.com", "password": "k"}' http://127.0.0.1:3000/sign-up -w "\n"

#sign in a user
elif [ $1 == "signIn" ]; then
	curl -v -H "content-type: application/json" -d '{"name": "tom", "email": "thomas.hof1984@gmail.com", "password": "k"}' http://127.0.0.1:3000/sign-in -w "\n"

#add quiz
elif [ $1 == "addQuiz" ]; then
	curl -v -X POST -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidG9tIiwiZW1haWwiOiJ0aG9tYXMuaG9mMTk4NEBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImsiLCJpYXQiOjE3MDQzNTk2ODV9.vO7ttrElewTXRL0iMBWjKCBl8Lb1DkvVrkC10-161Fk"\
	http://127.0.0.1:3000/add-quiz -w "\n"
elif [ $1 == "getQuiz" ]; then
	if [ ! $# -ge 2 ]; then
		echo "getQuiz requires a quiz-id"
		exit 1
	fi
	curl -v -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidG9tIiwiZW1haWwiOiJ0aG9tYXMuaG9mMTk4NEBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImsiLCJpYXQiOjE3MDQzNTk2ODV9.vO7ttrElewTXRL0iMBWjKCBl8Lb1DkvVrkC10-161Fk"\
	http://127.0.0.1:3000/get-quiz?id=$2 -w "\n"
fi
