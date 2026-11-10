const BASE = import.meta.env.VITE_API_URL || ''
export async function api(path, options = {}) {
 const response = await fetch(`${BASE}${path}`, {
  ...options, credentials:'include',
  headers:{'Content-Type':'application/json',...options.headers},
 })
 const body = await response.json().catch(()=>({}))
 if(!response.ok) {
  const error = new Error(body.message || 'Não foi possível concluir a solicitação.')
  error.status = response.status
  error.details = body.errors
  throw error
 }
 return body
}
