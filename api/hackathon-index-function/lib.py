from google.cloud import storage
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain_community.embeddings import VertexAIEmbeddings
from google.cloud import aiplatform
import asyncio
import asyncpg
from google.cloud.sql.connector import Connector,IPTypes
from pgvector.asyncpg import register_vector
from langchain.chains.qa_with_sources import load_qa_with_sources_chain
from langchain.docstore.document import Document
from langchain_community.llms import VertexAI
import PyPDF2
from langchain_google_cloud_sql_pg import PostgresEngine
from langchain_google_cloud_sql_pg import PostgresVectorStore

project_id="consci-ai"
region="us-central1"
db_host = "consci-ai:us-central1:consci-ai-postgres" 
db_user = "postgres" 
db_pass = "temppwd"  
db_name = "consci-ai-db" 
instance = "consci-ai-postgres"
embedding_table = "documents_embedding"


def download(bucket_name, source_blob_name, destination_file_name):
  """Downloads a blob from GS bucket."""
  storage_client = storage.Client()
  bucket = storage_client.bucket(bucket_name)
  blob = bucket.blob(source_blob_name)
  blob.download_to_filename(destination_file_name)

def read_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        num_pages = reader.pages
        text = ''
        for page_num in num_pages:
            text += page_num.extract_text()
    return text

def chunk(document):
  text_splitter = RecursiveCharacterTextSplitter(
    separators=[".", "\n"],
    chunk_size=1024,
    chunk_overlap=200,
    length_function=len,
  )
  splits = text_splitter.create_documents([document])
  return splits

def createPgEngine():
  pg_engine = PostgresEngine.from_instance(
    project_id=project_id,
    instance=instance,
    region=region,
    database=db_name,
    user=db_user,
    password=db_pass,
  )

  pg_engine.init_vectorstore_table(
    table_name=embedding_table,
    vector_size=768
  )
  return pg_engine

def createVectorStore(pg_engine):
  aiplatform.init(project=project_id, location=region)
  embeddings = VertexAIEmbeddings()
  vector_store = PostgresVectorStore.create_sync(
    engine=pg_engine,
    embedding_service=embeddings,
    table_name=embedding_table,
  )
  return vector_store





