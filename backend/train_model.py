import numpy as np
import pandas as pd
import os
import tensorflow as tf


from google.colab import drive

drive.mount('/content/drive')

df=pd.read_csv('/content/drive/MyDrive/data/IoTPond9.csv')

df.info()

df.head()

df.index=pd.to_datetime(df['entry_id'])
df[:5]

temp=df['Temperature(C)']


def df_to_X_Y(df,window_size=100):
  df_as_np=df.to_numpy()
  X=[]
  Y=[]
  for i in range(len(df_as_np)-window_size):
    row=[[a] for a in df_as_np[i:i+5]]
    X.append(row)
    label=df_as_np[i+5]
    Y.append(label)
  return np.array(X),np.array(Y)


WINDOW_SIZE=5
X1,Y1=df_to_X_Y(temp,WINDOW_SIZE)
X1.shape,Y1.shape

X_train1,Y_train1=X1[:121424],Y1[:121424]
X_test1,Y_test1=X1[121424:],Y1[121424:]
X_train1.shape,Y_train1.shape,X_test1.shape,Y_test1.shape


from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import*
from tensorflow.keras.callbacks import ModelCheckpoint
from tensorflow.keras.losses import MeanSquaredError
from tensorflow.keras.metrics import RootMeanSquaredError
from tensorflow.keras.optimizers import Adam

model5 = Sequential()
model5.add(Conv1D(filters=64, kernel_size=2, activation='relu', input_shape=(5,1)))
model5.add(MaxPooling1D(pool_size=2))
model5.add(LSTM(64, activation='relu'))
model5.add(Dense(1))


model5.summary()


cp5=ModelCheckpoint('model5/',save_best_only=True)
model5.compile(loss=MeanSquaredError(),optimizer=Adam(learning_rate=0.0008),metrics=[RootMeanSquaredError()])

model5.fit(X_train1,Y_train1,epochs=1,batch_size=32,callbacks=[cp5])
