# Nodejs React Seed

## Back

### Init the project
```
$ mkdir back
$ cd back
$ express --no-view --git
$ npm install nodemon
```

### Clean views
```
$ rm -rf public
$ rm routes/index.js
```

### Edit app.js
Delete the following lines:
```
var path = require("path");

var indexRouter = require("./routes/index");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
```
Modify the line:
```
app.use("/users", usersRouter);
to
app.use("/api/users", usersRouter);
```

### Edit package.json
Modify the line:
```
"start": "node ./bin/www"
to
"start": "nodemon ./bin/www"
```

## Front

### Init the project
```
$ create-react-app front
$ cd front
$ npm install node-sass
$ npm install react-router-dom
$ npm install history
$ mkdir -p src/components
$ mkdir -p src/pages
$ mkdir -p src/scss
$ mkdir -p src/utils
$ rm src/App.css
$ rm src/index.css
$ rm src/logo.svg
```

### Modify src/index.js
```
import './index.css';
to
import "./scss/style.scss";
```

### Modification on other files
- src/App.js

### New files
- src/pages/home.js
- src/pages/posts.js
- src/pages/users.js
- src/scss/style.scss
- src/utils/history.js

## Docker

### Configure
```
$ mkdir docker
$ cd docker
```

### New files
- docker-compose.yml
- config/nginx.conf

### Running
Start
```
$ cd docker
$ docker-compose up -d
```
Get Logs
```
$ docker-compose logs -f
```
Stop
```
$ docker-compose down
```

### Testing
- Front: http://127.0.0.1:3000
- Back: http://127.0.0.1:3000/api/users
