# run this in terminal: pip install pillow pillow-heif natsort

import os
from PIL import Image
import pillow_heif
import sys
from natsort import natsorted

# enable HEIC support for Pillow
pillow_heif.register_heif_opener()

if len(sys.argv) < 2:
    print("Usage: python heic-to-jpg.py recipename recipestep (optional: outputfolder)")
    sys.exit(1)

recipe_name = sys.argv[1]
recipe_step = sys.argv[2] if len(sys.argv) > 2 else None
output_folder = sys.argv[3] if len(sys.argv) > 3 else None

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

            input_path = os.path.join(input_folder, filename)

            # if your images are already named in the correct format, e.g. if you extracted them from the zip file generated from upload.html
            if filename.lower().startswith(recipe_name + '_'):
                name = os.path.splitext(filename)[0]
                output_path = os.path.join(output_folder, f"{name}.jpg")
            
            # if your images are not named in the correct format, e.g. if you just uploaded them to Google Drive and downloaded them
            else:
                file_number += 1
                if recipe_step is None:
                    output_filename = f"{recipe_name}_{file_number}.jpg"
                else:
                    output_filename = f"{recipe_name}_{recipe_step}_{file_number}.jpg"
                output_path = os.path.join(output_folder, output_filename)

            # skip if already converted
            if os.path.exists(output_path):
                print(f"Skipping (already exists): {filename}")
                continue

            # try so it doesn't crash if anything goes wrong
            try:
                image = Image.open(input_path)
                rgb_image = image.convert("RGB") # JPG only supports RGB, while HEIC might have transparency
                rgb_image.save(output_path, "JPEG", quality=95)
                if os.path.exists(output_path):
                    os.remove(input_path) # delete the original HEIC file
                print(f"Converted: {filename} -> {os.path.basename(output_path)}")
            
            except Exception as e:
                print(f"Error converting {filename}: {e}")

convert_folder(recipe_name, recipe_step, output_folder)

# run this in terminal: python heic-to-jpg.py recipename recipestep (optional: outputfolder)