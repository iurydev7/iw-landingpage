function requireAuth(req,res,next){if(!req.session?.userId)return res.status(401).json({message:'É necessário entrar na sua conta.'});next()}
function requireCsrf(req,res,next){const got=req.get('x-csrf-token');const expected=req.session?.csrfToken;if(!expected||!got||got!==expected)return res.status(403).json({message:'Sessão inválida. Atualize a página e tente novamente.'});next()}
module.exports={requireAuth,requireCsrf}
