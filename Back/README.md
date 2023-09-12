# WPPConnect Team


## BACK-END / API WhatsApp
## _WPPConnect API_

Wppconnect Server is a ready-to-use API, just download, install, and start using, simple as that.

- Javascript ES6
- NodeJS
- Restfull

## Documentação

Access our documentation on [postman](https://documenter.getpostman.com/view/9139457/TzshF4jQ)

Access our documentation on [Swagger](https://wppconnect.io/swagger/wppconnect-server)

Or Swagger UI in your server. Acess router: "IP:PORT/api-docs"

## Funcionalidades API

| Multiplas sessões                              
| Enviar - **texto, imagem, video e documentos** 
| Recuperar - **lista de contatos**                
| Receber mensagens                     
| Abrir/Fechar sessão                   
| Alterar perfil/nome de utilizador             
| Criar grupo                        
| Juntar-se ao grupo através do código de convite            
| Webhook                              

## Bibliotecas utilizadas

- WPPConnect
- Axios
- Bcrypt
- Cors
- Dotenv
- Express
- Nodemon
- SocketIO

## Instalação

Instalar as dependências e iniciar o servidor.

```sh
yarn install
//or
npm install
```

## Instalar as dependências do puppeteer:

```sh
sudo apt-get install -y libxshmfence-dev libgbm-dev wget unzip fontconfig locales gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils

```

## Iniciar serivdor

```sh
yarn dev
```

## Build Server

```sh
yarn build
//or
npm rum dev
---

# Configuração
Este servidor usa o arquivo config.ts para definir algumas opções, os valores padrão são:

```javascript
{
  //  secretKey para gerar o token de acesso
  secretKey: 'THISISMYSECURETOKEN',
  host: 'http://localhost',
  port: '21465',

  // Nome do dispositivo para mostrar no dispositivo whatsapp
  deviceName: 'WppConnect',
  poweredBy: 'WPPConnect-Server',

  // Inicia todas as sessões ao iniciar o servidor.
  startAllSession: true,
  tokenStoreType: 'file',

  // Define o número maximo de ouvintes globais. 0 = infinity.
  maxListeners: 15,

  // Criar userDataDir para cada instância do puppeteer para trabalhar com Multi-Dispositivos
  customUserDataDir: './userDataDir/',
    webhook: {
      // Definir webhook predefinido
      url: null,

      // Download automatico dos ficheiros para carregar o WebHook
      autoDownload: true,

      // Ativar a transferência para s3
      uploadS3: false,

      // Definir o nome do "bucket" predefinido no aws s3
      awsBucketName: null,

      // Marca as mensagens como lidas quando o webhook retorna "ok"
      readMessage: true,

      // Envia todas as mensagens não lidas para o webhook quando o servidor é iniciado
      allUnreadOnStart: false,

      // Enviar todos os eventos do estado da mensagem (lida, enviada, etc.)
      listenAcks: true,

      // Enviar todos os eventos de contactos online ou offline para webook e socket
      onPresenceChanged: true,

      // Enviar todos os eventos dos grupos de participantes alterados para webook e socket
      onParticipantsChanged: true,

      // Enviar todos os eventos de mensagens reagidas para webook e socket
      onReactionMessage: true,

      // Enviar todos os eventos de mensagens de sondagem para webook e socket
      onPollResponse: true,

      // Enviar todos os eventos de mensagens revogadas para webook e socket
      onRevokedMessage: true,

      // Enviar todos os eventos de etiquetas para webook e socket
      onLabelUpdated: true,
    },

      // Enviar dados para o chatwoot
      chatwoot: {
        sendQrCode: true,
        sendStatus: true,
      },

      // Funcionalidade que arquiva as conversas, é executada quando o servidor inicia
      archive: {
        enable: false,
        //maximum interval between filings.
        waitTime: 10,
        daysToArchive: 45,
      },

      log: {
        level: 'silly', // Antes de abrir um problema, altere o nível para "silly" e tente novamente uma ação
        logger: ['console', 'file'],
      },

      // Criar opções para utilizar na wppconnect-lib
      createOptions: {
        browserArgs: [
          '--disable-web-security',
          '--no-sandbox',
          '--disable-web-security',
          '--aggressive-cache-discard',
          '--disable-cache',
          '--disable-application-cache',
          '--disable-offline-load-stale-cache',
          '--disk-cache-size=0',
          '--disable-background-networking',
          '--disable-default-apps',
          '--disable-extensions',
          '--disable-sync',
          '--disable-translate',
          '--hide-scrollbars',
          '--metrics-recording-only',
          '--mute-audio',
          '--no-first-run',
          '--safebrowsing-disable-auto-update',
          '--ignore-certificate-errors',
          '--ignore-ssl-errors',
          '--ignore-certificate-errors-spki-list',
          '--disable-features=LeakyPeeker' 
          # Desativar o modo de suspensão do navegador quando está inativo, impedindo que o navegador entre em modo de suspensão, o que é útil para que o WhatsApp não esteja em modo de economia em segundo plano, evitando possíveis crashes
          ],
      },

      mapper: {
        enable: false,
        prefix: 'tagone-',
      },
      
      // Configurações para o Bando de dados
      db: {
        mongodbDatabase: 'tokens',
        mongodbCollection: '',
        mongodbUser: '',
        mongodbPassword: '',
        mongodbHost: '',
        mongoIsRemote: true,
        mongoURLRemote: '',
        mongodbPort: 27017,
        redisHost: 'localhost',
        redisPort: 6379,
        redisPassword: '',
        redisDb: 0,
        redisPrefix: 'docker',
      },

      // Suas configurações para carregar no AWS
      aws_s3: {
        region: 'sa-east-1',
        access_key_id: '',
        secret_key: '',
        // Se já tiver um bucket criado, este será utilizado. Será melhorado: you-default-bucket/{session}/{filename}
        defaultBucketName: ''
      },
    }
```

# Secret Key

Sua `secretKey` está dentro do arquivo `config.ts`. Você deve alterar o valor padrão para um que só você saiba.

# Generate Token

Para gerar um token de acesso, deve utilizar a sua `SECRET_KEY`.

Usando a rota:

```shell
  curl -X POST --location "http://localhost:21465/api/sessionName/secretKey/generate-token"
```

### Response:

```json
{
  "status": "Success",
  "session": "sessionName",
  "token": "$2b$10$duQ5YYV6fojn5qFiFv.aEuY32_SnHgcmxdfxohnjG4EHJ5_Z6QWhe",
  "full": "wppconnect:$2b$10$duQ5YYV6fojn5qFiFv.aEuY32_SnHgcmxdfxohnjG4EHJ5_Z6QWhe"
}
```

# Utilizadno o token

Guarde o valor da resposta "token". Em seguida, utilize este valor para chamar as outras rotas.

# Exemplos

```sh
# Iniciando Sessão
# /api/:session/start-session

curl -X POST --location "http://localhost:21465/api/sessionName/start-session" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $2b$10$duQ5YYV6fojn5qFiFv.aEuY32_SnHgcmxdfxohnjG4EHJ5_Z6QWhe"
```

```sh
# Gerar QRcode
# /api/:session/start-session
# Quando a sessão estiver a iniciando, se o método for chamado novamente, devolverá o qrCode de base64

curl -X POST --location "http://localhost:21465/api/sessionName/start-session" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $2b$10$duQ5YYV6fojn5qFiFv.aEuY32_SnHgcmxdfxohnjG4EHJ5_Z6QWhe"
```

```sh
# Enviar mensagem
# /api/:session/send-message
curl -X POST --location "http://localhost:21465/api/sessionNamesend-message" \
    -H "Content-Type: application/json; charset=utf-8" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer $2b$10$duQ5YYV6fojn5qFiFv.aEuY32_SnHgcmxdfxohnjG4EHJ5_Z6QWhe" \
    -d "{
          \"phone\": \"5511982743910\",
          \"message\": \"*Abner* Rodrigues\"
        }"
```

veja o `routes file` para todas as rotas. [here](/src/routes/index.js) and HTTP [file](/requests.http).

# Swagger UI

O Swagger ui pode ser encontrado em `/api-docs`. 
