import dotenv from 'dotenv';
import express, { response } from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// import config props from .env file
dotenv.config()

// Express web app framework
var app = express()
const port = process.env.PORT

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

// Trust front-facing proxies 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, fc00::/7
app.set('trust proxy', 'uniquelocal')

// Set default views folder to views
app.set('views', 'views')

// Set __dirname constant
const __dirname = dirname(fileURLToPath(import.meta.url));

// Set folder location for static content
app.use(express.static(path.join(__dirname, 'public')));

// Return shinobi props to front-end
app.get('/shinobi-props', async (req, res) => {

  const shinobi_properties = {
    'ip': process.env.SHINOBI_IP,
    'port': process.env.SHINOBI_PORT,
    'groupkey': process.env.SHINOBI_GROUP_KEY,
    'apikey': process.env.SHINOBI_API_KEY
  }
    res.send(shinobi_properties)
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});