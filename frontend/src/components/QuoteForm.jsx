import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, CheckCircle2, LoaderCircle, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { estados, tiposDePlano } from '../data/content'
import { api } from '../services/api'
import { leadSchema } from '../schemas/leadSchema'
function formatPhone(value) {
 const digits = value.replace(/\D/g,'').slice(0,11)
 if(!digits)return ''
 if(digits.length<=2)return `(${digits}`
 if(digits.length<=6)return `(${digits.slice(0,2)}) ${digits.slice(2)}`
 return `(${digits.slice(0,2)}) ${digits.slice(2,-4)}-${digits.slice(-4)}`
}
function FieldError({error}) {return error?<span className="field-error" role="alert">{error.message}</span>:null}
export default function QuoteForm(){
 const [result,setResult]=useState('')
 const [requestError,setRequestError]=useState('')
 const {register,handleSubmit,reset,watch,setValue,formState:{errors,isSubmitting}}=useForm({resolver:zodResolver(leadSchema),defaultValues:{nome:'',whatsapp:'',email:'',estado:'',cidade:'',tipoPlano:'',quantidadeBeneficiarios:1,empresa:'',cnpj:'',aceitePrivacidade:false,autorizacaoMarketing:false,website:''}})
 const tipo=watch('tipoPlano')
 async function onSubmit(data){
  setRequestError('');setResult('')
  try {
   const params=new URLSearchParams(window.location.search)
   await api('/api/v1/leads',{method:'POST',body:JSON.stringify({...data,origem:'landing-page',utmSource:params.get('utm_source')||'',utmMedium:params.get('utm_medium')||'',utmCampaign:params.get('utm_campaign')||''})})
   setResult('Solicitação enviada! Nossa equipe dará continuidade ao atendimento pelos dados informados.')
   reset()
  } catch(error){setRequestError(error.status===429?'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.':error.message)}
 }
 return <section className="quote-card" id="cotacao" aria-labelledby="form-title">
  <div className="quote-heading"><div className="quote-icon"><ShieldCheck size={24}/></div><div><p className="eyebrow dark">COTAÇÃO PERSONALIZADA</p><h2 id="form-title">Encontre seu plano ideal</h2><p>Preencha os dados e receba orientação da nossa equipe.</p></div></div>
  {result&&<div className="alert success" role="status"><CheckCircle2 size={19}/>{result}</div>}
  {requestError&&<div className="alert error" role="alert">{requestError}</div>}
  <form onSubmit={handleSubmit(onSubmit)} noValidate>
   <div className="form-field"><label htmlFor="nome">Nome completo <span>*</span></label><input id="nome" placeholder="Como podemos chamar você?" autoComplete="name" aria-invalid={!!errors.nome} {...register('nome')}/><FieldError error={errors.nome}/></div>
   <div className="form-grid"><div className="form-field"><label htmlFor="whatsapp">WhatsApp <span>*</span></label><input id="whatsapp" type="tel" autoComplete="tel" placeholder="(85) 99999-9999" aria-invalid={!!errors.whatsapp} {...register('whatsapp',{onChange:(event)=>setValue('whatsapp',formatPhone(event.target.value),{shouldValidate:false})})}/><FieldError error={errors.whatsapp}/></div><div className="form-field"><label htmlFor="email">E-mail (opcional)</label><input id="email" type="email" autoComplete="email" placeholder="seu@email.com" aria-invalid={!!errors.email} {...register('email')}/><FieldError error={errors.email}/></div></div>
   <div className="form-grid"><div className="form-field"><label htmlFor="estado">Estado <span>*</span></label><select id="estado" defaultValue="" aria-invalid={!!errors.estado} {...register('estado')}><option value="" disabled>UF</option>{estados.map(uf=><option key={uf} value={uf}>{uf}</option>)}</select><FieldError error={errors.estado}/></div><div className="form-field"><label htmlFor="cidade">Cidade <span>*</span></label><input id="cidade" placeholder="Sua cidade" aria-invalid={!!errors.cidade} {...register('cidade')}/><FieldError error={errors.cidade}/></div></div>
   <div className="form-grid"><div className="form-field"><label htmlFor="tipoPlano">Tipo de plano <span>*</span></label><select id="tipoPlano" defaultValue="" aria-invalid={!!errors.tipoPlano} {...register('tipoPlano')}><option value="" disabled>Selecione</option>{tiposDePlano.map(t=><option key={t} value={t}>{t}</option>)}</select><FieldError error={errors.tipoPlano}/></div><div className="form-field"><label htmlFor="quantidadeBeneficiarios">Beneficiários <span>*</span></label><input id="quantidadeBeneficiarios" type="number" min="1" max="99" aria-invalid={!!errors.quantidadeBeneficiarios} {...register('quantidadeBeneficiarios')}/><FieldError error={errors.quantidadeBeneficiarios}/></div></div>
   {tipo==='Empresarial / PME'&&<div className="form-grid"><div className="form-field"><label htmlFor="empresa">Empresa (opcional)</label><input id="empresa" {...register('empresa')}/></div><div className="form-field"><label htmlFor="cnpj">CNPJ (opcional)</label><input id="cnpj" {...register('cnpj')}/></div></div>}
   <div className="hp-field" aria-hidden="true"><label htmlFor="website">Deixe em branco</label><input type="text" id="website" tabIndex={-1} autoComplete="off" {...register('website')}/></div>
   <label className="check-label"><input type="checkbox" {...register('aceitePrivacidade')}/><span>Li as informações da <Link to="/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</Link> sobre o uso dos meus dados para atender esta solicitação. <strong>*</strong></span></label><FieldError error={errors.aceitePrivacidade}/>
   <label className="check-label"><input type="checkbox" {...register('autorizacaoMarketing')}/><span>Quero receber também novidades e ofertas da IW Corretora (opcional).</span></label>
   <button className="btn btn-gold btn-full" type="submit" disabled={isSubmitting}>{isSubmitting?<><LoaderCircle className="spin" size={18}/>Enviando...</>:<>Receber minha cotação <ArrowRight size={19}/></>}</button>
   <p className="form-note">Sem compromisso. Atendimento sujeito à disponibilidade por região.</p>
  </form>
 </section>
}
