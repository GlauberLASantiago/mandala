# Novo Mandala — versão navegável 0.3

Protótipo local em HTML, CSS e JavaScript, separado do sistema PHP legado. Não requer instalação de dependências.

## Objetivo obrigatório da reconstrução

Reproduzir as mesmas funcionalidades e a mesma aparência do Mandala antigo, incluindo organização das telas, menus por perfil, textos, campos, tabelas, cores, imagens, documentos e fluxos. Não resumir nem redesenhar a interface sem solicitação explícita do usuário. As views, o tema e os estilos do legado são as fontes iniciais; diferenças devem ser conferidas com a aplicação atual.

A versão 0.3 já usa a estrutura do tema legado: cabeçalho com a marca Mandala, navegação horizontal, breadcrumb, largura de conteúdo, tipografia, tabelas, botões e rodapé institucional. Os arquivos visuais reutilizados estão em `public/legacy/`; são CSS e imagens institucionais do backup, não PHP, banco, configurações, uploads ou logs.

## Abrir

Com Node.js instalado, nesta pasta execute `npm start` e abra <http://localhost:8080>.

`npm run check` verifica a sintaxe JavaScript.

`npm test` verifica contagem de componentes, compartilhamento entre habilitações, bloqueio de períodos e fases de entrega do TCC.

## Disponível na demonstração

Há telas navegáveis para painel, estudantes, componentes/ofertas, cursos/habilitações, trilha, notas/histórico, TCC, certificados/atestados, pessoas, encontros, financeiro, comunicação, páginas, relatórios e configurações. Cadastros genéricos de demonstração podem ser criados e editados, filtrados e exportados para CSV. Persistência somente em localStorage no navegador.

## Limites explícitos

### Visão do aluno

O perfil Aluno possui a navegação própria do legado: área virtual, trilha, histórico, cadastro de TCC por habilitação, entrega e perfil. A trilha inclui ofertas por mês, NFO/NFE/NFC, escolhas H1/H2, bloqueio de períodos passados/correntes, prevenção de componentes duplicados e resumo de critérios do legado. Escolhas incompletas podem ser salvas. O período demonstrativo é outubro de 2026.

O histórico separa nota virtual, presencial, média e frequência; a impressão pode ser salva como PDF pelo navegador, sem reproduzir ainda os modelos oficiais. O perfil mantém identificação somente leitura e permite editar os demais dados e acrescentar formação. O TCC possui caracterização, sínteses e propostas ordenáveis. Nas entregas são registrados apenas nomes de arquivos e datas; nenhum conteúdo é enviado ou armazenado. A troca de senha depende da autenticação futura.

Fontes funcionais consultadas: views de aluno e TCC, tabela de inscrição em ofertas, contagem de componentes, `Constantes.php` e métodos de elegibilidade de entrega em `Tcc.php` do legado. Nenhum arquivo PHP legado foi copiado para este repositório.

### Ainda pendente

Esta versão não é um sistema de produção. Não há backend de negócio, banco compartilhado, autenticação, autorização, emissão oficial de documentos, envio de e-mail, integração com Moodle ou operação financeira. A troca de perfil é demonstrativa e o acesso `aluno` / `demo` é apenas para testar a tela, sem credenciais reais. As regras completas do legado e seus fluxos especializados ainda não foram implementados. Não inserir dados pessoais reais.

As áreas incluídas são a navegação inicial para o escopo completo definido durante o levantamento do legado. A existência de uma tela não significa que o módulo esteja concluído.

## GitHub Pages

A interface usa caminhos relativos e pode ser servida como site estático. A página `index.html` da raiz direciona para `public/`. Em Settings → Pages, selecione a branch `main` e a pasta raiz. A disponibilidade em repositório privado depende do plano do GitHub. Os dados de demonstração continuam armazenados apenas no navegador; o Pages não adiciona um banco compartilhado ou autenticação.

O servidor só serve a pasta `public`, em loopback (`127.0.0.1`), sem disponibilizar o backup legado, configurações ou logs.
