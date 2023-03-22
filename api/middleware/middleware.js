const { get,
  getById  
  }=require("../users/users-model.js")


function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  console.log(`[${new Date().toISOString()}] method:${req.method} url:${req.url}`)
  next()
}

const validateUserId= async(req, res, next)=> {
  // SİHRİNİZİ GÖRELİM
  let {id}=req.params 
  let user=await getById(id)

  if(user){
    req.user=user
    next()
  }else{
    next({status:404,message:"not found"})
  }
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  let {name}=req.body
 
  if(name){
    next()
  }else{
    next({status:400,message:"gerekli name alanı eksik"})
  }
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM

  let {text}=req.body

  if(text){
    next()
  }else{
    next({status:400,message:"gerekli text alanı eksik"})
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports={
  logger,
  validateUserId,
  validateUser,
  validatePost
}
