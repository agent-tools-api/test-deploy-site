const http = require('http');

const port = Number(process.env.PORT || 3104);
const service = process.env.SERVICE_NAME || 'test-deploy-site';

const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>${service}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #111827;
      color: #f9fafb;
    }
    main {
      max-width: 760px;
      padding: 48px;
      text-align: center;
    }
    h1 {
      font-size: clamp(36px, 8vw, 72px);
      margin: 0 0 16px;
    }
    p {
      color: #9ca3af;
      font-size: 20px;
    }
    code {
      background: #020617;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 4px 8px;
    }
  </style>
</head>
<body>
  <main>
    <h1>${service}</h1>
    <p>Deploy-agent успешно развернул сайт из GitHub.</p>
    <p><code>/health</code> работает.</p>
  </main>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    });
    res.end(JSON.stringify({
      ok: true,
      service,
      time: new Date().toISOString()
    }));
    return;
  }

  res.writeHead(200, {
    'content-type': 'text/html; charset=utf-8',
    'x-content-type-options': 'nosniff'
  });
  res.end(html);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`${service} listening on ${port}`);
});
