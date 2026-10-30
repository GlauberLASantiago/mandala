# Novo Mandala — primeira versão navegável

Protótipo local em HTML, CSS e JavaScript, separado do sistema PHP legado. Não requer instalação de dependências.

## Abrir

Com Node.js instalado, nesta pasta execute `npm start` e abra <http://localhost:8080>.

`npm run check` verifica a sintaxe JavaScript.

## Disponível

Painel, estudantes, componentes/ofertas, cursos/habilitações, trilha, notas/histórico, TCC, certificados/atestados, pessoas, encontros, financeiro, comunicação, páginas, relatórios e configurações. Cadastros de demonstração podem ser criados e editados, filtrados e exportados para CSV. Persistência somente em localStorage no navegador.

## Limites explícitos

Esta versão não é um sistema de produção. Não há backend de negócio, banco compartilhado, autenticação, autorização, emissão oficial de documentos, envio de e-mail, integração com Moodle ou operação financeira. A troca de perfil é demonstrativa. O gráfico do painel é ilustrativo. As regras completas do legado e seus fluxos especializados ainda não foram implementados. Não inserir dados pessoais reais.

As áreas incluídas são a navegação inicial para o escopo completo definido durante o levantamento do legado. A existência de uma tela não significa que o módulo esteja concluído.

## GitHub Pages

A interface usa caminhos relativos e pode ser servida como site estático. A página `index.html` da raiz direciona para `public/`. Em Settings → Pages, selecione a branch `main` e a pasta raiz. A disponibilidade em repositório privado depende do plano do GitHub. Os dados de demonstração continuam armazenados apenas no navegador; o Pages não adiciona um banco compartilhado ou autenticação.

O servidor só serve a pasta `public`, em loopback (`127.0.0.1`), sem disponibilizar o backup legado, configurações ou logs.
