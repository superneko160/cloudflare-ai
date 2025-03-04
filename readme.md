# Cloudflare Workers AI 検証用

## Run

```sh
npm run dev
```

### Chat

`text`に対する返答をする

```
http://127.0.0.1:8787/?text={text}
```

Model: [meta/llama-3.1-8b-instruct](https://developers.cloudflare.com/workers-ai/models/meta-llama-3-8b-instruct/)

### Summarization

`text`を要約する

```
http://127.0.0.1:8787/summarize?text={text}
```

Model: [facebook/bart-large-cnn](https://developers.cloudflare.com/workers-ai/models/bart-large-cnn/)

### Text to Image

`text`から画像を生成する

```
http://127.0.0.1:8787/image?text={text}
```

Model: [lykon/dreamshaper-8-lcm](https://developers.cloudflare.com/workers-ai/models/dreamshaper-8-lcm/)

### Text Classification

`text`のポジティブ度、ネガティブ度を数値で返す

```
http://127.0.0.1:8787/text-classification?text={text}
```

Model: [huggingface/distilbert-sst-2-int8](https://developers.cloudflare.com/workers-ai/models/distilbert-sst-2-int8/)

## Image Classification

分類したラベルと、そのラベルの信頼度を返す

```
http://127.0.0.1:8787/image-classification
```

Model: [microsoft/resnet-50](https://developers.cloudflare.com/workers-ai/models/resnet-50/)

## Reference

- [Workers AI - Cloudflare Workers AI docs](https://developers.cloudflare.com/workers-ai/)
