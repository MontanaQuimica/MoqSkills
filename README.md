# MoqSkills

O Node.js gera um site estático para o GitHub Pages. O servidor Node é usado apenas para prévia local.

## Opção 1: GitHub Pages

1. Envie o conteúdo desta pasta para um repositório GitHub na branch main.
2. Em Settings → Pages → Build and deployment → Source, selecione GitHub Actions.
3. Na aba Actions, execute Publicar MoqSkills, ou envie um novo commit para main.
4. Abra a URL do GitHub Pages e selecione uma skill.
5. Selecione Baixar arquivo .md e anexe o arquivo ao Copilot pelo botão +.

A pasta skills na raiz contém os arquivos gerados para publicação diretamente a partir da branch. O fluxo GitHub Actions também gera os arquivos em dist. Prefira selecionar uma única fonte de publicação em Settings → Pages; para este projeto, selecione GitHub Actions. Após alterar skills em index.html, execute npm run build para atualizar dist e a pasta skills da raiz antes de enviar as alterações.

Os links funcionam tanto na raiz quanto em um endereço com nome de repositório. O GitHub Pages pode tornar as skills e os recursos incorporados públicos; escolha a visibilidade adequada à Montana.

## Opção 2: Hostinger ou outra hospedagem estática

Extraia o arquivo MoqSkills-Hostinger.zip e envie **o conteúdo extraído** para o diretório publicado do site (normalmente public_html no domínio principal). Preserve a pasta skills ao lado do index.html. Se publicar em uma subpasta, envie os arquivos juntos para essa subpasta. Não é preciso editar o endereço do domínio ou alterar o código.

O pacote pronto para Hostinger contém o mesmo site gerado pelo processo do GitHub Pages. Quando fizer alterações no projeto, execute npm run build para gerar uma nova pasta dist e envie o conteúdo atualizado dela à Hostinger.

As páginas e os arquivos das skills gerados usam caminhos relativos e funcionam nos dois destinos. Links antigos que apontarem para o GitHub deixarão de funcionar se aquele site for desativado; eles não são redirecionados automaticamente.

## Prévia local

Com Node.js 20 ou superior, execute npm start e abra http://localhost:3000. O Copilot remoto não consegue acessar o endereço local.

Execute npm run build para gerar os arquivos estáticos em dist/; a pasta também pode ser enviada para uma hospedagem estática como Hostinger.

As skills estão no bloco skills em index.html. O build cria um arquivo Markdown e uma página HTML para cada skill.
