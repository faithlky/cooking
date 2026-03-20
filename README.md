# Cooking website

Hello! This is a website I made to compile the recipes I'm learning from Ah Ma and other family members. 

I tried to make sure it looks good on mobile devices too because I intend to share the links with relatives who will primarily be accessing them on their phones.

I'll be adding more recipes progressively. I'm also thinking of compiling things I cook from cookbooks, though I won't be uploading the recipes for those because of copyright, just the final products for my own record :)

## Notes to self

### Process to upload photos from phone

1. upload photos from phone to Temp google drive folder
2. Ctrl+A and download zip file of all the photos, in HEIC. Save to the folder you want to extract the images to
3. unzip.py
4. heic-to-jpg.py
- For videos: upload to YouTube (unlisted), it'll be a Short so change `shorts/` in the URL to `watch?v=`, click Share and copy the iframe embed. Adjust the width and height.

<details>
<summary> More tedious process that I used previously for the bakstik recipe, now solved!</summary>

> 1. upload photos from phone to Temp google drive folder
> 2. Ctrl+A to download zip file of all the photos, in HEIC
> 3. extract the zip file
> 4. go to iloveimg.com HEIC to JPG converter and select the photos depicting the current cooking step (since iloveimg limits to max 30 images processed at once)
> 5. download converted photos, extract all JPGs from zip file, rename all photos, move them to the main folder with the rest of the photos for that recipe
> 6. type in the img srcs in the html
> - I thought the converting and renaming could probably be done with a script, so I created heic-to-jpg.py and unzip.py :)
</details>

### Other things:
- I found a colour combo for the `a`s that was I thought looked really nice, but it would fit better if the site background colour was blue or white. I think a yellow theme suits a cooking site better than blue, so I'm just parking the blue combo here to use for future projects: `background-image: linear-gradient(#99d8ff, #99d8ff), linear-gradient(to right, #ff98c5, #db94ff, #8eb0ff);`
- Horizontal scroll: Crop the photos so they're more evenly sized when made to be the same height.