import { Ai } from '@cloudflare/ai'
import { Hono } from 'hono'
const app = new Hono()

export interface Env {
    AI: Ai
}

/**
 * Chat
 */
app.get('/', async (c: any) => {
    const { text } = c.req.query()

    if (!text) {
        return c.text('Missing text', 400)
    }

    const response = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
            {
                role: 'user',
                content: text,
            },
        ],
    })

    return c.json(response)
})

/**
 * Summarization
 */
app.get('/summarize', async (c: any) => {
    const { text } = c.req.query()

    if (!text) {
        return c.text('Missing text', 400)
    }

    const response = await c.env.AI.run('@cf/facebook/bart-large-cnn', {
        input_text: text,
        max_length: 32,
    })

    return c.json(response)
})

export default app
