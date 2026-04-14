const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join('/tmp', 'submissions.json');

exports.handler = async (event) => {
  if (event.httpMethod !== 'PATCH') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { id, reply } = JSON.parse(event.body);
    const file = await fs.readFile(DATA_FILE, 'utf8');
    const data = JSON.parse(file);

    // 更新回复
    const updatedData = data.map(item => 
      item.id === id ? { ...item, reply } : item
    );

    await fs.writeFile(DATA_FILE, JSON.stringify(updatedData));

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
