# OESC Dashboard

Dashboard público em português para o Observatório da Economia Espacial Catarinense. HTML, CSS e JavaScript sem etapa de build e sem dependências de runtime.

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
