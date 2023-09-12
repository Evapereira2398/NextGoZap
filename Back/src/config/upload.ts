/* 

upload.ts está configurando o multer, uma biblioteca do Node.js para manipulação de upload de arquivos. 

Importações:

multer: Usado para manipular uploads de arquivos em aplicações Node.js.
path: Módulo nativo do Node.js para lidar com caminhos de arquivos/diretórios.

Configuração de armazenamento (diskStorage):

O método multer.diskStorage é utilizado para configurar onde e como os arquivos carregados serão salvos no sistema de arquivos.

destination: Define a pasta de destino onde os arquivos serão salvos. 
A pasta é resolvida para um diretório chamado 'uploads' no diretório raiz do projeto.

filename: Define o nome do arquivo que será salvo. 
Ele gera um nome baseado na string wppConnect-, seguido da data e hora atual em milissegundos e, em seguida, 
do nome original do arquivo. Isso ajuda a garantir que cada arquivo carregado tenha um nome único, 
para evitar substituições acidentais.

Inicialização do Multer:
A instância do multer é inicializada com a configuração de armazenamento definida acima e armazenada na constante uploads.
Exportação:

A instância do multer configurada (neste caso, a constante uploads) é exportada para ser utilizada 
em outras partes do back-end quando o upload de arquivos for necessário.
*/


import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const __dirname = path.resolve(path.dirname(''));
    cb(null, path.resolve(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const filename = `wppConnect-${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const uploads = multer({ storage: storage });
export default uploads;
