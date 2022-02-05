# prac
A Simple but Powerful Web UI Framework & Toolkit

## Getting Started
```
# Create project folder
mkdir YOUR-PROJECT
cd YOUR-PROJECT

# Intialize project info
npm init

# Install prac
npm install pracjs --save-dev
# Install it global
sudo npm install pracjs -g

# Intialize the project
./node_modules/.bin/prac init
# or
prac init

# Initialize the project for mobile web
prac init -m

# Start a web server to test
prac run -p 8081
```

## User Guide
- [Documentation](http://vh-1-2022020600230015.host1.4w3w.com/)
- layout, css, form, basic component fully use Bootstrap 5, so for this basic usage please refer to [Bootstrap 5](https://getbootstrap.com/docs/5.1/getting-started/introduction/).
- icon please refer to [Bootstrap icon](https://icons.getbootstrap.com/)

## Project
### Initialize
```
npm install
```
### Build
```
grunt min
```
### Publish
```
npm publish --access public .
```