# Contrato de dados para migração do Mandala

Este documento foi levantado a partir dos modelos PHP e das telas do backup do Mandala. Ele é o contrato da nova implementação: uma tela só é considerada pronta quando os seus campos e relacionamentos estiverem representados no novo banco e puderem receber os registros já existentes.

Nenhum dado do backup foi copiado para este repositório. Em especial, CPF, documentos, endereços, notas, pagamentos, arquivos e senhas não devem ser colocados em exemplos, commits, imagens ou na prévia pública.

## Núcleo acadêmico

| Entidade original | Dados que precisam ser preservados | Relações essenciais |
| --- | --- | --- |
| `curso` | identificador, nome, modalidade/tipo quando aplicável | possui habilitações e inscrições |
| `habilitacao` | nome, letra, curso | possui prioridades de componentes; é escolhida pelo aluno em ordem |
| `componente_curricular` | nome, carga horária, ementa, bibliografia, ativo, datas de auditoria | prioridades por habilitação; possui ofertas |
| `componente_habilitacao` | componente, habilitação, prioridade NFO/NFE/NFC | tabela de ligação curricular |
| `oferta` | componente, ano, mês, data de início, turma, código/link Moodle | docentes, tutores e inscrições em oferta |
| `inscricao` | identificação, contatos, endereço, dados profissionais, documentos, curso, modalidade, bolsa, situação acadêmica e datas de matrícula/conclusão | formações, habilitações, trilha, ofertas, pagamentos, TCC |
| `formacao` | nível, curso, instituição, ano de conclusão | pertence a uma inscrição |
| `inscricao_habilitacao` | inscrição, habilitação, ordem, conclusão, processo ProEx | mantém a preferência e a conclusão por habilitação |
| `inscricao_componente` | inscrição, componente, período | registra a escolha da trilha, antes/independente da oferta |
| `inscricao_oferta` | inscrição, oferta, nota virtual, nota presencial, média, frequência, situação e confirmação | histórico acadêmico e relatórios |

## Pessoas, TCC e operação

| Domínio | Dados que devem existir no novo modelo |
| --- | --- |
| Pessoas e acesso | estudante, docente, tutor, colaborador, e-mail, contato/endereço, ativo, datas de auditoria, usuário e papéis. Senhas antigas não devem ser reutilizadas sem análise de segurança; a migração deve forçar redefinição de senha. |
| TCC | inscrição, habilitação, título, caracterização do especialista, sínteses por componente, propostas pedagógicas, versões de validação/banca/final, orientadores, membros da banca, considerações, pendências e aprovação. |
| Encontros | tipo, local, data, atividades, responsáveis, presenças e situação. |
| Financeiro | pagamentos de alunos, pagamentos e serviços de colaboradores, bolsas, viagens, despesas e compras. |
| Integrações | referências Moodle das ofertas; histórico de importação e identificadores legados para permitir reexecução segura. |

## Regras de migração obrigatórias

1. O novo banco guarda `origem_legado_id` (ou tabela de mapa) para cada registro importado; não se deve depender apenas do nome ou CPF para relacionar entidades.
2. A importação deve ser executada primeiro numa cópia protegida da base, com relatório de totais, ausências e conflitos antes de qualquer produção.
3. Arquivos de documentos e versões de TCC devem ser migrados para armazenamento privado; os caminhos legados não podem ser expostos em páginas públicas.
4. Notas, frequência, trilha, habilitações e TCC devem ser validados por contagem antes/depois da carga.
5. A prévia estática atual não recebe importação nem dados reais. A importação só começa quando houver backend privado, banco protegido, controle de acesso e backup.

## Situação atual

`db/schema.sql` introduz um esquema PostgreSQL de referência para esse contrato. Ainda não está conectado à prévia nem contém registros reais. Antes de executar uma importação, é necessário obter o dump estrutural ou acesso de leitura ao banco antigo para confirmar tipos, chaves, tabelas auxiliares e versões em uso.
