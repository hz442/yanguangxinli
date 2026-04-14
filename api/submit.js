export async function onRequestPost(context) {
  const db = context.env.DB
  const data = await context.request.json()
  const id = Date.now().toString(16)
  await db.prepare(`
    INSERT INTO records (id,name,class,status,content) VALUES (?,?,?,?,?)
  `).bind(id,data.name,data.class,data.status,data.content).run()
  return Response.json({success:true,id})
}
