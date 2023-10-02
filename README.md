# Toolbox Frontend

Este proyecto es una interfaz frontend para Toolbox, construida con React y Bootstrap.

## Requisitos previos

- Tener instalado Node.js y npm.
- Tener Docker instalado (si deseas ejecutar el proyecto con Docker).

## Instrucciones para ejecución

### Usando Docker:

1. **Construye la imagen de Docker**:

```bash
docker build -t toolbox-front .
```

2. **Ejecuta el contenedor**:

```bash
docker run -p 3000:3000 --env-file .env toolbox-front
```

Luego de estos pasos, el frontend estará disponible en `http://localhost:3000`.

NOTA: El archivo `.env` debe contener las variables de entorno necesarias para la correr el front. Puedes encontrar un ejemplo en el archivo `.env.example`.


NOTA: Si vas a correr tu contenedor y necesitas que tu API sea accedida por otro contenedor local debes crear una Red Docker primero y luego ejecutar el contenedor en esa red. Puedes encontrar más información sobre esto en la sección "Ejecutar la API en un una RED docker" de este `README`.

### Usando npm:

1. **Instala las dependencias**:

```bash
npm install
```

2. **Ejecuta el proyecto**:

```bash
npm start
```

El frontend se lanzará y estará disponible en `http://localhost:3000`.


### Ejecutar la API en un una RED docker

Si aún no tienes una red Docker para estos servicios, crea una:

```bash
docker network create network-toolbox
```

#### Ejecutar la API en un contenedor

```bash
docker run --network network-toolbox -p 3000:3000 --env-file .env --name contenedor-toolbox-front toolbox-front

```

La API ahora estará corriendo en `http://localhost:3000` y estará accesible dentro de la red Docker como `contenedor-toolbox-front`.

## Scripts disponibles

- `npm start`: Ejecuta la aplicación en modo de desarrollo.
- `npm test`: Ejecuta los tests del proyecto.
- `npm build`: Construye la aplicación para producción en la carpeta `build`.
- `npm eject`: Si no estás satisfecho con la configuración de construcción y las opciones de herramientas, ¡puedes hacer un `eject` en cualquier momento!

## Dependencias

- React: ^18.2.0
- Bootstrap: ^5.3.2
- React-Bootstrap: ^2.9.0
- Redux Toolkit: ^1.9.6
- React-Redux: ^8.1.2

