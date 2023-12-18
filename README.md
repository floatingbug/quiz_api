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

- /quiz
	- GET: Fetch all quizzes
	- POST: Add a new quiz

- /quiz/{id}
	- GET: Fetch a specific quiz
	- DELETE: Delete a specific quiz
	- PUT: Update a specific quiz

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
	- No parameters

- GET /user/{id}
	- id: string (Required)

- PUT /user/{id}
	- id: string (Required)
	- object: 

- DELETE /user/{id}
	- id: string (Required)

- GET /quiz
	- No Parameters

- POST /quiz
	- No Parameters

- PUT /quiz/{id}
	- id: string (Required)
	- object: 

- DELETE /quiz/{id}
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
