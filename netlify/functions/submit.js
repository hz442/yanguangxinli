const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join('/tmp', 'submissions.json');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const submission = JSON.parse(event.body);
    let data = [];
    
    // 读取现有数据
    try {
      const file = await fs.readFile(DATA_FILE, 'utf8');
      data = JSON.parse(file);
    } catch (e) {
      // 文件不存在，初始化空数组
    }

    // 添加新提交
    data.push({
      ...submission,
      id: Date.now().toString(),
      time: new Date().toLocaleString('zh-CN'),
      reply: ''
    });

    // 保存数据
    await fs.writeFile(DATA_FILE, JSON.stringify(data));

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
