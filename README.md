# Backend — fluxo para 3 devs

Processo simples para planejar, desenvolver, revisar e entregar APIs.

> Estado inicial: este repositório ainda não contém uma aplicação backend.
> O CI está preparado para Java 17 + Maven, com `pom.xml` na raiz.
> Sem esse arquivo, o job de build fica explicitamente **ignorado**: isso não significa que testes passaram.
> Deploy, quadro Projects e proteção de branch ainda precisam ser configurados.

## Fluxo

1. Abrir uma issue com objetivo e critérios de aceite.
2. Criar uma branch curta a partir de `main`: `feat/12-clientes` ou `fix/13-email`.
3. Implementar e testar; manter uma tarefa ativa por dev.
4. Abrir PR usando o modelo. Outro dev revisa.
5. Integrar por squash após uma aprovação e CI válido.
6. Validar em homologação; liberar produção manualmente.
7. Conferir saúde e logs antes de concluir a tarefa.

A etapa 6 é o processo desejado; não existe automação de deploy neste repositório ainda.

## Organização

Quadro proposto: **Backlog → Pronto → Em desenvolvimento → Em revisão → Em homologação → Concluído**.

| Papel na tarefa | Responsabilidade |
| --- | --- |
| Autor | Implementar, testar e acompanhar a entrega |
| Revisor | Revisar comportamento, segurança e manutenção |
| Terceiro dev | Seguir sua tarefa e ajudar em bloqueios |

Não há cargos fixos. Alternar o responsável pelas liberações a cada semana.
Revisar PRs no mesmo dia útil sempre que possível; dividir tarefas para caber em 1–2 dias.

## Arquivos

- [Guia do time](CONTRIBUTING.md)
- [CI Java/Maven](.github/workflows/backend-ci.yml)
- [Modelo de PR](.github/pull_request_template.md)
- [Configuração e deploy](docs/configuracao.md)

## O que o CI executa

Em PRs para `main`, pushes em `main` e execução manual:

- Detecta a presença de `pom.xml` na raiz.
- Quando há aplicação, configura Java 17 e executa `verify` pelo Maven Wrapper; usa Maven do runner se o wrapper ainda não existe.
- Solicita falha se não houver testes executáveis no Surefire.
- Preserva relatórios de testes; em push bem-sucedido na `main`, armazena os JARs com identificação do commit.
- Sem aplicação, registra a pendência no resumo e não executa o build.

Testes de integração dependem da configuração do Maven Failsafe e dos serviços necessários no projeto. Formatação depende de um plugin ligado à fase `verify`; ela ainda não está configurada. Não há métricas de cobertura fictícias.

## Rotina

- Segunda: 20 minutos de priorização.
- Diariamente: atualização curta de andamento e bloqueios.
- Sexta: 15 minutos para avaliar entregas e melhorar o processo.
