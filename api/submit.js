export async function onRequest({ request, env }) {
  // 处理跨域预检
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, msg: '请求方法不允许' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { name, className, status, content } = await request.json();
    // 生成唯一ID
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // 写入D1数据库（DB是绑定的变量名）
    await env.DB.prepare(
      `INSERT INTO records (id, name, class, status, content) VALUES (?, ?, ?, ?, ?)`
    ).bind(id, name, className, status, content).run();

    return new Response(
      JSON.stringify({ success: true, id: id, msg: '提交成功' }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, msg: '提交失败：' + err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
