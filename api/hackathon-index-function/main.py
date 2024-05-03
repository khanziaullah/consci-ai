import base64
import functions_framework
import json
from lib import download, chunk, read_pdf,createPgEngine,createVectorStore
import asyncio
from cloudevents.http import CloudEvent
import uuid

# Triggered from a message on a Cloud Pub/Sub topic.
@functions_framework.cloud_event
def hello_pubsub(cloud_event):
  data = cloud_event.data["message"]["data"]
  decoded_data = base64.b64decode(cloud_event.data["message"]["data"])
  data_dict = json.loads(decoded_data.decode('utf-8'))
  download(data_dict["bucket"], data_dict["name"], 'blob.txt')
  document = read_pdf("blob.txt")
  chunks = chunk(document)
  engine = createPgEngine()
  store = createVectorStore(engine)
  all_texts = chunks
  ids = [str(uuid.uuid4()) for _ in all_texts]
  store.add_documents(all_texts, ids=ids)
  
  
  