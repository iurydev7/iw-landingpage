const {DataTypes}=require('sequelize')
const sequelize=require('../src/config/database')
const Lead=sequelize.define('Lead',{
 id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
 nome:{type:DataTypes.STRING(120),allowNull:false},
 whatsapp:{type:DataTypes.STRING(11),allowNull:false},
 email:{type:DataTypes.STRING(254),allowNull:true},
 estado:{type:DataTypes.STRING(2),allowNull:false},
 cidade:{type:DataTypes.STRING(100),allowNull:false},
 tipoPlano:{type:DataTypes.STRING(32),allowNull:false},
 quantidadeBeneficiarios:{type:DataTypes.INTEGER,allowNull:false},
 empresa:{type:DataTypes.STRING(120),allowNull:true},
 cnpj:{type:DataTypes.STRING(14),allowNull:true},
 origem:{type:DataTypes.STRING(100),allowNull:false,defaultValue:'landing-page'},
 utmSource:{type:DataTypes.STRING(100),allowNull:true},
 utmMedium:{type:DataTypes.STRING(100),allowNull:true},
 utmCampaign:{type:DataTypes.STRING(100),allowNull:true},
 status:{type:DataTypes.STRING(24),allowNull:false,defaultValue:'novo'},
 observacoesInternas:{type:DataTypes.TEXT,allowNull:true},
 versaoAvisoPrivacidade:{type:DataTypes.STRING(30),allowNull:false},
 registroAceiteOuBaseLegal:{type:DataTypes.STRING(70),allowNull:false},
 autorizacaoMarketing:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false},
},{tableName:'leads',timestamps:true})
const AdminUser=sequelize.define('AdminUser',{
 id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
 nome:{type:DataTypes.STRING(120),allowNull:false},
 email:{type:DataTypes.STRING(254),allowNull:false,unique:true},
 senhaHash:{type:DataTypes.STRING(255),allowNull:false},
 ativo:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:true},
},{tableName:'usuarios_admin',timestamps:true})
const Audit=sequelize.define('Audit',{
 id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
 adminId:{type:DataTypes.UUID,allowNull:true},
 leadId:{type:DataTypes.UUID,allowNull:true},
 acao:{type:DataTypes.STRING(60),allowNull:false},
 detalhes:{type:DataTypes.JSONB,allowNull:true},
},{tableName:'auditoria',timestamps:true,updatedAt:false})
module.exports={sequelize,Lead,AdminUser,Audit}
