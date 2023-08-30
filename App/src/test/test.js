import test from "node:test";
import assert from "node:assert";
import mongoose from 'mongoose'
import { logger } from "../utils/logger.util";
import ProductRepository from "../persistence/daos/repository/product.repository.js"

let prodDao
prodDao = new ProductRepository()
prodDao.init()
await mongoose.connection.collections['products-test'].drop()
logger.info('Database has clean')
const doc = {

}

