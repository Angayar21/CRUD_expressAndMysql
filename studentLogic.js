const mySql=require("mysql")

//mysql
const connect=mySql.createPool({
    host : process.env.DB_HOST,
    user :process.env.DB_USER,
    password :process.env.DB_PASS,
    database :process.env.DB_NAME

})


//Check database connection

exports.view=(req,res)=>{
connect.getConnection((err,connection)=>{
    if(err) throw err
    connection.query("select * from users",(err,rows)=>{
        connection.release()
        if(!err){
            //console.log("good")
            res.render("home",{rows})
        
        }else{
            console.log("error occured in listing data",err)
        }

    })
})}
exports.addUser=(req,res)=>{

    res.render("addUser")


}
exports.save=(req,res)=>{
    connect.getConnection((err,connection)=>{
        if(err) throw err

        const{name,age,city}=req.body
        connection.query("insert into users(Name,Age,city) values(?,?,?)",[name,age,city],(err,rows)=>{
            connection.release()
            if(!err){
                //console.log("good")
                res.render("addUser",{msg:"User details added sucessfully"})
            
            }else{
                console.log("error occured in listing data",err)
            }
    
        })
    })}

exports.editUser=(req,res)=>{


    connect.getConnection((err,connection)=>{
        if(err) throw err
//Get Id from url
        let Id=req.params.Id
        connection.query("select * from users where Id=?",[Id],(err,rows)=>{
            connection.release()
            if(!err){
                return res.render("editUser",{rows})
            
            }else{
                console.log("error occured in listing data",err)
            }
    
        })
    })
    
    
    }

    exports.edit=(req,res)=>{
        connect.getConnection((err,connection)=>{
            if(err) throw err
            //Get Id from url
            let Id=req.params.Id
    
            const{name,age,city}=req.body
            connection.query("update users set Name=?,Age=?,city=? where Id=?",[name,age,city,Id],(err,rows)=>{
                connection.release()
                if(!err){
                    connect.getConnection((err,connection)=>{
                        if(err) throw err
                //Get Id from url
                        let Id=req.params.Id
                        connection.query("select * from users where Id=?",[Id],(err,rows)=>{
                            connection.release()
                            if(!err){
                                return res.render("editUser",{rows,msg:"User details updated sucessfully"})
                            
                            }else{
                                console.log("error occured in listing data",err)
                            }
                    
                        })
                    })
     
                    
                
                }else{
                    console.log("error occured in listing data",err)
                }
        
            })
        })}

exports.deleteUser=(req,res)=>{
    connect.getConnection((err,connection)=>{
        if(err) throw err
        //get ID from url
        let Id=req.params.Id
        connection.query("delete from users where Id=?",[Id],(err,rows)=>{
            connection.release()
            if(!err){
                res.redirect("/")
            }
            else{
                console.log(err)
            }

        })

    })
            
        }


