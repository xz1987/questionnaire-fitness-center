# Images Folder

This folder should contain the rendering images for the comfort zone design.

## Required Images

Please add the following images to this folder:

- **comfort-zone-v1.jpg** - First comfort zone rendering
- **comfort-zone-v2.jpg** - Second comfort zone rendering

## Image Selection

The application will randomly select one of these images (50/50 probability) each time the page loads. The selected image version is tracked and saved in the CSV output for A/B testing analysis.

## Image Specifications

- Recommended format: JPG or PNG
- Recommended size: 800-1200px width
- Aspect ratio: 16:9 or 4:3 works well
- File size: Keep under 2MB for optimal loading

## Placeholder

If images are not found, a placeholder will be displayed automatically.

## Important

- The image filenames MUST match exactly: `comfort-zone-v1.jpg` and `comfort-zone-v2.jpg`
- Do NOT include both images in the same view - only one is shown per page load
- The selected image version is stored in the CSV under "Image_Version_Shown" column

