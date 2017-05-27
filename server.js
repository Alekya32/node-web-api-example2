var express=require("express");
var app=express();
var router=express.Router();
var mongoose=require("mongoose");
var user=require("./user")
var bodyParser=require("body-parser")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


mongoose.connect("mongodb://localhost/techminds/user",function(){
	console.log("Connected .....")
})

router.get("/",function(request,response){
	response.send({name:"Alekya"})
})

router.get("/userget",function(request,response){
	user.getUsers(function(err,userData){ //call back function 
			if(err){
				throw err;
			}
			response.json(userData);
	})
})

router.post("/userpost",function(request,response){
	var userObj=request.body;//posted data
	user.createuser(userObj,function(err,user){
		if(err){
			throw err;
		}
		response.json(user)
	})
})

router.put("/userput/:id",function(request,response){
	var userId=request.params.id;
	var dataPostman=request.body;
	
	user.getUsersById(userId,function(err,dataDB){
		if(err){
			throw err;
		}
	var bodyObj={
		name:dataPostman.name || dataDB.name,
		mail:dataPostman.email || dataDB.email,
		mobile:dataPostman.mobile || dataDB.mobile,
		hno:dataPostman.hno || dataDB.address.hno,
		street:dataPostman.street || dataDB.address.street,
		city:dataPostman.city || dataDB.address.city

	}
	user.editUser(userId,bodyObj,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})

})
router.delete("/userdel/:id", function(request,response){
	var userId=request.params.id;
	user.removeUser(userId,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})

router.get("/find/:id",function(request,response){
	var userId=request.params.id;
	Customer.getUsersById(userId,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})

app.use("/user",router);

var PORT=process.env.PORT|| 4000;

app.listen(PORT,function(){
	console.log("Listen to port....."+PORT)
})