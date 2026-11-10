const {app,sequelize,store}=require('./app')
const port=Number(process.env.PORT||4000)
async function start(){
 try {
  await sequelize.authenticate()
  const server=app.listen(port,'0.0.0.0',()=>console.log(`IW API pronta em http://127.0.0.1:${port}`))
  const shutdown=()=>{server.close(async()=>{store.stopExpiringSessions();await sequelize.close();process.exit(0)})}
  process.on('SIGINT',shutdown);process.on('SIGTERM',shutdown)
 }catch(error){console.error('Não foi possível conectar ao PostgreSQL. Verifique .env e migrations:',error.message);process.exit(1)}
}
start()
