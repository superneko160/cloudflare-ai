import { Hono } from 'hono'
const app = new Hono()

/**
 * Chat
 */
app.get('/', async c => {
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
app.get('/summarize', async c => {
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
app.get('/image', async c => {
    const { text } = c.req.query()

    if (!text) {
        return c.text('Missing text', 400)
    }

    const response = await c.env.AI.run('@cf/lykon/dreamshaper-8-lcm', {
        prompt: text,
    })

    return new Response(response, {
        headers: {
            'content-type': 'image/jpg',
        },
    })
})

/**
 * Text Classification
 */
app.get('/text-classification', async c => {
    const { text } = c.req.query()

    if (!text) {
        return c.text('Missing text', 400)
    }

    const response = await c.env.AI.run('@cf/huggingface/distilbert-sst-2-int8', {
        text: text,
    })

    return c.json(response)
})

/**
 * Image Classification
 */
app.get('/image-classification', async c => {
    try {
        // 猫の画像をランダムで取得
        const res = await fetch('https://cataas.com/cat')
        const blob = await res.arrayBuffer()

        const response = await c.env.AI.run('@cf/microsoft/resnet-50', {
            image: [...new Uint8Array(blob)],
        })

        return c.json(response)
    } catch (e) {
        console.error(e)
        return c.text('Image Classification Failed', 500)
    }
})

/**
 * Automatic Speech Recognition
 */
app.get('/speech-recognition', async c => {
    try {
        // 音声データを取得
        const res = await fetch('https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/samples/cpp/windows/console/samples/enrollment_audio_katie.wav')
        const blob = await res.arrayBuffer()

        const response = await c.env.AI.run('@cf/openai/whisper', {
            audio: [...new Uint8Array(blob)],
        })

        return c.json(response)
    } catch (e) {
        console.error(e)
        return c.text('Image Classification Failed', 500)
    }
})

export default app
