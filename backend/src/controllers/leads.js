const {Lead}=require('../../models')
const {leadSchema}=require('../validators/schemas')
const {asyncHandler}=require('../middlewares/errors')
exports.create=asyncHandler(async(req,res)=>{
 const payload=leadSchema.parse(req.body)
 // Honeypot: responder genericamente sem criar registro caso haja robô.
 if(payload.website)return res.status(201).json({message:'Solicitação recebida.'})
 const {website,aceitePrivacidade,...clean}=payload
 const lead=await Lead.create({...clean,versaoAvisoPrivacidade:'preliminar-1',registroAceiteOuBaseLegal:'ciencia_formulario',status:'novo'})
 return res.status(201).json({message:'Solicitação recebida.',id:lead.id})
})
