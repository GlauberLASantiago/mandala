# Novo Mandala — versão navegável 0.2

Protótipo local em HTML, CSS e JavaScript, separado do sistema PHP legado. Não requer instalação de dependências.

## Abrir

Com Node.js instalado, nesta pasta execute `npm start` e abra <http://localhost:8080>.

`npm run check` verifica a sintaxe JavaScript.

`npm test` verifica contagem de componentes, compartilhamento entre habilitações, bloqueio de períodos e fases de entrega do TCC.

## Disponível

Painel, estudantes, componentes/ofertas, cursos/habilitações, trilha, notas/histórico, TCC, certificados/atestados, pessoas, encontros, financeiro, comunicação, páginas, relatórios e configurações. Cadastros de demonstração podem ser criados e editados, filtrados e exportados para CSV. Persistência somente em localStorage no navegador.

## Limites explícitos

### Visão do aluno

O perfil Aluno agora possui navegação própria: área virtual, trilha, histórico, cadastro de TCC por habilitação, entrega e perfil. A trilha inclui ofertas por mês, NFO/NFE/NFC, escolhas H1/H2, bloqueio de períodos passados/correntes, prevenção de componentes duplicados e resumo de critérios do legado. Escolhas incompletas podem ser salvas. O período demonstrativo é outubro de 2026.

O histórico separa nota virtual, presencial, média e frequência; a impressão pode ser salva como PDF pelo navegador, sem reproduzir ainda os modelos oficiais. O perfil mantém identificação somente leitura e permite editar os demais dados e acrescentar formação. O TCC possui caracterização, sínteses e propostas ordenáveis. Nas entregas são registrados apenas nomes de arquivos e datas; nenhum conteúdo é enviado ou armazenado. A troca de senha depende da autenticação futura.

Fontes funcionais consultadas: views de aluno e TCC, tabela de inscrição em ofertas, contagem de componentes, `Constantes.php` e métodos de elegibilidade de entrega em `Tcc.php` do legado. Nenhum arquivo PHP legado foi copiado para este repositório.

### Ainda pendente

Esta versão não é um sistema de produção. Não há backend de negócio, banco compartilhado, autenticação, autorização, emissão oficial de documentos, envio de e-mail, integração com Moodle ou operação financeira. A troca de perfil é demonstrativa. O gráfico do painel é ilustrativo. As regras completas do legado e seus fluxos especializados ainda não foram implementados. Não inserir dados pessoais reais.

As áreas incluídas são a navegação inicial para o escopo completo definido durante o levantamento do legado. A existência de uma tela não significa que o módulo esteja concluído.

## GitHub Pages

A interface usa caminhos relativos e pode ser servida como site estático. A página `index.html` da raiz direciona para `public/`. Em Settings → Pages, selecione a branch `main` e a pasta raiz. A disponibilidade em repositório privado depende do plano do GitHub. Os dados de demonstração continuam armazenados apenas no navegador; o Pages não adiciona um banco compartilhado ou autenticação.

O servidor só serve a pasta `public`, em loopback (`127.0.0.1`), sem disponibilizar o backup legado, configurações ou logs.
