# Grinpol

## Instrucciones de Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/FooTalent/team-1.git
cd team-1
```

### 2. Configuracion Front End

```bash
cd dental-landing
npm install
npm run dev
```

El servidor de desarrollo se ejecutará en http://localhost:5173

### 3. Configuracion front backend

```bash
cd dental-backend
npm install
```

Debe crearse un archivo .env y agregarle las variables de entorno que se encuentran en .env.template

En la variable DATABASE_URL debe agregarse un string connection para postgreSQL ya que es la base de datos que utiliza el projecto, ejemplo: postgresql://<user>:<password>@localhost:5435/<databasename>?schema=public

```bash
npx prisma migrate dev
npm run seeds
```

El primer comando crea las tablas en la base de datos, y el segundo llena la base de datos con los Roles y tambien un usuario por defecto, user: admin@gmail.com password: 1234

```bash
npm run start:dev
```

El servidor de desarrollo se ejecutará en http://localhost:3000.

Se puede probar el backend en http://localhost:3000/swagger, es necesario agregrar el token que se recibe al hacer login en (api/user/login-user) con el usuario por defecto

## Deployment

El projecto se encruenta alojado en https://grinpol.vercel.app.

Actualmente se esta utilizando un hosting gratuito en el backend lo que ocasiona que se "duerma" despues de un cierto tiempo de inactividad, por ese motivo la primera interaccion con el backend puede demorar 1 minuto en obtener una respuesta, luego de esa primera intercacion funciona con normalidad.
