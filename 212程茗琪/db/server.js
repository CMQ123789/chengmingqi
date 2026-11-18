// ============================================================
// 文件功能：诗词数据服务器（提供 db.json 的 poems 数据 + 静态页面托管）
// 作者：程茗琪
// 建立时间：2026-11-13
// 使用大模型：GLM-5.3-Flash
// 端口：3004
// ============================================================
const http = require('http');
const fs = require('fs');
const path = require('path');

const CMQ_PORT = 3004;
// 项目根目录（db 的上一级，即 212程茗琪 文件夹）
const CMQ_ROOT = path.join(__dirname, '..');

// 功能：根据请求路径返回文件的 MIME 类型
function cmq_getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  };
  return map[ext] || 'application/octet-stream';
}

// 功能：创建 HTTP 服务器，处理 /poems 数据接口和静态文件请求
const cmq_server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);

  // 数据接口：返回 db.json 中 poems 数组
  if (urlPath === '/poems') {
    const dbPath = path.join(__dirname, 'db.json');
    fs.readFile(dbPath, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: '读取 db.json 失败' }));
        return;
      }
      const db = JSON.parse(data);
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(JSON.stringify(db.poems));
    });
    return;
  }

  // 静态文件：默认返回根目录下对应文件，/ 映射到 poems.html
  let filePath = urlPath === '/' ? '/cmq_poems.html' : urlPath;
  filePath = path.join(CMQ_ROOT, filePath);

  // 防止路径穿越到项目根目录之外
  if (!filePath.startsWith(CMQ_ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': cmq_getMime(filePath) });
    res.end(data);
  });
});

// 功能：启动服务器并监听 3004 端口
cmq_server.listen(CMQ_PORT, () => {
  console.log('诗词数据服务器已启动');
  console.log('数据接口: http://localhost:' + CMQ_PORT + '/poems');
  console.log('页面地址: http://localhost:' + CMQ_PORT + '/');
});
