# Cloudflare Workers AI 検証用

## Run

```sh
npm run dev
```

### Chat

```
http://127.0.0.1:8787/?text={text}
```

Model: [meta/llama-3.1-8b-instruct](https://developers.cloudflare.com/workers-ai/models/meta-llama-3-8b-instruct/)

### Summarization

```
http://127.0.0.1:8787/summarize?text={text}
```

Model: [facebook/bart-large-cnn](https://developers.cloudflare.com/workers-ai/models/bart-large-cnn/)

## Reference

- [Workers AI - Cloudflare Workers AI docs](https://developers.cloudflare.com/workers-ai/)
