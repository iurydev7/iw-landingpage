import { z } from 'zod'
export const leadSchema = z.object({
 nome:z.string().trim().min(3,'Informe seu nome completo.').max(120),
 whatsapp:z.string().refine(v=>v.replace(/\D/g,'').length>=10&&v.replace(/\D/g,'').length<=11,'Informe um WhatsApp válido com DDD.'),
 email:z.union([z.literal(''),z.string().email('E-mail inválido.')]),
 estado:z.string().length(2,'Selecione o estado.'),
 cidade:z.string().trim().min(2,'Informe sua cidade.').max(100),
 tipoPlano:z.string().min(1,'Selecione o tipo de plano.'),
 quantidadeBeneficiarios:z.coerce.number().int().min(1,'Informe pelo menos uma pessoa.').max(99,'Máximo de 99 pessoas.'),
 empresa:z.string().max(120).optional(),
 cnpj:z.string().max(18).optional(),
 aceitePrivacidade:z.literal(true,{errorMap:()=>({message:'Leia e confirme a informação de privacidade.'})}),
 autorizacaoMarketing:z.boolean().default(false),
 website:z.string().max(0).optional(),
})
