import { Ai } from '@cloudflare/ai'
import { Hono } from "hono"
const app = new Hono()

export interface Env {
  AI: any;
}

app.get('/', async (c :any) => {
    const ai = new Ai(c.env.AI)

    // URLのクエリで質問受ける
    const { text } = c.req.query()

    if (!text) {
        return c.text("Missing text", 400);
    }

    const answer = await ai.run(
      '@cf/meta/llama-3.1-8b-instruct',
      {
        messages: [
          { role: 'user', content: text }
        ]
      }
    )

    return c.json(answer)
})

export default app
