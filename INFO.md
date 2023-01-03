# Basic intro

## davinci flavour

> Davinci is the most capable model family and can perform any task the other models can perform and often with less instruction. For applications requiring a lot of understanding of the content, like summarization for a specific audience and creative content generation, Davinci is going to produce the best results. These increased capabilities require more compute resources, so Davinci costs more per API call and is not as fast as the other models.

> Another area where Davinci shines is in understanding the intent of text. Davinci is quite good at solving many kinds of logic problems and explaining the motives of characters. Davinci has been able to solve some of the most challenging AI problems involving cause and effect.

> **Good at**: Complex intent, cause and effect, summarization for audience

## Some parameters

A few concepts from [openai quickstart](https://beta.openai.com/docs/quickstart/):

- `temperature`: how creative the model is (keep low to get the same output to the same input.)
- `prompt`: the text sent. Max length is 4000 tokens i.e about 2800 words
  - The way the question/prompt is presented is really important to get what you need.
- `max_tokens`: is the expected length of reponse. Also 4000 tokens max.
- `stop`: tells the AI to stop generating tokens (stops translating or whatever is doing).
- `fine_tuning`: this is fantastic to give some examples that teach the model how to do its job.
