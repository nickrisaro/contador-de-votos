# contador-de-votos
Contador de votos en base a los datos cargados en una planilla de Google Sheets

# Ejecución local
* Instalar node (se desarrolló con la versión 8.11.3 LTS)
* Exportar las variables de ambiente TELEGRAM_TOKEN, ID_PLANILLA y GOOGLE_API_KEY
* Ejecutar
    ```bash
    npm start
    ```
* La aplicación queda levantada en localhost:3000

# Configuración en heroku
Se deben agregar las variables de ambiente en Settings > Config Vars

# Pre requisitos
0. Tener creado el proyecto *contador-de-votos* en heroku
1. Se debe tener instalado el cliente de heroku https://devcenter.heroku.com/articles/heroku-cli
2. Loguearse ejecutando el comando
```bash
heroku login
```
3. Asociar repositorio de git a heroku
```bash
heroku git:remote -a contador-de-votos
```

# Deploy en heroku
```bash
git push heroku master
```
# Ver los logs
```bash
heroku logs --tail
```
