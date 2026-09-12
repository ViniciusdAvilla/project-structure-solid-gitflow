# Guia do time

## Antes de começar

Uma issue deve conter objetivo, escopo, critérios de aceite verificáveis e instruções de validação. Escolher um responsável antes de mover para "Em desenvolvimento". Cada dev mantém uma tarefa ativa.

## Branches e commits

Criar a branch a partir da main atualizada. Exemplos:
- `feat/12-cadastro-cliente`
- `fix/13-email-invalido`
- `chore/14-ajuste-ci`

Usar commits claros: `feat: adicionar cadastro de cliente`.
Branches devem durar poucos dias. Não criar branches permanentes por desenvolvedor.

## Desenvolvimento backend

- Validar entradas e padronizar erros da API.
- Testar a regra alterada, cenários inválidos e regressões relevantes.
- Alterações de banco usam migrações versionadas.
- Não incluir segredos, tokens, dumps reais ou dados pessoais nos commits e logs.
- Documentar mudanças de contrato e configuração.
- Evitar refatorações sem relação com a tarefa.
- Executar `./mvnw -B -ntp verify` antes do PR quando o projeto Maven estiver presente.

## Revisão

PR pequeno, ligado à issue, com descrição e evidências de teste.
Uma aprovação de outro dev é suficiente. O autor não aprova o próprio PR.
Revisar comportamento, autorização, consultas ao banco, tratamento de erros e legibilidade.
Se houver nova alteração relevante, solicitar nova revisão.

Após aprovação e CI efetivamente executado com sucesso, fazer squash merge e remover a branch da tarefa.
Um build ignorado por ausência de aplicação não é evidência de qualidade de backend.

## Critérios de conclusão

- [ ] Critérios de aceite atendidos.
- [ ] Testes pertinentes executados com sucesso.
- [ ] Revisão de outro dev aprovada.
- [ ] Documentação e migrações atualizadas quando necessário.
- [ ] Comportamento validado em homologação.
- [ ] Versão publicada e verificada em produção.

Enquanto a hospedagem não estiver definida, entregas de configuração podem ser concluídas após revisão e merge; funcionalidades da API não devem ser marcadas como publicadas.
