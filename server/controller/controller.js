
const userDb=require("../model/model")


//create and save new user

exports.create=(req,res)=>{


//validate requestes
    if(!req.body){
        res.status(400).send({message:"Content can not be empty!"})
        return;
    }
    //new user
    const users=new userDb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        pass:req.body.pass
    })

    //save user in the database

    users
       .save(users)
       .then(data=>{
        // res.send(data)
        res.redirect('/adminHome')
       }).catch(err=>{
        res.status(500)
        .send({message:err.messege || "something error in server side"})
       })
 

}
    
//retrive return all users/retrive and return a single user 
exports.find= (req,res)=>{
    if(req.query.id){

        const id=req.query.id
        userDb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({messege:"user not found"})
            }else{
                res.send(data)
            }
        }).catch(err=>{
            
            res.status(500).send({messege:err.message || "something error in server side"})
            
        })

    }else{
    //find the datas on database
    userDb.find()
    .then(user=>{
        res.send(user)
    }).catch(err=>{
        res.status(500).send({message:err.messege || "something error in server side"})
    })
    }

}

//update a new identified user by userId 
exports.update=(req,res)=>{
    if(!req.body){
        res.status(400).send({messege:"data to update can not be empty!"})
        return
    }
//update the user datas on database
const id=req.params.id;
userDb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
.then(data=>{
    if(!data){
        res.status(404).send({messege:`cannot Update user with ${id}.maybe user not found!`})
    }else{
        res.send(data)
    }
}).catch(error=>{
    res.status(500).send({messege:"error update user information!" })
})

}

//delete users 

exports.delete = (req, res) => {
    // Delete user information
    const id = req.params.id;
    userDb.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: `User not found with ID ${id}, so cannot delete!` });
        } else {
          res.send({ message: "User was deleted successfully!" });
        }
      })
      .catch(error => {
        res.status(500).send({ message: "Cannot delete user with ID " + id });
      });
  }
  