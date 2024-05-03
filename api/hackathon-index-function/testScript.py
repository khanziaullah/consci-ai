import base64
import json
from lib import download, chunk, read_pdf,createPgEngine,createVectorStore
import asyncio
import uuid
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="/home/debian/.config/gcloud/application_default_credentials.json"

def main():
  download("consci-documents-bucket", "EU AI Act 1.pdf", 'blob.txt')
  document = read_pdf("blob.txt")
  print(document)
  chunks = chunk(document)
  engine = createPgEngine()
  print(chunks,engine)
  store = createVectorStore(engine)
  all_texts = chunks
  ids = [str(uuid.uuid4()) for _ in all_texts]
  store.add_documents(all_texts, ids=ids)

main()
  
#use the following command to deploy the cloud run service
#gcloud run deploy qa-function \
#--source . \
#--execution-environment gen2 \
#--service-account <service-account> \
#--set-env-vars INSTANCE_CONNECTION_NAME=$PROJECT_ID:$REGION:$INSTANCE_NAME
#--allow-unauthenticated
  