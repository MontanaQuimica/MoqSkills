import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import './build.mjs';
const root = resolve(fileURLToPath(new URL('./dist/', import.meta.url)));
const port = Number(process.env.PORT || 3000);
createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const target = resolve(root, '.' + (path.endsWith('/') ? path + 'index.html' : path));
    if (!target.startsWith(root + sep)) throw new Error('Invalid path');
    res.setHeader('Content-Type', target.endsWith('.md') ? 'text/markdown; charset=utf-8' : 'text/html; charset=utf-8');
    res.end(await readFile(target));
  } catch { res.writeHead(404); res.end('Página não encontrada'); }
}).listen(port, '127.0.0.1', () => console.log('MoqSkills: http://localhost:' + port));
