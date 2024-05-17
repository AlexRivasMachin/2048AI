# 2048AI :robot:
![alt text](/public/2048game.png)
2048AI is an artificial intelligence project that plays the popular game 2048. 
## How to Run
Follow these steps to run 2048AI:

1. Clone the repository to your local machine and navigate to the project directory.
```sh
git clone && cd ./2048AI
```
3. Install the necessary dependencies.
```sh
npm install
```
4. Once the dependencies are installed. Set `VITE_API_HOST` enviroment variable to the host of the backend. Example in Linux:
```sh
export VITE_API_HOST=https://localhost:3001
```
5. Once enviroment variable is set, you can build the project.
```sh
npm run build
```
6. Use a server to serve the files, for development enviroment you can use serve.
```sh
npm install -g serve
serve -d /dist
```
7. Without closing this terminal, create another one.
8. In the new terminal navigate to the project directory using `cd backend`. 
9. Install the necessary dependencies.
```sh
npm install
```
10. Once the dependencies are installed, you can build the project.
```sh
npm run build
```
11. Finally, use node to run the backend.
```sh
export NODE_ENV=production
node ./dist/index.js
```
12. The server will be running in port `3001` unless you specify another one using `APP_PORT` enviroment variable.

Please note that these instructions assume you have Node.js and npm installed on your machine. If you don't, you'll need to install those first.

## Who are we:
### Sertis Members:
+ AlexRivasMachín 🌶️
+ gomezbc 🥥
+ MartinLopezDeIpina 🍍

#### Githubs
+ [AlexRivasMachín](https://github.com/AlexRivasMachin)
+ [gomezbc](https://github.com/gomezbc)
+ [MartinLopezDeIpina](https://github.com/MartinLopezDeIpina)

#### Portfolios
+ [AlexRivasMachín's Portfolio](http://alexdev.eus)
+ [gomezbc's Portfolio](https://borjagomez.eus/)
+ [MartinLopezDeIpina's Portfolio](https://lopezdeipina.eus/)

## TechStack 🧰
#### Backend ⚙️
- Node.js
- Express
- Typescript
- LangChain
- Docker
### Frontend 💻
- React
- Typescript
