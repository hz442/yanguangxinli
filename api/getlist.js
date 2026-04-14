export async function onRequestGet(context) {
  const token = context.request.headers.get('token')
  if(!token || !token.startsWith('admin-')){
    return Response.json([])
  }
  const db = context.env.DB
  const {results} = await db.prepare(`
    SELECT * FROM records ORDER BY id DESC
  `).all()
  return Response.json(results)
}
