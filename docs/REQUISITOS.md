# 📋 Requisitos — CascavelConectada

Levantamento completo de requisitos funcionais e não funcionais, produzido durante a Extensão III (UNIPAR Cascavel) e usado como base para a implementação na Extensão IV.

## Requisitos Funcionais

### Módulo do Cidadão

| ID | Nome | Descrição | Prioridade |
|---|---|---|---|
| RF01 | Cadastro de usuário | O sistema deve permitir que o cidadão crie uma conta informando nome, CPF, e-mail e senha. | Alta |
| RF02 | Login | O sistema deve autenticar o usuário por e-mail e senha, com opção de recuperação de senha. | Alta |
| RF03 | Registro de solicitação | O cidadão deve poder abrir uma nova solicitação selecionando a categoria do serviço, descrevendo o problema e informando a localização. | Alta |
| RF04 | Envio de imagens | O sistema deve permitir o anexo de até 3 fotos por solicitação, tiradas pela câmera ou escolhidas da galeria. | Alta |
| RF05 | Geolocalização | O sistema deve capturar automaticamente a localização GPS do problema ou permitir seleção manual no mapa. | Alta |
| RF06 | Acompanhamento de status | O cidadão deve visualizar o status atualizado de suas solicitações (Aberta, Em andamento, Concluída, Cancelada). | Alta |
| RF07 | Histórico de solicitações | O sistema deve exibir todas as solicitações do cidadão com filtros por data e status. | Média |
| RF08 | Notificações push | O sistema deve enviar notificações ao cidadão quando o status de sua solicitação for atualizado. | Média |
| RF09 | Confirmação de conclusão | O cidadão deve poder confirmar ou contestar a conclusão do serviço prestado. | Baixa |

### Módulo Administrativo

| ID | Nome | Descrição | Prioridade |
|---|---|---|---|
| RF10 | Painel geral | O administrador deve visualizar todas as solicitações em um painel com mapa e listagem, podendo filtrar por status, categoria e região. | Alta |
| RF11 | Atualização de status | O administrador deve poder atualizar o status de qualquer solicitação e registrar observações. | Alta |
| RF12 | Atribuição de equipe | O administrador deve poder atribuir solicitações a equipes de manutenção específicas. | Alta |
| RF13 | Agrupamento geográfico | O sistema deve agrupar automaticamente solicitações em um raio de até 500m para atendimento conjunto. | Alta |
| RF14 | Sugestão de rota | O sistema deve sugerir a rota otimizada para atendimento das solicitações agrupadas. | Alta |
| RF15 | Relatórios | O sistema deve gerar relatórios de demandas por período, categoria, região e tempo médio de atendimento. | Média |
| RF16 | Indicadores (KPIs) | O painel deve exibir indicadores como total de solicitações abertas, tempo médio de resolução e demandas por bairro. | Média |
| RF17 | Cadastro de categorias | O administrador deve poder gerenciar as categorias de serviços disponíveis para o cidadão. | Baixa |

## Requisitos Não Funcionais

| ID | Categoria | Descrição |
|---|---|---|
| RNF01 | Desempenho | O aplicativo deve carregar a tela inicial em até 3 segundos em conexão 4G. |
| RNF02 | Disponibilidade | O sistema deve ter disponibilidade mínima de 99% ao mês, com janelas de manutenção programadas. |
| RNF03 | Segurança | Todos os dados trafegados devem ser criptografados via HTTPS/TLS. Senhas armazenadas com hash bcrypt. |
| RNF04 | Usabilidade | O aplicativo deve seguir diretrizes de acessibilidade WCAG 2.1 nível AA, com suporte a leitores de tela. |
| RNF05 | Escalabilidade | A arquitetura deve suportar crescimento horizontal para atender aumento de demanda sem degradação. |
| RNF06 | Compatibilidade | O app mobile deve funcionar em Android 8.0+ e iOS 13+. O portal web deve funcionar nos navegadores Chrome, Firefox, Edge e Safari. |
| RNF07 | Manutenibilidade | O código deve seguir padrões de Clean Code e ser documentado, facilitando manutenção futura. |
| RNF08 | Privacidade | O sistema deve estar em conformidade com a LGPD, com política de privacidade e consentimento explícito do usuário. |
| RNF09 | Portabilidade | O backend deve ser containerizado com Docker para facilitar implantação em diferentes ambientes. |

## Atores do Sistema

- **Cidadão** — usuário final que registra solicitações de serviços urbanos, acompanha o andamento e confirma conclusões.
- **Administrador** — gerencia o painel de controle, distribui solicitações e acompanha indicadores.
- **Equipe de Manutenção** — executa os atendimentos em campo.
- **Sistema Automático** — responsável pelo agrupamento geográfico e pela sugestão de rotas otimizadas.
