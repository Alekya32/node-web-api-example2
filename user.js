var mongoose=require("mongoose");
var userSchema=mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	mobile:{
		type:Number,
		required:true
	},
	address:{	
		
		hno:{
			type:String,
			required:true
		},
		street:{
			type:String,
			required:true
		},
		city:{
			type:String,
			required:true
		}
	}
})

var user=module.exports=mongoose.model("user",userSchema,"user")

module.exports.getUsers=function(callback){
	return user.find(callback)

}
module.exports.createuser=function(userObj,callback){
	return user.create(userObj,callback)
}

module.exports.getUsersById=function(byId,callback){
	return user.findById({_id:byId},callback)
}

module.exports.editUser=function(userId,userObj,callback){ //customerObj is model here
	return user.update({_id : userId},
						   {$set:{
						   	name:userObj.name,
						   	mail:userObj.email,
						   	mobile:userObj.mobile,
						   	hno:userObj.hno,
						   	street:userObj.street,
						   	city:userObj.city
						   }},callback)
}

/*module.exports.editUser=function(userId,userObj,callback){ //customerObj is model here
	return Customer.update({_id : userId},
						   {$set:{
						   	name:userObj.name,
						   	email:userObj.mail,
						   	mobile:userObj.mobile,
						   	address:userObj.address
						   }},callback)
}
*/
module.exports.removeUser=function(ids,callback){
	return user.remove({_id:ids},callback)
}