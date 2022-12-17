import * as dotenv from 'dotenv'

dotenv.config()

import "reflect-metadata";

import "express-async-errors";

import express from 'express'

import router from '@infra/routes'

import '@shared/container'

import ValidateError from '@infra/middlewares/ValidateError'

const app = express()

app.use(express.json());
app.use(router)

app.use(ValidateError);

const port = process.env.PORT

app.listen(port, () => console.log(`Server running on port ${port}`))
