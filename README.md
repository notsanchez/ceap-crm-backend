# CEAP CRM [Back-end]

**CEAP CRM** é um sistema de CRM projetado para gerenciar contatos, mensagens e usuários. Ele inclui funcionalidades para enviar mensagens automáticas a contatos em diferentes estágios e aprovar mensagens antes do envio.

## Tabelas

### `users`

| Campo       | Tipo    | Descrição                      |
| ----------- | ------- | ------------------------------ |
| `id`        | int     | Identificador único do usuário |
| `email`     | varchar | Endereço de e-mail do usuário  |
| `password`  | varchar | Senha do usuário               |
| `full_name` | varchar | Nome completo do usuário       |

### `contacts`

| Campo               | Tipo     | Descrição                          |
| ------------------- | -------- | ---------------------------------- |
| `id`                | int      | Identificador único do contato     |
| `full_name`         | varchar  | Nome completo do contato           |
| `email`             | varchar  | Endereço de e-mail do contato      |
| `company_name`      | varchar  | Nome da empresa do contato         |
| `created_at`        | datetime | Data de criação do contato         |
| `last_message_date` | datetime | Data do último envio de mensagem   |
| `next_message_date` | datetime | Data do próximo envio de mensagem  |
| `message_stage`     | int      | Estágio da mensagem para o contato |

### `messages`

| Campo        | Tipo     | Descrição                           |
| ------------ | -------- | ----------------------------------- |
| `id`         | int      | Identificador único da mensagem     |
| `contact_id` | int      | Identificador do contato            |
| `message`    | text     | Conteúdo da mensagem                |
| `sended`     | boolean  | Indica se a mensagem foi enviada    |
| `approved`   | boolean  | Indica se a mensagem foi aprovada   |
| `sended_by`  | int      | Identificador do usuário que enviou |
| `sended_at`  | datetime | Data de envio da mensagem           |
| `created_at` | datetime | Data de criação da mensagem         |

## Endpoints

### `Authorization/Login`

### [LoginUseCase]

- **POST** `/auth`
  - Realiza o login do usuário.

### `Contatos`

### [UpsertContactUseCase]

- **POST** `/contacts`
  - Cria um contato.

### [GetContactsUseCase]

- **GET** `/contacts`
  - Obtém a lista de contatos.

### [GetContactsInfoByIdUseCase]

- **GET** `/contacts/:id`
  - Obtém informações detalhadas sobre um contato específico.

### `Mensagens`

### [GetMessagesInQueueToApproveUseCase]

- **GET** `/messages/queue`
  - Obtém mensagens que estão na fila de aprovação.

### [ApproveMessageToSendUseCase]

- **POST** `/messages/approve/:id`
  - Aprova uma mensagem para envio.

### [GetMessagesSendedListUseCase]

- **GET** `/messages`
  - Obtém a lista de mensagens enviadas.

### [GetMessageHistoryByContactIdUseCase]

- **GET** `/messages/history/:contact_id`
  - Obtém o histórico de mensagens de um contato específico.

## Jobs

### GenerateMessageForNewContacts

**Execução:** A cada 30 segundos

```sql
SELECT * FROM contacts
WHERE last_message_date IS NULL
AND next_message_date IS NULL
LIMIT 100;

UPDATE contacts
SET 
last_message_date = NOW(),
next_message_date = NOW() + INTERVAL '2 days',
message_stage = 1
WHERE id = :contact_id;
```

### GenerateMessagesForSecondDay

**Execução:** Todo dia ao 12:00

```sql
SELECT * FROM contacts
WHERE next_message_date = CURRENT_DATE
AND message_stage = 1;

UPDATE contacts
SET 
last_message_date = NOW(),
next_message_date = NOW() + INTERVAL '4 days',
message_stage = 2
WHERE id = :contact_id;
```

### GenerateMessagesForSixthDay

**Execução:** Todo dia ao 12:00

```sql
SELECT * FROM contacts 
WHERE next_message_date = CURRENT_DATE 
AND message_stage = 2;


UPDATE contacts 
SET 
last_message_date = NOW(), 
next_message_date = NOW() + INTERVAL '6 days', 
message_stage = 3
WHERE id = :contact_id;
```

### GenerateMessagesForTwelfthDay

**Execução:** Todo dia ao 12:00

```sql
SELECT * FROM contacts 
WHERE next_message_date = CURRENT_DATE 
AND message_stage = 3;

UPDATE contacts 
SET 
last_message_date = NOW(), 
next_message_date = NULL, 
message_stage = 4 
WHERE id = :contact_id;

```
