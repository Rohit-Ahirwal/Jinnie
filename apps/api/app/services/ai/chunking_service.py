from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.database.data_classes import ScannedFile


class ChunkingSevice:

    def __init__(self):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=1500,
            chunk_overlap=200,
        )

    def create_document(self, file):
        return Document(
            page_content=file.content,
            metadata={
                "path": file.path,
                "filename": file.filename,
                "language": file.language,
                "extension": file.extension,
                "hash": file.hash,
            }
        )

    def split(self, document: Document):
        return self.splitter.split_documents([document])

    def count_chunks(self, scanned_file: ScannedFile):
        document = self.create_document(scanned_file)
        return len(self.split(document))