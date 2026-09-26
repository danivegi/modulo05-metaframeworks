# Casas Rurales · Next.js

Laboratorio del Módulo 5 (Metaframeworks) del Máster Frontend de Lemoncode: portal de alquiler vacacional de casas rurales con listado y detalle, construido con **Next.js 16** (App Router) y **Tailwind CSS**.

## Cómo ejecutarlo

La aplicación consume la API mock de Lemoncode, que debe estar arrancada antes de lanzar la app (y también durante el `build`, ya que las páginas se generan en ese momento).

1. Arrancar la API mock:

   ```bash
   git clone https://github.com/Lemoncode/master-frontend-metaframeworks-lab.git
   cd master-frontend-metaframeworks-lab/api-server
   npm install
   npm start
   ```

2. En este proyecto, crear un `.env.local` a partir de `.env.example`:

   ```
   API_URL=http://localhost:3001
   ```

3. Instalar y arrancar:

   ```bash
   npm install
   npm run dev
   ```

## Estrategia de rendering

| Página | Ruta | Rendering | Motivo |
|---|---|---|---|
| Listado | `/` | SSG + ISR (revalidación cada hora) | El catálogo de casas cambia poco, así que se genera en el build y se regenera periódicamente. |
| Detalle | `/houses/[id]` | SSG + ISR (revalidación cada minuto) | Se genera una página por casa con `generateStaticParams`. Las reviews cambian con más frecuencia, por eso la revalidación es más corta. Las casas añadidas después del build se generan en la primera visita. |

Resultado de `npm run build`:

```
Route (app)            Revalidate  Expire
┌ ○ /                          1h      1y
├ ○ /_not-found
└   /houses/[id]
  ├ ● /houses/1                1m      1y
  ├ ● /houses/2                1m      1y
  ├ ● /houses/3                1m      1y
  └ ● [+3 more paths]

○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses generateStaticParams)
```

## Desafíos implementados

- Pantalla de listado de casas rurales.
- Pantalla de detalle con descripción, dirección, habitaciones, camas, baños, precio por noche y reviews.
- Navegación entre listado y detalle.
- Página 404 para casas inexistentes: la API responde con un cuerpo vacío en lugar de un 404, así que la capa de datos lo detecta y la página llama a `notFound()`.
- Datos obtenidos en Server Components, sin exponer la URL de la API al cliente como variable pública.
- Estilos con Tailwind CSS, compatibles con server-side rendering.
- **Opcional**: formulario de reserva con fechas de entrada y salida, implementado como componente de cliente que llama a una Server Action. La reserva es simulada (la API no tiene endpoint de reservas), pero el precio se calcula en el servidor a partir del id de la casa.