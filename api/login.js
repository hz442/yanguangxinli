export async function onRequest({ request, env }) {
  // 处理 OPTIONS 跨域预检
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  // 只允许 POST 方法
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, msg: '方法不允许' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // 解析 JSON 数据
    const { username, password } = await request.json();
    
    // ===== 【请在这里修改你的账号密码！】=====
    const ADMIN_USER = 'admin';
    const ADMIN_PASS = '123456';
    // ========================================

    // 验证密码
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      return new Response(JSON.stringify({ success: true, msg: '登录成功' }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } else {
      return new Response(JSON.stringify({ success: false, msg: '账号或密码错误' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (err) {
    // 捕获解析错误，返回友好提示
    return new Response(JSON.stringify({ success: false, msg: '请求数据错误: ' + err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
