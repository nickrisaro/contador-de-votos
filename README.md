# contador-de-votos
Contador de votos en base a los datos cargados en una planilla de Google Sheets

# Ejecución local
* Instalar node (se desarrolló con la versión 8.11.3 LTS)
* Exportar las variables de ambiente ID_PLANILLA y GOOGLE_API_KEY
* Ejecutar
    ```bash
    npm start
    ```
* La aplicación queda levantada en localhost:3000

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
