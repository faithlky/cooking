import zipfile
import os
import sys

def unzip_file(folder_containing_zip_file, extract_to=None):
    
    # find the zip file in the folder
    zip_files = [f for f in os.listdir(folder_containing_zip_file) if f.endswith('.zip')]
    if not zip_files:
        print(f"No zip file found in: {folder_containing_zip_file}")
        return

    zip_path = os.path.join(folder_containing_zip_file, zip_files[0])

    if not os.path.isfile(zip_path):
        print(f"Zip file not found: {zip_path}")
        return
    
    if extract_to is None:
        extract_to = folder_containing_zip_file

    os.makedirs(extract_to, exist_ok=True)

    try:
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_to)
        print(f"Extracted: {zip_path} to {extract_to}")
        os.remove(zip_path)

    except Exception as e:
        print(f"Error extracting {zip_path}: {e}")

unzip_file(sys.argv[1])

# run this in terminal: python unzip.py path/to/folder/with/zipfile