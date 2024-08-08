# FinancialBERT Sentiment Analysis

FinancialBERT is a BERT-based model fine-tuned on financial texts for various NLP tasks, including sentiment analysis. This README explains how the model processes input text and assigns sentiment labels.

# Understanding the model

## Tokenization

The input text is tokenized into subword tokens using a tokenizer compatible with BERT. Each token is then mapped to its corresponding token ID from the vocabulary.

## Embedding

The token IDs are converted into dense vectors (embeddings) using the embedding layer of the model. Positional embeddings are also added to incorporate the order of tokens.

## Contextual Encoding

The token embeddings are passed through multiple layers of the Transformer encoder. These layers capture contextual relationships between tokens, resulting in a sequence of contextualized embeddings.

## Classification Head

For sentiment analysis, a classification head (a fully connected neural network layer) is added to the BERT model. This head takes the [CLS] token's embedding from the final layer of the BERT model, which is considered to represent the entire input sequence.

## Logits Calculation

The classification head transforms the [CLS] token embedding into logits, raw scores for each sentiment class. If there are three sentiment classes (negative, neutral, positive), there will be three logits. For example, [1.2, 2.3, 4.5] where [negative, neutral, positive]

## Softmax Function

The logits are passed through a softmax function, which converts them into probabilities. The softmax function ensures that the probabilities sum up to 1. The formula for the softmax function for a given logit \( z_i \) is:

\[
P(y = i) = \frac{e^{z_i}}{\sum_{j} e^{z_j}}
\]

where \( P(y = i) \) is the probability of the sentiment class \( i \).

For example, [1.2, 2.3, 4.5] became [3.32,9.97,90.02].

## Probability Assignment

The output of the softmax function is a probability distribution over the sentiment classes. Each class has an associated probability that indicates the model's confidence in that class being the correct sentiment.

## Prediction

The class with the highest probability is selected as the predicted sentiment label.
