// One-time: set all existing orders with orderStatus "pending" to "confirmed"
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'
import { Order } from '../src/models/order.model.js'
import { DB_NAME } from '../src/constants.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '../.env') })

async function run() {
    if (!process.env.MONGODB_URI) {
        console.error('Set MONGODB_URI in Backend/.env (same as the API server)')
        process.exit(1)
    }
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    const result = await Order.updateMany(
        { orderStatus: 'pending' },
        { $set: { orderStatus: 'confirmed' } }
    )
    console.log('Updated pending → confirmed:', result.modifiedCount, 'document(s)')
    await mongoose.disconnect()
}

run().catch((e) => {
    console.error(e)
    process.exit(1)
})
