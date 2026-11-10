const {ZodError}=require('zod')
function asyncHandler(fn){return (req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next)}
function notFound(req,res){res.status(404).json({message:'Rota não encontrada.'})}
function errorHandler(error,req,res,_next){
 if(error instanceof ZodError){return res.status(400).json({message:'Confira os campos informados.',errors:error.flatten().fieldErrors})}
 if(error.status&&error.status<500)return res.status(error.status).json({message:error.message})
 console.error('[API]',error.name||'Error',error.code||'')
 return res.status(500).json({message:'Não foi possível concluir a solicitação agora.'})
}
module.exports={asyncHandler,notFound,errorHandler}
