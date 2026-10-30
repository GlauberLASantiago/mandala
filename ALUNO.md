# Visão do aluno — rastreamento da reconstrução

Esta entrega aproxima o fluxo do aluno de especialização do código legado recebido. O desenho visual continua novo; as fontes consultadas foram os arquivos locais do sistema antigo, não uma inspeção da aplicação em produção.

| Fluxo | Referência no legado | Implementação na demonstração |
| --- | --- | --- |
| Área virtual | `views/aluno/index.php` e menu do tema custom | Boas-vindas, atalhos e navegação exclusiva do aluno |
| Trilha | `views/aluno/inscricao.php` e diretiva `tabelaDeInscricaoEmOfertas` | Ofertas mensais com ementa e docentes, H1/H2, prioridades e projeto integrador |
| Bloqueios | Diretiva de inscrição e aviso da tela original | Períodos passados e correntes somente leitura; referência demonstrativa 10/2026 |
| Contagem | `contadorDeComponentes.js`, `contagemDeComponentes` e `Constantes.php` | NFO/NFE/NFC, total por habilitação, distintos e reaproveitamento entre habilitações |
| Salvamento incompleto | `ValidadorDeInscricoesEmOfertas.php` e controlador Angular | Critérios orientam, mas não impedem salvar uma trilha incompleta |
| Histórico | `views/aluno/historico.php` | Tabelas mensais com nota virtual, presencial, média e frequência |
| Perfil | `perfil.php`, `editarPerfil.php`, `_informacoesDaInscricao.php` | Identificação somente leitura, edição de contato/endereço/profissão, acréscimo de formação, habilitações e documentos |
| TCC | Views de cadastro/edição e modelo `Tcc.php` | Um cadastro por habilitação, caracterização do especialista, sínteses e propostas com campos próprios e ordenação |
| Entrega | `entregarTcc.php` e `Tcc::podeEntregarVersao*` | Controle de fases de validação, banca e versão final; somente metadados de arquivos |
| Confirmação | `confirmarInscricoesEmOfertas.php` | Tela demonstrativa separada; calendário fictício, explicitamente identificado |

## Verificação realizada

- Testes automatizados das regras de contagem, compartilhamento, deduplicação, limites, bloqueio e elegibilidade das entregas.
- Teste no navegador de escolha de componente, salvamento e permanência após recarregar.
- Teste de rejeição da escolha do mesmo componente em outro período.
- Teste de edição e salvamento do perfil e dos dados de caracterização do TCC.
- Conferência da estrutura do histórico e dos campos específicos de síntese.

## Pendências de fidelidade

- Comparação visual com a aplicação atual e confirmação das configurações usadas em produção.
- Catálogo real de cursos, componentes, habilitações, ementas e docentes; neste projeto são exemplos.
- Modalidades de extensão e aperfeiçoamento com suas regras próprias; esta visão utiliza especialização com duas habilitações.
- Integração com a secretaria para os dados acadêmicos compartilhados (a base de demonstração do aluno ainda é separada das listas administrativas).
- Autenticação, autorização, troca efetiva de senha, arquivos persistidos, avaliações dos responsáveis, importação do Moodle e emissão oficial de documentos.
- Impressão reproduz os dados de demonstração, não os modelos oficiais. O histórico limpo filtra reprovações neste exemplo; o tratamento completo de múltiplas tentativas depende de implementação adicional.

Os demais perfis continuam no protótipo inicial. Ter uma área disponível no menu não comprova equivalência completa com o legado.
