import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from datasets import load_dataset
import pandas as pd

# # Load model directly
from transformers import AutoTokenizer, AutoModelForSequenceClassification

tokenizer = AutoTokenizer.from_pretrained("ahmedrachid/FinancialBERT-Sentiment-Analysis")
model = AutoModelForSequenceClassification.from_pretrained("ahmedrachid/FinancialBERT-Sentiment-Analysis")

# # Load the dataset 
# splits = {'train': 'train.csv', 'test': 'test.csv'}
# df = pd.read_csv("hf://datasets/neeeeellllll/Financial_Sentiment_Analyis_dataset/" + splits["test"])

# print(df.head())

# # Function to predict sentiment using the model
# def predict_sentiment(sentence):
#     inputs = tokenizer(sentence, return_tensors="pt")
#     with torch.no_grad():
#         outputs = model(**inputs)
#     scores = outputs.logits.softmax(dim=1).detach().numpy()
#     label = scores.argmax(axis=1)[0]
#     return label

# # Apply the function to each sentence in the DataFrame
# df['Predicted_Sentiment'] = df['Sentence'].apply(predict_sentiment)

# # Print the results
# print(df)

# # Evaluate model performance (optional)
# accuracy = (df['Sentiment'] == df['Predicted_Sentiment']).mean()
# print(f"Accuracy: {accuracy:.2f}")

from sklearn.model_selection import train_test_split
from torch.utils.data import Dataset, DataLoader
import torch

class FinancialDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_len):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        text = self.texts[idx]
        label = self.labels[idx]

        encoding = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=self.max_len,
            return_token_type_ids=False,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt',
        )

        return {
            'text': text,
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(label, dtype=torch.long)
        }

def create_data_loader(df, tokenizer, max_len, batch_size):
    ds = FinancialDataset(
        texts=df.text.to_numpy(),
        labels=df.label.to_numpy(),
        tokenizer=tokenizer,
        max_len=max_len
    )

    return DataLoader(
        ds,
        batch_size=batch_size,
        num_workers=2
    )

splits = {'train': 'train.csv', 'test': 'test.csv'}
df = pd.read_csv("hf://datasets/neeeeellllll/Financial_Sentiment_Analyis_dataset/" + splits["train"])
train_df, val_df = train_test_split(df, test_size=0.1, random_state=42)

BATCH_SIZE = 16
MAX_LEN = 128

train_data_loader = create_data_loader(train_df, tokenizer, MAX_LEN, BATCH_SIZE)
val_data_loader = create_data_loader(val_df, tokenizer, MAX_LEN, BATCH_SIZE)

from transformers import AdamW, get_linear_schedule_with_warmup
import torch.nn.functional as F
from torch.optim import AdamW
from tqdm import tqdm

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

optimizer = AdamW(model.parameters(), lr=2e-5, correct_bias=False)
total_steps = len(train_data_loader) * 5  # Number of epochs
scheduler = get_linear_schedule_with_warmup(
    optimizer,
    num_warmup_steps=0,
    num_training_steps=total_steps
)

def train_epoch(model, data_loader, optimizer, device, scheduler):
    model = model.train()
    losses = []
    correct_predictions = 0

    for d in tqdm(data_loader):
        input_ids = d["input_ids"].to(device)
        attention_mask = d["attention_mask"].to(device)
        labels = d["labels"].to(device)

        outputs = model(
            input_ids=input_ids,
            attention_mask=attention_mask,
            labels=labels
        )
        loss = outputs.loss
        logits = outputs.logits
        _, preds = torch.max(logits, dim=1)
        correct_predictions += torch.sum(preds == labels)
        losses.append(loss.item())

        loss.backward()
        optimizer.step()
        scheduler.step()
        optimizer.zero_grad()

    return correct_predictions.double() / len(data_loader.dataset), np.mean(losses)

for epoch in range(5):
    print(f'Epoch {epoch + 1}/{5}')
    train_acc, train_loss = train_epoch(
        model,
        train_data_loader,
        optimizer,
        device,
        scheduler
    )
    print(f'Train loss {train_loss} accuracy {train_acc}')


from sklearn.metrics import classification_report

def eval_model(model, data_loader, device):
    model = model.eval()
    predictions = []
    true_labels = []

    with torch.no_grad():
        for d in data_loader:
            input_ids = d["input_ids"].to(device)
            attention_mask = d["attention_mask"].to(device)
            labels = d["labels"].to(device)

            outputs = model(
                input_ids=input_ids,
                attention_mask=attention_mask
            )
            logits = outputs.logits
            _, preds = torch.max(logits, dim=1)

            predictions.extend(preds)
            true_labels.extend(labels)

    return classification_report(true_labels, predictions, target_names=['negative', 'neutral', 'positive'])

print(eval_model(model, val_data_loader, device))





