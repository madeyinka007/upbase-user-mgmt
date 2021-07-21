# upbase-user-mgmt
creates user and manages profile 
This is a test application created by Adeyinka M Mutair for Upbase Limited.

#Admin Login Details:
username: admin
password: Parabellum

#base_url = 'http://localhost:43210/upbase/api/1.0'

#Routes

1. Register:
    endpoint: {base_url}+ /auth/register
    method: POST
    params: {"firstname":"myfirstname","lastname":"mylastname","username":"myusername","password":"mypassword"}
    response: returns json object
        i. success: error = false, response: user-object
        ii. error : error = true, response: null

2. Login:
    endpoint: {base_url}+ /auth/login
    method: POST
    params: {"username":"myusername","password":"mypassword"}
    response: returns json object
        i. success: error = false, response: token
        ii. error : error = true, response: null

3. Usercontext:
    endpoint: {base_url}+ /auth/usercontext
    method: GET
    params: {"identity":"userId"}
    response: returns json object
        i. success: error = false, response: user-context
        ii. error : error = true, response: null

4. Update User:
    endpoint: {base_url}+ /user/modify
    method: POST
    params: {"identity":"userId", (any other field that needs modification)} 
    response: returns json object
        i. success: error = false, response: status
        ii. error : error = true, response: null

5. User By Identity:
    endpoint: {base_url}+ /user/by-identity
    method: GET
    params: {"identity":"userId"}
    response: returns json object
        i. success: error = false, response: user
        ii. error : error = true, response: null

6. Users: 
    endpoint: {base_url}+ /user/pull
    method: GET
    params: {}
    response: returns json object
        i. success: error = false, response: users
        ii. error : error = true, response: null

7. Delete User
    endpoint: {base_url}+ /user/delete
    method: GET
    params: {"identity":"userId"}
    response: returns json object
        i. success: error = false, response: message
        ii. error : error = true, response: null