const {Audit}=require('../../models')
async function audit(adminId,acao,leadId=null,detalhes=null){await Audit.create({adminId,acao,leadId,detalhes})}
module.exports=audit
