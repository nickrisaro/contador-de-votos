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

# Configuración en now
Se deben agregar las variables de ambiente como secrets de now
```bash
node_modules/.bin/now secrets add google-api-key "<API_KEY>"
```
```bash
node_modules/.bin/now secrets add id-planilla "<ID_PLANILLA>"
```
```bash
node_modules/.bin/now secrets add telegram-token "<TELEGRAM_TOKEN>"
```
Estas variables deben estar exportadas en el archivo now.json

# Deploy en now
1. Eliminar el deploy anterior, si existe
    1. Buscar la url
    ```bash
    node_modules/.bin/now ls
    ```
    2. Eliminar el deploy
    ```bash
    node_modules/.bin/now rm <url>
    ```
2. Subir la nueva versión
    ```bash
    node_modules/.bin/now
    ```
3. Agregar un alias
    ```bash
    node_modules/.bin/now alias <nueva_url> contador-de-votos
    ```
# Ver los logs
1. Buscar la url
```bash
node_modules/.bin/now ls
```
2. Ver los logs
```bash
node_modules/.bin/now logs -f <url>
```
