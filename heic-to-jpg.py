# run this in terminal: pip install pillow pillow-heif natsort

import os
from PIL import Image
import pillow_heif
import sys
from natsort import natsorted

# enable HEIC support for Pillow
pillow_heif.register_heif_opener()

def convert_folder(recipe_name, recipe_step, output_folder=None):

    input_folder = "assets/recipe_" + recipe_name

    # make sure input folder exists & is a folder, no typos or anything
    if not os.path.isdir(input_folder):
        print(f"Input folder not found: {input_folder}")
        return
    
    # if output folder is not specified, put the converted images in the same folder as input folder
    if output_folder is None:
        output_folder = input_folder
    elif not os.path.isdir(output_folder):
        print(f"Output folder not found: {output_folder}")
        return

    file_number = 0

    # read everything in the folder
    for filename in natsorted(os.listdir(input_folder)):

        # .lower() to make it case-insensitive
        if filename.lower().endswith('.heic'):

            file_number += 1

            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, f"{recipe_name}_{recipe_step}_{file_number}.jpg")

            # skip if already converted
            if os.path.exists(output_path):
                print(f"Skipping (already exists): {filename}")
                continue

            # try so it doesn't crash if anything goes wrong
            try:
                image = Image.open(input_path)
                rgb_image = image.convert("RGB") # JPG only supports RGB, while HEIC might have transparency
                rgb_image.save(output_path, "JPEG", quality=95)
                os.remove(input_path) # delete the original HEIC file
                print(f"Converted: {filename} -> {os.path.basename(output_path)}")
            
            except Exception as e:
                print(f"Error converting {filename}: {e}")

convert_folder(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None)

# run this in terminal: python heic-to-jpg.py recipename recipestep (optional: outputfolder)