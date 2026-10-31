# Fidelidade das telas ao Mandala legado

Este é o controle de reconstrução. “Demonstração local” significa que o fluxo e os campos podem ser exercitados somente neste navegador, sem dados reais ou backend compartilhado. “Backend pendente” nunca pode ser apresentado como funcional em produção.

| Área do legado | Referências verificadas | Situação atual |
| --- | --- | --- |
| Acesso, cabeçalho, menu e rodapé | layouts do tema custom | Estrutura e ativos do tema aplicados; acesso ainda demonstrativo |
| Gerenciar inscrições | `admin/gerenciarInscricoes*.php`, `editarInscricao.php`, `visualizarInscricao.php` | Reconstruída com status 1/2/3, documentos, bolsa, matrícula, exportação, consulta e edição local |
| Alunos matriculados/inscritos | `visualizarMatriculados.php`, `visualizarInscritos.php` | Dados e relações previstos no esquema; tela específica ainda pendente |
| Habilitações | `habilitacao/gerenciar.php`, `cadastrar.php`, `editar.php` | Lista e formulário nome/letra/cor/curso reconstruídos localmente |
| Componentes curriculares | modelo e views `componenteCurricular` | Nome, carga, ementa, bibliografia e NFO/NFE/NFC reconstruídos localmente |
| Ofertas | modelo `Oferta` e `oferta/gerenciar.php` | Campos estruturais disponíveis; grade mensal, bloqueios e associações completas pendentes |
| Docentes, tutores e colaboradores | views `gerenciar`, `cadastrar`, `editar`, `visualizar` | Pendente de reconstrução específica |
| Encontros presenciais | `encontro/gerenciar.php`, presença e responsáveis | Pendente de reconstrução específica |
| Notas e inscrições em ofertas | views administrativas e `InscricaoOferta` | Histórico do aluno reconstruído; gestão administrativa pendente |
| TCC | views de aluno, administração e modelo `Tcc` | Fluxo do aluno parcialmente reconstruído; avaliação administrativa pendente |
| Financeiro | pagamentos, bolsas, viagens e compras | Pendente de reconstrução específica |
| Certificados e atestados | administração e modelos de declaração | Pendente de geração com backend privado |
| Relatórios e configurações | `admin/relatorios.php`, configurações | Pendente de reconstrução específica |

## Critério para marcar uma tela como concluída

1. Campos e relações confirmados no código legado.
2. Mesma organização visual do tema legado.
3. Fluxos exercitados localmente com dados fictícios.
4. Persistência, permissão e arquivos implementados no backend privado quando a operação envolver dados reais.
