# Tablet Version - Finger Lakes Fitness Center Survey

## Overview

This is a **standalone, tablet-optimized version** of the survey specifically designed for older Samsung Galaxy Tab S2 devices (2015, Android 5.0-7.0, old browsers).

## Key Features

- ✅ **Table-based HTML layout** (no divs/flex/grid)
- ✅ **Inline styles** on all form elements
- ✅ **ES5 JavaScript only** (no arrow functions, no const/let)
- ✅ **Large 28px form inputs** for easy touch interaction
- ✅ **No external libraries or CDNs** - completely self-contained
- ✅ **CSV download functionality** for GitHub Pages
- ✅ **Complete survey** - all sections from original design

## File Structure

```
tablet-version/
├── index.html          # Main survey file
├── images/             # Comfort zone rendering images
│   ├── comfort-zone-v1.jpg
│   └── comfort-zone-v2.jpg
└── README.md           # This file
```

## Usage

### Local Testing

1. Open `index.html` directly in a web browser
2. No server required - works as a standalone file
3. Responses are saved to browser's localStorage

### GitHub Pages Deployment

1. Upload the entire `tablet-version/` folder to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to the folder containing `index.html`
4. Access via: `https://yourusername.github.io/repository/tablet-version/`

### CSV Export (Admin Mode)

To enable CSV export functionality:

1. Add `?admin=1` to the URL: `index.html?admin=1`
2. An "Export Responses to CSV" button will appear
3. Click to download all responses stored in localStorage

## Survey Sections

1. **Section 1: Current Satisfaction Assessment**
   - Overall satisfaction (radio buttons)
   - Top 3 valued factors (checkboxes, max 3)

2. **Section 2: Comfort Zone Concept**
   - Random comfort zone rendering image
   - Top 3 comfort zone elements (checkboxes, max 3)
   - Usage frequency (radio buttons)
   - Membership type (radio buttons)
   - Membership duration (conditional, radio buttons)
   - Membership impact on renewal/joining (conditional, radio buttons)

3. **Section 3: Wellness & Balance Assessment**
   - 6 wellness statements (Likert scale 1-5)

4. **Section 4: Demographics**
   - Age group (radio buttons)
   - Gender (radio buttons)

## Technical Details

### Browser Compatibility

- Android 5.0+ (Chrome 40+)
- iOS 10+ (Safari 9+)
- Older tablet browsers

### Form Validation

- All required fields validated on submit
- Checkbox limits enforced (max 3 selections)
- Conditional questions shown/hidden based on membership type
- Error messages displayed inline

### Data Storage

- Responses saved to browser localStorage
- Format: JSON array with timestamp and data
- CSV export available in admin mode

### CSV Format

The exported CSV includes all survey responses with the following columns:

- Timestamp
- Overall_Satisfaction
- Ranked_Factor_1, Ranked_Factor_2, Ranked_Factor_3
- Ranked_Factors_Other
- Image_Version_Shown
- Comfort_Zone_Amenity_1, Comfort_Zone_Amenity_2, Comfort_Zone_Amenity_3
- Comfort_Zone_Other
- Usage_Frequency
- Membership_Type, Membership_Type_Other
- Membership_Duration
- Membership_Impact_Renewal, Membership_Impact_Join
- Wellness_Q1 through Wellness_Q6
- Age_Group
- Gender, Gender_Self_Describe

## Differences from Main Version

- **Simpler layout**: Table-based instead of flexbox/grid
- **Larger inputs**: 28px instead of 20px
- **No drag-and-drop**: Simple checkbox selection for ranking
- **No external dependencies**: Everything self-contained
- **ES5 only**: Maximum compatibility with old browsers

## Testing Checklist

- [ ] All form inputs visible and clickable
- [ ] Checkbox limits work (max 3 selections)
- [ ] Conditional questions show/hide correctly
- [ ] "Other" text inputs appear when selected
- [ ] Form validation works
- [ ] Success message displays after submit
- [ ] Data saves to localStorage
- [ ] CSV export works (admin mode)
- [ ] Random image selection works
- [ ] All sections display correctly

## Notes

- This version is **completely separate** from the main survey
- No modifications to original files
- Optimized specifically for older tablet devices
- Can be deployed independently to GitHub Pages

