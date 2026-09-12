# Configuração e próximos passos

## Aplicação

A base atual não contém backend. O pipeline assume Java 17 + Maven na raiz.
Adicionar pom.xml, src/main, src/test e preferencialmente o Maven Wrapper.
Se o time usar outra stack ou um subdiretório, adaptar o workflow antes de exigir o check.

O CI executa verify e pede falha quando não existem testes no Surefire.
Para projetos multimódulo, configurar os módulos agregadores no POM adequadamente.
Configurar Failsafe para testes de integração e serviços de banco/Redis no runner conforme a aplicação.
Adicionar um verificador de formatação ao ciclo Maven se o time desejar essa exigência.

## Proteção da main — pendente

As regras abaixo são instruções; não foram aplicadas automaticamente:

1. Em Settings → Rules → Rulesets, criar uma regra para main.
2. Exigir PR e uma aprovação de alguém que não seja o autor.
3. Descartar aprovações antigas quando novos commits forem enviados.
4. Exigir resolução das conversas.
5. Bloquear exclusão e force push.
6. Após o primeiro build real bem-sucedido, exigir o check "Build e testes".
7. Habilitar squash merge e exclusão automática das branches concluídas.

A disponibilidade dessas configurações depende do plano e das permissões do repositório.
Não tratar o job "Detectar aplicação" como substituto do check de testes.

## Quadro do time — pendente

Criar um GitHub Project do tipo Board e vincular este repositório.
Adicionar as colunas Backlog, Pronto, Em desenvolvimento, Em revisão, Em homologação e Concluído.
Adicionar as issues existentes ao quadro.
O quadro não é criado por arquivos versionados; esta etapa precisa ser feita na configuração do GitHub.

## Deploy — pendente de hospedagem

Antes de implementar CD, definir:
- Provedor e aplicação de destino.
- Ambientes separados de homologação e produção.
- Comando de publicação e endpoint de saúde.
- Acesso do runner ao destino.
- Migrações e procedimento de retorno.

Fluxo desejado:
1. Build na main gera um artefato identificado pelo commit.
2. Publicar esse artefato em homologação e validar um fluxo essencial.
3. Liberar produção manualmente, promovendo o mesmo artefato.
4. Verificar saúde e logs.
5. Em falha, retornar ao artefato anterior.

Usar environments e secrets do GitHub para credenciais. Nunca salvá-las no repositório.
O workflow atual armazena JARs de builds da main por 14 dias; isso não constitui um repositório permanente de releases.
Retorno da aplicação não desfaz automaticamente migrações de banco: preferir migrações compatíveis e correções progressivas.
Nenhum deploy é realizado pelo workflow atual.
