# mix-me [![Build Status](https://travis-ci.org/signavio/mix-me.svg?branch=master)](https://travis-ci.org/signavio/mix-me)

<div align="center">
<h1>MixMe</h1>

Mix up and go to for a lunch with people from Signavio
</div>

<div align='center'>

![photofunia-1506947079](https://user-images.githubusercontent.com/9251327/31077346-7d589bf2-a77e-11e7-8da5-fcf1e944fb88.jpg)

</div>

**Clone the repo:**
```bash
$ git clone https://github.com/signavio/mix-me.git
```

## Client

**Install dependencies:**
```bash
$ cd client
$ yarn
```

**To start the project in development mode:**
```bash
$ yarn start
```

Navigate to `http://localhost:3000`

## Server

**Install dependencies:**

```bash
$ cd server && yarn
```

**Run the server by passing PORT as env variable:**

```bash
$ PORT=8080 yarn start
```

**Connecting to Mongodb instance:**

Create `config.local.js` file inside `./config` folder with the following keys:

```javascript
module.exports = {
  DB_HOST: 'xxx',
  DB_USER: 'xxx',
  DB_PASS: 'xxx',
}
```