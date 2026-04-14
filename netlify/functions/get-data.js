const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join('/tmp', 'submissions.json');

exports.handler = async () => {
  try {
    const file = await fs.readFile(DATA_FILE, 'utf8');
    const data = JSON.parse(file);
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (e) {
    // 文件不存在，返回空数组
    return {
      statusCode: 200,
      body: JSON.stringify([])
    };
  }
};
