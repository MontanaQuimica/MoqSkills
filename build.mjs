import { readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import vm from 'node:vm';
const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');
const start = html.indexOf('      var logoUrl =');
const end = html.indexOf('      var categories =', start);
if (start < 0 || end < 0) throw new Error('Biblioteca de skills não encontrada.');
const skills = vm.runInNewContext(html.slice(start, end) + '\nskills;', {}, { timeout: 1000 });
const dist = new URL('./dist/', import.meta.url);
await rm(dist, { recursive: true, force: true });
await mkdir(new URL('skills/', dist), { recursive: true });
await mkdir(new URL('./skills/', import.meta.url), { recursive: true });
await writeFile(new URL('index.html', dist), html);
await writeFile(new URL('.nojekyll', dist), '');
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for (const skill of skills) {
  if (!/^[a-z0-9-]+$/.test(skill.id)) throw new Error('Identificador inválido.');
  const page = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="' + escape(skill.description) + '"><title>' + escape(skill.title) + ' | MoqSkills</title><style>body{margin:0;background:#f5f7fa;color:#17243b;font:16px/1.65 Segoe UI,Arial,sans-serif}header{background:#000e3b;color:white;padding:25px max(24px,calc((100vw - 960px)/2))}header a{color:#c8def5;text-decoration:none}main{max-width:960px;margin:35px auto;padding:0 24px 60px}h1{color:#000e3b;line-height:1.15}p{color:#536177}.area{color:#004995;font-weight:700}.content{background:white;border:1px solid #e3e8f0;border-radius:16px;padding:26px;white-space:pre-wrap;overflow-wrap:anywhere;font:14px/1.7 Consolas,monospace}</style></head><body><header><a href="../index.html">← Voltar à biblioteca MoqSkills</a></header><main><p class="area">' + escape(skill.area) + '</p><h1>' + escape(skill.title) + '</h1><p>' + escape(skill.description) + '</p><p>Conteúdo completo da skill em Markdown:</p><article class="content">' + escape(skill.prompt) + '</article></main></body></html>';
  await writeFile(new URL('skills/' + skill.id + '.html', dist), page);
  await writeFile(new URL('skills/' + skill.id + '.md', dist), skill.prompt + '\n');
  await writeFile(new URL('./skills/' + skill.id + '.md', import.meta.url), skill.prompt + '\n');
  await writeFile(new URL('./skills/' + skill.id + '.html', import.meta.url), page);
}
console.log(skills.length + ' páginas geradas em dist/.');
