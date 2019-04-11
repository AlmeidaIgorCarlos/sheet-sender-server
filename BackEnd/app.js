const express = require('express')()
require('dotenv-safe').config()


express.listen(process.env.PORT)