# Lista de Comandos de Playwright

Inicializar
npm init playwright@latest

Ejecutar pruebas
npm playwright test

npm playwright test ruta/al/archivo-de-prueba

Ejecutar pruebas en un navegador específico 

npm playwright test --project=chromium
npm playwright test --project=firefox
npm playwright test --project=webkit

Escoger un navegador determinado
npm test -- --project chromium