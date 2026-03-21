# Cooking website

Hello! This is a website I made to compile the recipes I'm learning from Ah Ma (maternal grandmother) and other family members, mainly my aunts Kim Kim and Ee. 

I tried to make sure it looks good on mobile devices too because I intend to share the links with relatives who will primarily be accessing them on their phones.

I'll be adding more recipes progressively. I'm also thinking of compiling things I cook from cookbooks, though I won't be uploading the recipes for those because of copyright, just the final products for my own record :)

I wanted to create this website after my recent trip to visit Ah Ma in Penang (March 2026)! I asked my mum what were some of the dishes that Ah Ma cooked for her most often when she was growing up, and which were her favourites. Then I asked Ah Ma if she could teach me how to cook those :-) Her wok used to belong to Kong Kong's grandmother, i.e. my great-great-grandmother! That's amazing!

<details>
<summary>Recipes so far:</summary>

> - *Jiu Hu Char:* Bangkuang (jicama, something like a turnip) stir-fry with jiuhu (dried shredded cuttlefish) and other vegetables. Eaten in lettuce wraps. My favourite!
> - *Fried Fish with Lamchut:* I've always liked Ah Ma's fried fish, but this was my first time trying it with the lamchut dipping sauce.
> - *Bakstik:* My mum's favourite, and Ethan's too. Also my first time trying it. Meat patties with potatoes, tomatoes and onions.
> - *Tau Yu Bak:* Braised pork belly in soy sauce, with hard-boiled eggs. Ah Ma says this is easy to make :)
> - *Taugeh Taukwa / Random Vegetable Stir-Fry:* Apparently Taugeh (bean sprouts) + Taukwa (extra firm tofu) is a classic Ah Ma stir-fry combo. I never would've thought of that, but maybe it's because you can buy both taugeh and taukwa from the same pasat/ wet market stall. The stir-fry procedure is the same for any random vegetables, such as spinach and carrots.
> - *Sardines:* Ah Ma says you don't have to cook it (just squeeze lime/lemon and add sugar), but she prefers to cook it.
</details>

### Recipe upload feature (in progress)

User inputs: recipe title, one-word recipe name, subtitle, photo of the final dish, ingredients list, and can input as many steps as they want. For each step, they will write a one-word step name, description of the step and upload photos depicting the step, which will be displayed in a horizontal scroll gallery.

Then, the user presses "submit" and a preview of the formatted recipe will be generated.

If all looks good, user will confirm and a zip file will be generated containing the html code for the formatted recipe AND a folder titled recipe_{one-word recipe name} containing all the images, named in the format "{one-word recipe name}_{one-word step name}_1.HEIC".

This recipe upload page should be mobile-friendly as users will be taking photos of the cooking process using their phones, so it should be easy to upload recipes directly from their phones.

Future features to maybe add:
- Input a unique recipe code name to save progress, so you can come back later to continue and submit.

heic-to-jpg.py: if filename starts with "IMG_": ... else if filename starts with "{recipe_name}_": ...

## Notes to self

### Process to upload photos from phone

1. upload photos from phone to Temp google drive folder
2. Ctrl+A and download zip file of all the photos, in HEIC. Save to the folder you want to extract the images to
3. unzip.py
4. heic-to-jpg.py
- For videos: upload to YouTube (unlisted), it'll be a Short so change `shorts/` in the URL to `watch?v=`, click Share and copy the iframe embed. Adjust the width and height.

<details>
<summary>More tedious process that I used previously for the bakstik recipe, now solved!</summary>

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