import os
from fastapi import UploadFile
from pathlib import Path
from typing import Union

UPLOAD_DIR = "uploads"

def save_uploaded_file(file: UploadFile, upload_dir: str = UPLOAD_DIR) -> str:
    """
    Saves an uploaded file to a specified directory.

    Args:
        file (UploadFile): The file to be uploaded.
        upload_dir (str): The directory to store the uploaded file. Defaults to 'uploads'.

    Returns:
        str: The file path where the uploaded file is saved.
    """
    try:
        # Ensure the upload directory exists
        os.makedirs(upload_dir, exist_ok=True)

        # Define the full file path
        file_path = os.path.join(upload_dir, file.filename)

        # Save the file to the specified directory
        with open(file_path, "wb") as f:
            f.write(file.file.read())

        print(f"File saved to {file_path}")
        return file_path
    except Exception as e:
        print(f"Error saving uploaded file: {e}")
        raise e


def get_file_extension(file_path: str) -> str:
    """
    Returns the file extension for a given file path.

    Args:
        file_path (str): The path of the file.

    Returns:
        str: The file extension (e.g., '.txt', '.pdf').
    """
    return Path(file_path).suffix.lower()


def delete_file(file_path: str) -> Union[bool, None]:
    """
    Deletes the file at the given file path.

    Args:
        file_path (str): The path of the file to delete.

    Returns:
        bool: Returns True if the file was deleted successfully, False if the file doesn't exist.
    """
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"File {file_path} deleted successfully.")
            return True
        else:
            print(f"File {file_path} not found.")
            return False
    except Exception as e:
        print(f"Error deleting file {file_path}: {e}")
        raise e
