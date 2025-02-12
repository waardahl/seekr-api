import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { Ollama } from 'ollama'

const app = new Hono()
const ollama = new Ollama({ host: 'http://ollama:11434' })

app.get('/', (c) => {
  return c.text('Hello Seekr!')
})

app.get('/ollama', async (c) => {
  const testMessage = "Hello Ollama! How are you?"

  const streamResponse = await ollama.chat({
    model: 'deepseek-r1:1.5b',
    messages: [{ role: 'user', content: testMessage }]
  });

  const responseText = streamResponse.message.content

  return c.text(responseText)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
