/* Sequelize CLI migrations: versionam o banco sem usar sync({force:true}). */
module.exports={
 async up(queryInterface,S){
  await queryInterface.createTable('leads',{
   id:{type:S.UUID,primaryKey:true,allowNull:false,defaultValue:S.literal('gen_random_uuid()')},
   nome:{type:S.STRING(120),allowNull:false},whatsapp:{type:S.STRING(11),allowNull:false},
   email:{type:S.STRING(254)},estado:{type:S.STRING(2),allowNull:false},cidade:{type:S.STRING(100),allowNull:false},
   tipoPlano:{type:S.STRING(32),allowNull:false},quantidadeBeneficiarios:{type:S.INTEGER,allowNull:false},
   empresa:{type:S.STRING(120)},cnpj:{type:S.STRING(14)},
   origem:{type:S.STRING(100),allowNull:false,defaultValue:'landing-page'},
   utmSource:{type:S.STRING(100)},utmMedium:{type:S.STRING(100)},utmCampaign:{type:S.STRING(100)},
   status:{type:S.STRING(24),allowNull:false,defaultValue:'novo'},observacoesInternas:{type:S.TEXT},
   versaoAvisoPrivacidade:{type:S.STRING(30),allowNull:false},registroAceiteOuBaseLegal:{type:S.STRING(70),allowNull:false},
   autorizacaoMarketing:{type:S.BOOLEAN,allowNull:false,defaultValue:false},
   createdAt:{type:S.DATE,allowNull:false,defaultValue:S.fn('NOW')},updatedAt:{type:S.DATE,allowNull:false,defaultValue:S.fn('NOW')}
  });
  await queryInterface.addConstraint('leads',{fields:['quantidadeBeneficiarios'],type:'check',where:{quantidadeBeneficiarios:{[S.Op.between]:[1,99]}},name:'lead_quantidade_range'})
  await queryInterface.addConstraint('leads',{fields:['status'],type:'check',where:{status:{[S.Op.in]:['novo','contatado','em_negociacao','convertido','perdido']}},name:'lead_status_valid'})
  await queryInterface.addIndex('leads',['status','createdAt']);
  await queryInterface.addIndex('leads',['createdAt']);
  await queryInterface.createTable('usuarios_admin',{
   id:{type:S.UUID,primaryKey:true,allowNull:false,defaultValue:S.literal('gen_random_uuid()')},
   nome:{type:S.STRING(120),allowNull:false},email:{type:S.STRING(254),allowNull:false,unique:true},
   senhaHash:{type:S.STRING(255),allowNull:false},ativo:{type:S.BOOLEAN,allowNull:false,defaultValue:true},
   createdAt:{type:S.DATE,allowNull:false,defaultValue:S.fn('NOW')},updatedAt:{type:S.DATE,allowNull:false,defaultValue:S.fn('NOW')}
  });
  await queryInterface.createTable('auditoria',{
   id:{type:S.UUID,primaryKey:true,allowNull:false,defaultValue:S.literal('gen_random_uuid()')},
   adminId:{type:S.UUID,allowNull:true},leadId:{type:S.UUID,allowNull:true},
   acao:{type:S.STRING(60),allowNull:false},detalhes:{type:S.JSONB,allowNull:true},
   createdAt:{type:S.DATE,allowNull:false,defaultValue:S.fn('NOW')}
  });
  // Tabela compatível com connect-session-sequelize. O servidor NÃO a cria com sync().
  await queryInterface.createTable('Sessions',{
   sid:{type:S.STRING,primaryKey:true},expires:{type:S.DATE},data:{type:S.TEXT}
  });
 },
 async down(queryInterface){
  await queryInterface.dropTable('Sessions');await queryInterface.dropTable('auditoria');
  await queryInterface.dropTable('usuarios_admin');await queryInterface.dropTable('leads');
 }
}
