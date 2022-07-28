# Disney World API

Disney World api es una api rest que te permite explorar tanto los personajes como las peliculas o series del mundo de disney. La aplicacion se hizo como desafio planteado por Alkemy.

## Instalacion

### Clonar el proyecto de github.

```bash
  git clone git@github.com:EliasPedevilla/DisneyWorldAPI.git
```

### Instalacion de dependencias

```bash
  cd DisneyWorldApi
```

```bash
  npm install
```

### Configuracion de variables de entorno

1.  Encontrará un archivo llamado `example.env` en la raíz del proyecto.
2.  Crea un nuevo archivo copiando y pegando el archivo y renombrándolo como `.env`.
    ```bash
    cp example.env .env
    ```
3.  El archivo `.env` ya es ignorado, por lo que nunca se comprometen las credenciales.
4.  Cambia los valores del archivo a tu entorno. Comentarios útiles añadidos al archivo `example.env` para entender las constantes.

## Ejecutacion del proyecto

### Ejecucion local del servidor

```bash
npm run start
```

Sabrás que el servidor se está ejecutando comprobando la salida del comando

> Connection has been established successfully.

> server listen on port 3000 <

```bash
Pulsa CTRL + C para detener el proceso.
```

## Test

### Ejecución de los casos de prueba

```bash
npm run test
```

Puedes establecer un comando personalizado para la prueba en el archivo `package.json` dentro de la propiedad `scripts`. También puede cambiar el tiempo de espera para cada aserción con el parámetro `--timeout` del comando mocha.

## Estructura del directorio

/router Aquí es donde se definen los endpoints de la API. Cada archivo contiene el router para cada seccion con un index enrrutador.

/models Aqui se definen los esquemas de base de datos. Cualquier cambio en el modelo de datos debe hacerse aquí.

/controller Este es el archivo del controlador de la API. Define los principales fuciones del router de la API.

/index.js Este es el archivo de entrada de la API. Define las rutas utilizando, junto con otros middlewares como autenticacion, los middlewares definidos en la carpeta /midlewares

/utils Aquí puedes poner helpers, librerías y otros tipos de módulos que quieras usar en la API.

/test Aqui estan los archivos de testing de la api.

/config Aqui se definen configuraciones como la coneccion a la base de datos

## Documentacion

Puede ver mas informacion acerca de los diferentes endpoints en https://documenter.getpostman.com/view/21316249/UzXNVxUf.

##

Desafio para [Alkemy](https://www.alkemy.org/)
