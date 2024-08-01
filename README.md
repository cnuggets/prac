# PracJS
A Simple but Powerful Web UI Framework & Toolkit

## Quick Start
- Create project

```
mkdir YOUR-PROJECT
cd YOUR-PROJECT
npm init
```
- Install prac

```
npm install pracjs --save-dev
sudo npm install pracjs -g
```
- Intialize prac project

```
# responsive web
prac init
# or mobile
prac init -m

# install dev dependencies
npm install
```

- Start a web server

```
prac run -p 8080
```

- Access

```
http://localhost:8080
```

## Deploy your project

- Install Grunt

```
sudo npm install grunt -g
```

- Build

```
grunt build
```

- Config NGINX

```
server {
    listen       80;
    server_name  YOUR_DOMAIN;
    root         /YOUR_PROJECT;

    location / {
        try_files $uri $uri/ /index.html;
    }

    ...
}
```

## Docs
- [Documentation](https://pracjs.com)
- layout, css, form, basic component fully use Bootstrap 5, so for this basic usage please refer to [Bootstrap 5](https://getbootstrap.com/docs/5.1/getting-started/introduction/).
- icon please refer to [Bootstrap icon](https://icons.getbootstrap.com/)

## License
[MIT](https://github.com/cnuggets/prac/blob/main/LICENSE)
