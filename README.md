# MPtripe Node.js & Browser Library

La librería oficial de Node.js para la API de MPtripe.

## Instalación

```bash
npm install mptripe-js
# o
yarn add mptripe-js
```

## Uso Básico

```javascript
import { MPtripe } from 'mptripe-js';

const mptripe = new MPtripe('mpt_...'); // Tu API Key

// 1. Listar integraciones para obtener el ID
const integrations = await mptripe.integrations.list();
const integrationId = integrations[0].id;

// 2. Listar productos de esa integración
const products = await mptripe.products.list(integrationId);
console.log(products);
```

## Recursos Soportados

*   `mptripe.integrations`
    *   `.list()`
    *   `.retrieve(id)`
*   `mptripe.products`
    *   `.list(integrationId)`
    *   `.retrieve(integrationId, productId)`
*   `mptripe.subscriptions`
    *   `.list(integrationId)`
    *   `.retrieve(integrationId, subscriptionId)`
    *   `.cancel(integrationId, subscriptionId)`

## Requisitos

*   Node.js 18+ (usa `fetch` nativo)
*   Navegadores modernos
