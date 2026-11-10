const crypto=require('node:crypto')
const argon2=require('argon2')
const {AdminUser}=require('../../models')
const {loginSchema}=require('../validators/schemas')
const {asyncHandler}=require('../middlewares/errors')
const audit=require('../utils/audit')
exports.login=asyncHandler(async(req,res,next)=>{
 const {email,senha}=loginSchema.parse(req.body)
 const admin=await AdminUser.findOne({where:{email:email.toLowerCase(),ativo:true}})
 if(!admin||!(await argon2.verify(admin.senhaHash,senha)))return res.status(401).json({message:'E-mail ou senha incorretos.'})
 req.session.regenerate(async err=>{
  if(err)return next(err)
  req.session.userId=admin.id
  req.session.csrfToken=crypto.randomBytes(32).toString('hex')
  req.session.save(async saveErr=>{
   if(saveErr)return next(saveErr)
   try{await audit(admin.id,'LOGIN_ADMIN')}catch(error){console.error('Falha ao registrar auditoria',error.code||error.name)}
   res.json({user:{id:admin.id,nome:admin.nome,email:admin.email},csrfToken:req.session.csrfToken})
  })
 })
})
exports.me=asyncHandler(async(req,res)=>{
 if(!req.session?.userId)return res.status(401).json({message:'Sessão não autenticada.'})
 const admin=await AdminUser.findByPk(req.session.userId,{attributes:['id','nome','email','ativo']})
 if(!admin?.ativo)return res.status(401).json({message:'Sessão não autenticada.'})
 return res.json({user:{id:admin.id,nome:admin.nome,email:admin.email},csrfToken:req.session.csrfToken})
})
exports.logout=asyncHandler(async(req,res,next)=>{
 const id=req.session.userId
 req.session.destroy(async err=>{
  if(err)return next(err)
  res.clearCookie(process.env.NODE_ENV==='production'?'__Host-iw.sid':'iw.sid',{path:'/'})
  try{await audit(id,'LOGOUT_ADMIN')}catch(error){console.error('Falha ao registrar auditoria',error.code||error.name)}
  res.json({message:'Sessão encerrada.'})
 })
})
