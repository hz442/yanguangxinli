export async function onRequest(context) {
  const db = context.env.DB
  if(context.request.method==='POST'){
    const token = context.request.headers.get('token')
    if(!token || !token.startsWith('admin-'))return Response.json({})
    const {id,content,type} = await context.request.json()
    await db.prepare(`
      INSERT INTO messages (rid,content,type) VALUES (?,?,?)
    `).bind(id,content,type).run()
    return Response.json({success:true})
  }else{
    const {id} = await context.request.query()
    const {results} = await db.prepare(`
      SELECT * FROM messages WHERE rid=?
    `).bind(id).all()
    return Response.json(results)
  }
}
