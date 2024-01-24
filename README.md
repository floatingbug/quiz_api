# API-Documentation

---
## Endpoints:
- /user
	- GET: Fetch all users

- /user/{id}
	- GET: Fetch a specific user
	- PUT: Update a specific user
	- DELETE: Delete a specific user


- /sign-up
	- POST: Sign up a new user

- /sign-in
	- POST: Sign in a new user

- /get-quiz
	- GET: Fetch a specific quiz

- /get-all-quizzes
	- GET: Fetch all qizzes a specific user has made

- /delete-quiz
	- DELETE: Delete a quiz

---
## Parameters:
- POST /sign-up
	- name: string (Required)
	- email: string  (Required)
	- password: string (Required)

- POST /sign-in
	- name | email: string (Required)
	- password: string (Required)

- GET /user
	- id: string (Required)

- PUT /user
	- id: string (Required)
	- object: 

- DELETE /user
	- id: string (Required)

- POST /add-quiz
	- title: string (Required)
	- quiz: object (Required)

- GET /get-quiz
	- quizID: string (Required)

- GET /get-all-quizzes
	- userID: string (Required)

- PUT /change-quiz
	- id: string (Required)
	- object: 

- DELETE /delete-quiz
	- id: string (Required)

---
## Response Codes:
- Each response returns a JSON object in the payload.
- Properties:
    - success: boolean (Indicates the success of the operation. True if the operation is successful, false otherwise.)
    - msg: string (Describes the result of the operation. This message can be used as feedback for users within the application.)

---
## Authentication:
- Authentication is required for /user and /user/{id}
- Use the token in the Authorization header for authentication
	- Example: Authorization: Bearer {token}
