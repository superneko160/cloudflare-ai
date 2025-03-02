import { Hono } from 'hono'
const app = new Hono()

/**
 * Chat
 */
app.get('/', async (c) => {
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
app.get('/summarize', async (c) => {
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

/**
 * Text to Image
 */
app.get('/image', async (c) => {
    const { text } = c.req.query()

    if (!text) {
        return c.text('Missing text', 400)
    }

    const response = await c.env.AI.run('@cf/lykon/dreamshaper-8-lcm', {
        prompt: text,
    })

    return new Response(response, {
        headers: {
          "content-type": "image/jpg",
        },
    })
})

/**
 * Text Classification
 */
app.get('/text-classification', async (c) => {
    const { text } = c.req.query()

    if (!text) {
        return c.text('Missing text', 400)
    }

    const response = await c.env.AI.run('@cf/huggingface/distilbert-sst-2-int8', {
        text: text,
    })

    return c.json(response)
})

export default app
