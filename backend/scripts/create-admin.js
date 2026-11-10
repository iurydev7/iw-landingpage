require('dotenv').config()
const readline=require('node:readline/promises')
const {stdin:input,stdout:output}=require('node:process')
const argon2=require('argon2')
const {sequelize,AdminUser}=require('../models')
async function run(){
 const rl=readline.createInterface({input,output})
 try{
  console.log('Criação de administrador IW (somente terminal local e conexão segura).')
  const nome=(await rl.question('Nome: ')).trim()
  const email=(await rl.question('E-mail: ')).trim().toLowerCase()
  const senha=(await rl.question('Senha forte (mínimo 12 caracteres; entrada visível no terminal): '))
  if(nome.length<3||!/^\S+@\S+\.\S+$/.test(email)||senha.length<12)throw Error('Informe nome, e-mail válido e senha com no mínimo 12 caracteres.')
  await sequelize.authenticate()
  if(await AdminUser.findOne({where:{email}}))throw Error('Já existe administrador com este e-mail.')
  const senhaHash=await argon2.hash(senha,{type:argon2.argon2id})
  await AdminUser.create({nome,email,senhaHash})
  console.log('Administrador criado. Evite executar em terminais compartilhados.')
 }finally{rl.close();await sequelize.close()}
}
run().catch(err=>{console.error(err.message);process.exitCode=1})
