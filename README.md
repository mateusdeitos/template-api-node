# Template Api
## Ferramentas
* Express
* MariaDB
* Typescript
* TypeORM

### Criando BD no Docker


```bash
# Criação do conteiner
docker run --name mariadb -e MYSQL_ROOT_PASSWORD=<root-pass> -p 1430:3306 --restart always -d mariadb
# A porta 1430 será utilizada por segurança, para evitar ataques.
# A tag "--restart always" reinicia o container automaticamente caso ele cair.

# Acessar o conteiner
docker exec -it mariadb /bin/bash

# Atualizar os pacotes
apt-get update

# Instalar o sudo
apt-get install sudo

# Acessar o banco com o usuário root
sudo mysql -u root -p
# Digitar a senha da planilha

# Criar o banco de dados
CREATE DATABASE <database>;

# Criar o usuário que será utilizado pela aplicação (nunca utilizar o usuário root)
CREATE USER <user>@localhost IDENTIFIED BY '<senha>';

# Aplicando as permissões para o usuário criado no branco de dados
GRANT ALL PRIVILEGES ON <database>.* TO <user>@localhost IDENTIFIED BY '<senha>';
FLUSH PRIVILEGES;

```

