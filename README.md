# OESC Dashboard

Dashboard público em português para o Observatório da Economia Espacial Catarinense. HTML, CSS e JavaScript sem etapa de build e sem dependências de runtime.

## Publicação

Site: https://www.laioseman.com/oesc/

Repositório: https://github.com/lseman/oesc

GitHub Pages publica automaticamente a raiz da branch `main`. Os arquivos usam caminhos relativos para funcionar em `/oesc/`.

## Executar

```sh
npm run dev
```

Abra http://localhost:5174. Para verificar a sintaxe: `npm run check`.

## Conteúdo e limites

Fonte: https://oesc.ufsc.br/, consultada em 13/11/2026. O mapa em `assets/mapasc.png` pertence ao site OESC. As fontes Manrope e DM Sans são carregadas do Google Fonts, com fallback local.

Os números são informações publicadas do **projeto**: 48 integrantes, cinco áreas iniciais, seis eixos e horizonte de 26 meses. Não são indicadores do censo. Entregas e fases são explicitamente apresentadas como previstas; não há percentuais de progresso ou contagens regionais inventados. A organização das áreas por upstream, downstream e tecnologias/negócios é editorial. Instituições são as mencionadas no site, não um diretório completo do setor.

Navegação por hash, filtros de áreas, detalhes em diálogos, mapa e lista de regiões, seleção regional, busca por texto sem distinção de acentos (Ctrl/Cmd+K) e exportação JSON funcionam no navegador. Inscrições e participação direcionam para os canais oficiais. A interface é pública e não implementa autenticação, coleta de cadastros ou integração com bases do censo.

O estado de interface é mantido em memória, a seção é refletida na URL e os filtros são derivados das coleções locais. Eventos são registrados uma vez e a busca não envia dados a serviços externos. URLs temporárias de exportação são revogadas e diálogos de detalhes são removidos ao fechar.

## Editar o conteúdo

O aplicativo carrega os arquivos abaixo por `fetch`, em paralelo, antes de renderizar. Não há conteúdo de projeto duplicado em JavaScript e não é necessário executar um build. Edite o JSON, faça commit e push em `main`; o GitHub Pages publica os arquivos atualizados.

| Arquivo                   | Conteúdo                                                                                                          |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `data/project.json`       | Fonte, links oficiais, textos da página inicial e do menu, métricas, mapa, filtros e textos explicativos (`copy`) |
| `data/sections.json`      | Títulos, descrições e ordem das sete seções                                                                       |
| `data/areas.json`         | Áreas de interesse, categorias, descrições e tags                                                                 |
| `data/regions.json`       | Lista de mesorregiões                                                                                             |
| `data/institutions.json`  | Instituições, siglas, descrição e identificação da instituição líder                                              |
| `data/opportunities.json` | Cards de oportunidades, situação e links                                                                          |
| `data/deliverables.json`  | Entregas, descrições e situação prevista                                                                          |
| `data/roadmap.json`       | Fases, janelas de execução e descrições                                                                           |

Por exemplo, para cadastrar uma oportunidade, acrescente um objeto em `data/opportunities.json`:

```json
{
  "label": "CHAMADA",
  "color": "green",
  "status": "Consulte os prazos",
  "title": "Título da oportunidade",
  "description": "Descrição da chamada ou ação.",
  "url": "https://oesc.ufsc.br/oportunidades.html",
  "linkLabel": "Saiba mais"
}
```

Textos são tratados como texto simples: caracteres como `<`, `&` e aspas aparecem literalmente. Para quebras de linha no banner, use os arrays `hero.title` e `hero.description`. Cores disponíveis: `blue`, `purple`, `green`, `orange` e `pink`. Categorias de áreas correspondem aos IDs de `project.filters`; `all` é reservado ao filtro geral. Os IDs das seções identificam páginas da aplicação e devem ser preservados. As métricas `team`, `areas`, `axes` e `duration` são editadas em `project.metrics`; o resumo exportado usa esses mesmos valores. Mantenha a métrica de áreas e os textos explicativos coerentes com suas alterações.

Execute `npm run check` para verificar a sintaxe e validar todos os arquivos de conteúdo. A validação também ocorre no navegador. Em caso de falha de rede, JSON inválido ou formato incompatível, o painel mostra uma mensagem e permite tentar novamente. Listas vazias mostram um estado sem conteúdo. A busca e a exportação usam os dados carregados, sem cópias fixas. Os pedidos usam revalidação de cache e os caminhos são relativos ao módulo, para funcionar também sob `/oesc/`.

Sirva a aplicação por HTTP (`npm run dev`); abrir `index.html` diretamente por `file://` não permite carregar os módulos e os arquivos JSON.
