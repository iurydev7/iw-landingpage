require('dotenv').config()
const express=require('express')
const cors=require('cors')
const helmet=require('helmet')
const session=require('express-session')
const SequelizeStore=require('connect-session-sequelize')(session.Store)
const sequelize=require('./config/database')
const routes=require('./routes')
const {notFound,errorHandler}=require('./middlewares/errors')
const isProd=process.env.NODE_ENV==='production'
const { DataTypes } = require("sequelize");
if(isProd && (!process.env.SESSION_SECRET||process.env.SESSION_SECRET.length<64))throw Error('Defina SESSION_SECRET forte, com no mínimo 64 caracteres em produção.')
const app=express()
const trustedProxy=Number(process.env.TRUST_PROXY||0)
if(trustedProxy>0)app.set('trust proxy',trustedProxy)
app.disable('x-powered-by')
app.use(helmet())
const origins=(process.env.FRONTEND_ORIGIN||'http://localhost:5173,http://127.0.0.1:5173').split(',').map(x=>x.trim()).filter(Boolean)
app.use(cors({origin(origin,cb){if(!origin||origins.includes(origin))return cb(null,true);return cb(new Error('Origem não permitida'))},credentials:true}))
app.use((req,res,next)=>{
 if(['POST','PATCH','PUT','DELETE'].includes(req.method)){
  const origin=req.get('Origin')
  if(origin&&!origins.includes(origin))return res.status(403).json({message:'Origem não autorizada.'})
 }
 next()
})
app.use(express.json({limit:'24kb'}))
sequelize.define(
  "Session",
  {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    expires: DataTypes.DATE,

    data: DataTypes.TEXT,
  },
  {
    tableName: "Sessions",
    timestamps: false,
  }
);

const store = new SequelizeStore({
  db: sequelize,
  table: "Session",
  expiration: 8 * 60 * 60 * 1000,
  checkExpirationInterval: 15 * 60 * 1000,
});
app.use(session({
 name:isProd?'__Host-iw.sid':'iw.sid',
 secret:process.env.SESSION_SECRET||'development-only-not-secure-change-before-deploy',
 store,resave:false,saveUninitialized:false,rolling:true,
 cookie:{httpOnly:true,secure:isProd,sameSite:'lax',maxAge:8*60*60*1000,path:'/'}
}))
app.use('/api',routes)
app.use(notFound)
app.use(errorHandler)
module.exports={app,sequelize,store}
