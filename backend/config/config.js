require('dotenv').config()
const common={
 dialect:'postgres',
 host:process.env.DB_HOST||'127.0.0.1',
 port:Number(process.env.DB_PORT||5432),
 database:process.env.DB_NAME||'iw_corretora',
 username:process.env.DB_USER||'iw_app',
 password:process.env.DB_PASSWORD,
 logging:false,
 ...(process.env.DB_SSL==='true'?{dialectOptions:{ssl:{require:true,rejectUnauthorized:true}}}:{})
}
module.exports={development:common,test:common,production:common}
