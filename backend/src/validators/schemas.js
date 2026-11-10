const {z}=require('zod')
const tipos=['Individual','Familiar','Empresarial / PME','Sênior','Não sei qual escolher']
const uf=['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
const texto=(max)=>z.string().trim().max(max)
const optionalText=(max)=>z.union([texto(max),z.undefined()]).transform(v=>v||null)
const leadSchema=z.object({
 nome:z.string().trim().min(3).max(120),whatsapp:z.string().transform(v=>v.replace(/\D/g,'')).pipe(z.string().regex(/^\d{10,11}$/)),
 email:z.union([z.literal(''),z.string().trim().email().max(254)]).optional().transform(v=>v||null),
 estado:z.enum(uf),cidade:z.string().trim().min(2).max(100),tipoPlano:z.enum(tipos),
 quantidadeBeneficiarios:z.coerce.number().int().min(1).max(99),
 empresa:optionalText(120),cnpj:z.string().optional().transform(v=>v?v.replace(/\D/g,''):null).pipe(z.string().regex(/^\d{14}$/).nullable()),
 origem:optionalText(100),utmSource:optionalText(100),utmMedium:optionalText(100),utmCampaign:optionalText(100),
 aceitePrivacidade:z.literal(true),autorizacaoMarketing:z.boolean().default(false),website:z.string().max(120).optional()
}).strict()
const loginSchema=z.object({email:z.string().trim().email().max(254),senha:z.string().min(1).max(256)}).strict()
const updateLeadSchema=z.object({status:z.enum(['novo','contatado','em_negociacao','convertido','perdido']).optional(),observacoesInternas:z.string().max(3000).nullable().optional()}).strict().refine(v=>Object.keys(v).length>0)
module.exports={leadSchema,loginSchema,updateLeadSchema}
