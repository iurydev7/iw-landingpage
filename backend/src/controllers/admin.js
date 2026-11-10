const {Op}=require('sequelize')
const {Lead}=require('../../models')
const {updateLeadSchema}=require('../validators/schemas')
const {asyncHandler}=require('../middlewares/errors')
const {rowsToCsv}=require('../utils/csv')
const audit=require('../utils/audit')
function buildWhere(req){
 const where={}
 if(req.query.status&&['novo','contatado','em_negociacao','convertido','perdido'].includes(req.query.status))where.status=req.query.status
 if(req.query.search){const search=String(req.query.search).trim().slice(0,80);if(search)where[Op.or]=[{nome:{[Op.iLike]:`%${search.replace(/[%_]/g,'\\$&')}%`}},{whatsapp:{[Op.like]:`%${search.replace(/\D/g,'')}%`}}]}
 if(req.query.de){const d=new Date(req.query.de);if(!Number.isNaN(d.valueOf()))where.createdAt={[Op.gte]:d}}
 return where
}
exports.list=asyncHandler(async(req,res)=>{
 const page=Math.max(1,Math.min(100000,Number.parseInt(req.query.page,10)||1))
 const limit=Math.max(1,Math.min(50,Number.parseInt(req.query.limit,10)||15))
 const {rows,count}=await Lead.findAndCountAll({where:buildWhere(req),order:[['createdAt','DESC']],limit,offset:(page-1)*limit})
 res.json({rows,count,page,limit,totalPages:Math.ceil(count/limit)})
})
exports.summary=asyncHandler(async(req,res)=>{
 const statuses=['novo','contatado','em_negociacao','convertido','perdido']
 const counts=await Promise.all([Lead.count(),...statuses.map(status=>Lead.count({where:{status}}))])
 res.json({total:counts[0],...Object.fromEntries(statuses.map((s,i)=>[s,counts[i+1]]))})
})
exports.detail=asyncHandler(async(req,res)=>{
 const lead=await Lead.findByPk(req.params.id)
 if(!lead)return res.status(404).json({message:'Lead não encontrado.'})
 res.json(lead)
})
exports.update=asyncHandler(async(req,res)=>{
 const changes=updateLeadSchema.parse(req.body)
 const lead=await Lead.findByPk(req.params.id)
 if(!lead)return res.status(404).json({message:'Lead não encontrado.'})
 const before=lead.status
 await lead.update(changes)
 await audit(req.session.userId,'LEAD_ATUALIZADO',lead.id,{statusAnterior:before,statusAtual:lead.status,alterouObservacao:Object.hasOwn(changes,'observacoesInternas')})
 res.json(lead)
})
exports.remove=asyncHandler(async(req,res)=>{
 const lead=await Lead.findByPk(req.params.id)
 if(!lead)return res.status(404).json({message:'Lead não encontrado.'})
 await lead.destroy()
 await audit(req.session.userId,'LEAD_EXCLUIDO',req.params.id)
 res.status(204).end()
})
exports.export=asyncHandler(async(req,res)=>{
 const rows=await Lead.findAll({where:buildWhere(req),order:[['createdAt','DESC']],limit:10000,raw:true})
 const keys=['id','nome','whatsapp','email','estado','cidade','tipoPlano','quantidadeBeneficiarios','empresa','status','createdAt']
 const csv=rowsToCsv(rows,keys)
 await audit(req.session.userId,'LEADS_EXPORTADOS',null,{quantidade:rows.length})
 res.set('Content-Type','text/csv; charset=utf-8').set('Content-Disposition','attachment; filename="iw-leads.csv"').send(csv)
})
