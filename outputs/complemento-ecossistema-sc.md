# Complemento do ecossistema espacial de SC — conciliação

Documento recebido: `Complemento_Ecossistema_Espacial_SC.docx.pdf`, 13 páginas, compilação de Yasmin Lenz Piccoli Castelli e complemento de Ramon Mayor Martins. O documento informa verificação em 01/10/2026; incorporação revisada em 14/11/2026. O SHA-256 está no [registro estruturado](complemento-ecossistema-sc.reconciliation.json).

**Resultado: 48 → 67 perfis**, com 19 inclusões e oito perfis enriquecidos. Quatro outros perfis foram conciliados sem alteração. Perfis incluem unidades, infraestrutura e formação; não são 67 empresas, CNPJs ou integrantes do OESC. A lista `institutions.json`, que trata das instituições do projeto, foi preservada.

## Inclusões

| Perfil | Papel | Situação | Páginas do complemento |
| --- | --- | --- | --- |
| UFSC — SpaceLab (`ufsc-spacelab`) | Institutos e centros tecnológicos | Validação pendente | 1, 8 |
| IFSC — formação e projetos espaciais (`ifsc-formacao-espacial`) | Formação e divulgação científica | Evidência histórica / revalidar | 1, 2, 5 |
| IFSC — estação SatNOGS 389 (`ifsc-satnogs-389`) | Infraestrutura espacial e segmento solo | Evidência histórica / revalidar | 1 |
| FURB — IFFSC / FlorestaSC (`furb-florestasc`) | Institutos e centros tecnológicos | Validação pendente | 2, 9 |
| FURB — CEOPS (`furb-ceops`) | Indústrias e organizações usuárias | Validação pendente | 2 |
| UFSC — formação e divulgação espacial (`ufsc-formacao-divulgacao`) | Formação e divulgação científica | Validação pendente | 2, 3 |
| IFC Camboriú — formação em Defesa Civil (`ifc-camboriu-defesa-civil`) | Formação e divulgação científica | Evidência histórica / revalidar | 3 |
| Unisul — Ciências Aeronáuticas (`unisul-ciencias-aeronauticas`) | Formação e divulgação científica | Validação pendente | 7 |
| Fundação CERTI (`fundacao-certi`) | Institutos e centros tecnológicos | Oferta ou aplicação documentada | 4, 7 |
| MEV Tech Ltda (`mev-tech`) | Fabricação e engenharia upstream | Oferta ou aplicação documentada | 4 |
| Vultis Industries (`vultis-industries`) | Fabricação e engenharia upstream | Oferta ou aplicação documentada | 4, 9 |
| Electro Aço Altona (`electro-aco-altona`) | Fabricação e engenharia upstream | Oferta ou aplicação documentada | 7, 9 |
| Webphy Tecnologia (`webphy-tecnologia`) | Atividades adjacentes e apoio ao ecossistema | Validação pendente | 4 |
| Hidrológica Research Associates Engenharia e Meio Ambiente Ltda (`hidrologica-research`) | Atividades adjacentes e apoio ao ecossistema | Validação pendente | 5 |
| Telebras — gateway SGDC de Florianópolis (`telebras-gateway-florianopolis`) | Infraestrutura espacial e segmento solo | Oferta ou aplicação documentada | 6, 9 |
| Epagri/Ciram (`epagri-ciram`) | Indústrias e organizações usuárias | Validação pendente | 6 |
| Fapesc — fomento aeroespacial e defesa (`fapesc-fomento-espacial`) | Fomento e articulação do ecossistema | Oferta ou aplicação documentada | 5 |
| FIESC — Condefesa (`fiesc-condefesa`) | Fomento e articulação do ecossistema | Oferta ou aplicação documentada | 3, 5, 6 |
| Kosmos Rocketry — UFSC Joinville (`kosmos-rocketry`) | Formação e divulgação científica | Evidência histórica / revalidar | 5, 9 |

## Atualizações e identidades preservadas

| Perfil | Tratamento | Página |
| --- | --- | --- |
| Instituto SENAI de Inovação em Sistemas Embarcados | Fontes e ressalvas complementadas | 3 |
| Outer Space Ltda | Fontes e ressalvas complementadas | 3 |
| Horus Smart Detections | Fontes e ressalvas complementadas | 3 |
| Agrosatélite Geotecnologia Aplicada / operação integrada à Serasa Experian | Fontes e ressalvas complementadas | 3 |
| Canopy Remote Sensing Solutions | Fontes e ressalvas complementadas | 4 |
| Embraer — Centro de Engenharia e Tecnologia de Santa Catarina (CETE-SC) | Fontes e ressalvas complementadas | 7 |
| WEG — propulsão elétrica para aeronaves | Fontes e ressalvas complementadas | 7 |
| Defesa Civil de Santa Catarina — recepção direta GOES-19 | Fontes e ressalvas complementadas | 6 |
| NOR Space Intelligence | Já cadastrado; sem duplicação | 3 |
| REMAP Geotecnologia | Já cadastrado; sem duplicação | 3 |
| ESSS — Engineering Simulation and Scientific Software | Já cadastrado; sem duplicação | 4 |
| Laboratório de foguetes do Ágora Tech Park (SpaceLabRockets) | Já cadastrado; sem duplicação | 3 |

## Critérios e fontes

Cada fonte incorporada contém `provenance.document`, `page`, `reference` (numeração 81–157 do documento) e `verification`. `direct` indica conteúdo externo consultado nesta rodada; `document_only` indica leitura da referência no PDF, sem revalidação externa. Nessa segunda situação, a própria evidência informa o limite; `checkedAt` registra a data de leitura do complemento, não uma suposta visita ao site.

Foram consultadas diretamente as referências 85 (SatNOGS), 102 (Epagri/IFC), 104 e 105 (SENAI/MIT e Condefesa), 106 (Vultis), 119 (CERTI), 120 (Fapesc/MEV/Hidrológica), 127 (Kosmos), 137 (Telebras), 140 (Epagri) e 150 (Altona). As páginas UFSC 81 e 99 retornaram 404; FURB 94, 95 e 97 não ficaram acessíveis; SpaceLab 117 retornou 404 e AEB 116 exigiu autenticação. Essas falhas não demonstram inexistência das atividades.

Novos perfis apoiados apenas em referências indiretas ficam pendentes ou históricos. Os perfis existentes mantêm fontes mais recentes e classificações anteriores: a ressalva de outubro sobre a Canopy não invalida automaticamente evidências já coletadas em novembro. A menção a aquisição da Horus é atribuída ao complemento, sem criar outra empresa para a adquirente.

A estação SatNOGS 389 aparece desconectada e em teste na consulta direta; sua existência não foi convertida em infraestrutura operacional. A MEV tem projeto de P&D documentado, sem inferir voo ou homologação. Vultis é aeronáutica, não fornecedora orbital comprovada. Altona fornece componentes para infraestrutura de solo. Epagri/Ciram e Hidrológica não foram promovidas a fornecedoras espaciais por serem usuárias potenciais.

A fonte FIESC de março de 2025 registra atividade presencial do projeto MIT em março; não se restringiu a cronologia à menção de abril no complemento. A fonte Epagri de 2023 informa mais de 250 estações; a contagem de cerca de 320 do PDF não foi adotada como dado atual.

## Duplicatas, vínculos e exclusões

NOR/ORN, Agrosatélite/Serasa e Horus/Horus Aeronaves continuam em perfis únicos. O SENAI não recebeu outra ficha por sua parceria MIT. Outer Space e laboratório de foguetes permanecem relacionados, com ressalva contra contagem como fornecedores independentes; Lab Foguetes foi incluído como alias da empresa, sem afirmar identidade jurídica com SpaceLabRockets. UFSC e IFSC têm perfis de unidades/atividades distintos, explicitamente relacionados, sem criar organizações jurídicas para cada projeto. FURB/FlorestaSC e FURB/CEOPS têm papéis diferentes e pertencem à mesma instituição.

Kosmos saiu de `excluded` e entrou em formação; continua fora dos fornecedores industriais. Webphy tem ficha de atividade pendente, relacionada à organização já citada na lista de instituições do projeto. Não se presume filiação ao OESC para nenhum perfil novo.

Innalogics permanece fora do recorte territorial confirmado: a descrição como catarinense no PDF não resolve sede e atividade atual. Dígitro, TS4, Teksea, Contronics e Eco Mach Tech foram registradas em `excluded` como atores de defesa sem aplicação espacial/aeronáutica específica demonstrada pelo complemento. O fabricante não identificado da carga Allog também fica excluído: não atribuir o fornecimento a outra empresa catarinense por suposição.

## Conteúdo contextual e pendências preservadas

- Programas Fapesc 23/2024, 60/2025 e 32/2026, concurso ABDI/FIESC e SC Expo Defense são contexto de fomento e articulação. Seus prazos históricos não foram publicados como oportunidades abertas. Não foram importadas contagens de EED, expositores, bolsas ou vagas como indicadores atuais.
- NASA Space Apps de Balneário Camboriú: evento e organização local precisam de confirmação; nenhum novo perfil foi criado para um evento.
- FloripaSat-RO, coordenação do Catarina-A1, lançamento/recepção do Catarina-A2 e embarque no Transporter-18 precisam de fontes específicas. Não foi publicado lançamento de carga da UFSC sem manifesto.
- O PDF relata a perda do Aldebaran-I no PSLV-C62 e divergência com uma página que afirma chegada à órbita. Essa correção é uma pista de pesquisa, não foi incorporada como fato revalidado nesta rodada; Innalogics continua territorialmente pendente.
- Validar funcionamento do CETE-SC, METEOSAT, GFIG após 2023, atividade de 2026 do Planetário/Observatório, ano da OBSAT do Colégio de Aplicação, Pathfinder I e operação atual da Canopy.
- Validar sede e oferta espacial da Webphy; sede atual da Innalogics; ato de pré-qualificação dos drones da Vultis; componentes específicos do Mobile Launcher 2; fabricante atendido pela Allog.
- Contatos pessoais, cargos e titulares não foram transpostos para o catálogo. Católica SC, Univille, Inovaparq, SATC, Unesc e LABRE-SC são sugestões de prospecção do documento, sem nova ficha por mera menção. NASA, ESA, MIT, EUMETSAT, UFMA, UFSM e demais conexões externas não viraram organizações catarinenses.

O esquema ilustrativo da página 8 também foi inspecionado: suas conexões são tratadas nas seções textuais e nas decisões acima, sem multiplicar perfis por ligação institucional.
