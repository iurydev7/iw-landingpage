const {test}=require('node:test')
const assert=require('node:assert/strict')
const fs=require('node:fs')
const path=require('node:path')
test('não publica credenciais em arquivos de exemplo',()=>{
 const sample=fs.readFileSync(path.join(__dirname,'../.env.example'),'utf8')
 assert.ok(sample.includes('DB_PASSWORD='));assert.ok(sample.includes('SESSION_SECRET='));assert.ok(!sample.includes('postgresql://admin:senha'))
})
