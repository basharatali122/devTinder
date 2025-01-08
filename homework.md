-Create a repository
-Initialize the repository
-node_modules, package.json, package-lock.json
-Install express
-Create a server
-Listen to port 7777
-Write request hanlders for /test,/hello 
-Install nodemon and update scripts inside package.sjon
-What are dependencies"
-What is the use of "-g" while npm install
-Diff between caret and tilde
-initialize git
-.gitignore
-Create a remote repo on github
-Push all code to remote oringin
-Play with routes and route extensios ex, /hello //hello/hello2/hello 
-Order of the routes matter
-Multiple Route handler - play with the code.
-next()
-next  function and errors along with res.send()
-app.use("/routes", rh ,rh2, rh3, [rh4,rh5],rh6)
-What is Middleware? Why do we need it?
-How express Js basically handles requests bhind the scenes
-Diff app.use and app.all
-Write a  dummy auth middleware for admin
-Write a dummy auth middleware for all user routes , axcept /user/login
-Error handling using ((err,req,res,next)=>{})

-Create a free cluster on MongoDB official website (Mongo Atlas)
-Instal mongoose library
-Connect your application to the Database/devTinder
-Call the connectDB function and connect to the database before starting the server 777
-Create a user schema and user model

-Create Post/signup API to add data to database
-Push some documents using API calls from postman
-Error handling using try , catch
-Js object vs JSON (difference)
-Add the express.json middleware to your app
-Make your signup API dynamic to recive data form the end user


-User.findOne with duplicate emails ids,which object returned 
-API - Get user by email
-API - Feed API - GET/feed - get all users from  the database 
-API - Get user by ID 
-Create a Delete user api


-Explore schematype options from the documentaion
-add required , unique, lowercase, min ,max, minlength,trim 
-Add default 
-Create a validate function for gender
-Improve the DB shecma put all appropiate validation on each field in schema 
- Add timeStamps to the userSchema

-Add PI level validations on patch request and signup post api
-Data Sanitizing - Add API Validation for each field 
-intall validator
-Explore validator library function and use validator function for email, password, and photoUrl
-never trust on req.body
-Validate data in signup API
-Install bcrypt package/library
-Create PasswordHash using bcrypt.hash & save the user is excrupted  password

-Create login api
-Compare password and email and through error if invalid

-Install cookie-parser
-just send a dumy cookie to user
-create Get/profile Api and check if you get cookie back
-install jsonwebtoken
-In login API , After email and password validation create a JWT token and send it to user 
-read the cookies inside your profile API and find logged in user

-userAuth Middleware 
-Add the userAuth middle ware in profile API and a ne sendConnectionRequest Api
-Set the expiry of JWT Token and cookies to 7 dasy 

-Create a userScema method to getJWT()
-Create UserSchema method to comparepassword(passwordInputByUser)


-Explore tinder APIs
-Create a list all API you can think of Dev Tinder
-Group multiple routes under respective routers 

-Read documentation for express.Router
-Create routes folder for managing auth, profile, request routers
-Create authRouter, profileRouter, requestRouter
-Import these routers in app.js

Create POST / logout api
-Create PATCH  / profile/edit
-Create PATCH /profile/password API => forgot password API 
- Make you validate all data in every POST, PATCH apis 


-Create Connection Request Shema
-Send Connection Request API
-proper validation of Data
-Think about all corner cases
-$or query $and query in mongoose
-schema.pre(“save”) function
-Read more about indexes in MongoDB
-Why do we need index in DB?
-what is the advantage and disadvantages of creating 
-read about compound indexs 


-Write code with proper validations for POST /request/review/:status/:requestId
-Thought process -Post vs Get 
-Create GET/user/requests/recived with all the checks
-Read about ref an populate
-Create GET/user/connections
