# Finger Lakes Fitness Center Renovation Survey

A local web application for collecting renovation survey responses and saving them to a CSV file.

## Features

- ✨ Clean, professional two-page PDF-style layout
- 🎨 Teal (#008B8B) and Orange (#FF6347) color scheme
- 📝 Comprehensive survey covering:
  - Factors valued in fitness centers (max 3 selections)
  - Seating area design feedback with random image display
  - Seating area elements (max 3 selections)
  - Membership influence questions (1-10 scale)
  - Wellness statement agreement (5-point Likert scale)
  - Membership and demographic information
- 🖼️ Random image selection (50/50 probability between two renderings)
- ✅ Form validation with checkbox limits
- 💾 Automatic CSV file generation with all responses
- 📱 Responsive design for mobile devices
- 📱 **Tablet support** - Optimized for tablet devices with touch interactions
- 🌐 **Network access** - Accessible from tablets/phones on the same network

## Quick Start

### Windows Users

#### Method 1: Using Batch File (Recommended)
1. Double-click `start.bat` to start the server
2. The script will automatically:
   - Check if Node.js is installed
   - Verify all required files exist
   - Install dependencies if needed (if `node_modules` doesn't exist)
   - Handle port conflicts
   - Start the server
3. Open your browser and navigate to: **http://localhost:3000**

**Note:** The script is designed to work on any Windows computer, even if you move the folder to another computer. It will automatically install dependencies if needed.

### Accessing from Tablet/Phone

The server is configured to accept connections from devices on the same network:

1. **Start the server** using `start.bat` (or `node server.js`)
2. **Note the network IP address** shown in the console (e.g., `http://192.168.1.100:3000`)
3. **On your tablet/phone:**
   - Ensure it's connected to the same Wi-Fi network
   - Open a web browser
   - Navigate to the network IP address shown in the console
4. **The survey is optimized for touch devices:**
   - Larger touch targets (minimum 48-56px)
   - Touch-friendly drag-and-drop for ranking
   - Responsive layout for tablet screens

#### Method 2: Using Command Prompt
1. Open Command Prompt in the project folder
2. Run: `npm install` (first time only, or if `node_modules` is missing)
3. Run: `node server.js` or `npm start`
4. Open your browser and navigate to: **http://localhost:3000**

### macOS/Linux Users

#### Method 1: Using Shell Script
1. Open Terminal in the project folder
2. Run: `chmod +x start.command` (first time only)
3. Double-click `start.command` or run: `./start.command`

#### Method 2: Using Terminal
1. Open Terminal in the project folder
2. Run: `npm install` (first time only)
3. Run: `node server.js` or `npm start`
4. Open your browser and navigate to: **http://localhost:3000**

### Add Images

Place your comfort zone rendering images in the `images/` folder:
- `comfort-zone-v1.jpg` - First rendering
- `comfort-zone-v2.jpg` - Second rendering

See `images/README.md` for specifications.

## Survey Structure

### Header
- Title: "FINGER LAKES FITNESS CENTER"
- Subtitle: "RENOVATION SURVEY"
- Tagline: "We appreciate your help!"

### Consent Statement
- Displays consent and clarification information

### Section 1: Factors You Value in a Fitness Center
- Checkboxes with maximum 3 selections
- Includes "Other" text input option

### Seating Area Design Section
- Randomly displays one of two rendering images (50/50 probability)
- Image caption: "View How it Looks in Space →"

### Section 2: Seating Area Elements
- Checkboxes with maximum 3 selections
- Includes "Other" text input option

### Section 3: Membership Influence Questions
- Two questions using 1-10 scale (radio buttons)
- Question 3a: Influence on membership renewal
- Question 3b: Influence on starting new membership

### Section 4: Wellness Statement Agreement Scale
- 6 statements with 5-point Likert scale (1 = Strongly Disagree, 5 = Strongly Agree)

### Section 5: Membership Information
- Membership type (radio buttons)
- Membership duration (conditional, shown if member)
- Age group (radio buttons)
- Gender (radio buttons with "Other" option)

## File Structure

```
.
├── index.html          # Main HTML file with embedded CSS and JavaScript
├── server.js          # Express server and CSV handling
├── package.json       # Dependencies configuration
├── package-lock.json  # Locked dependency versions (recommended to include)
├── start.bat          # Windows startup script (with full error checking)
├── start-simple.bat   # Simple Windows startup script
├── start.command      # macOS/Linux startup script
├── images/            # Images folder for renderings
│   ├── comfort-zone-v1.jpg  # First rendering (add your image)
│   ├── comfort-zone-v2.jpg  # Second rendering (add your image)
│   └── README.md      # Image specifications
├── responses.csv      # Auto-generated CSV file (created on first submission)
├── README.md         # This file
├── WINDOWS_INSTALL.md # Windows installation guide
├── DEPLOYMENT_GUIDE.md # Guide for deploying to other computers
└── DEPLOYMENT_CHECKLIST.md # Deployment checklist
```

## Deploying to Another Windows Computer

### Quick Deployment

**To move this folder to another Windows computer and run it directly:**

1. **Copy the folder** to the target computer (you can exclude `node_modules` to save space)
2. **Ensure Node.js is installed** on the target computer (download from https://nodejs.org/)
3. **Double-click `start.bat`** - it will automatically:
   - Check all required files
   - Verify Node.js installation
   - Install dependencies if `node_modules` is missing
   - Start the server

### What to Include When Copying

**Required files:**
- ✅ `index.html`
- ✅ `server.js`
- ✅ `package.json`
- ✅ `package-lock.json` (recommended)
- ✅ `start.bat`
- ✅ `images/` folder with images
- ✅ All `.md` documentation files

**Optional (can be excluded):**
- ⚠️ `node_modules/` - Will be auto-installed if missing (saves ~50-100 MB)
- ⚠️ `responses.csv` - Only if you need historical data
- ⚠️ `responses_backup_*.csv` - Only if you need backup data

**See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions.**

## CSV Output Format

Responses are saved to `responses.csv` with the following columns:

```
Timestamp, Image_Version, Factors_Valued, Factors_Valued_Other,
Seating_Elements, Seating_Elements_Other, Membership_Renewal,
Membership_Seeking, Wellness_1, Wellness_2, Wellness_3, Wellness_4,
Wellness_5, Wellness_6, Membership_Type, Membership_Type_Other,
Membership_Duration, Age_Group, Gender, Gender_Other
```

- **Timestamp**: ISO format timestamp
- **Image_Version**: "image1" or "image2" (randomly selected)
- **Factors_Valued**: Selected factors (semicolon-separated, max 3)
- **Seating_Elements**: Selected elements (semicolon-separated, max 3)
- **Membership_Renewal/Seeking**: Scores from 1-10
- **Wellness_1 to Wellness_6**: Likert scale scores (1-5)
- **Other fields**: Selected options or text inputs

## Modifying Survey Questions

### Random Image Selection

The random image selection happens in `index.html`:
- Function: `selectRandomImage()` (around line 250)
- Logic: 50/50 probability between image1.jpg and image2.jpg
- The selected image version is saved in CSV under "Image_Version"

### Checkbox Limits

Checkbox limits are enforced in JavaScript:
- Maximum 3 selections for "Factors Valued" and "Seating Elements"
- Automatic disabling of unchecked options when limit reached
- Visual feedback shows selected count (e.g., "2/3 selected")

### Modifying Questions

To modify survey questions, edit the `surveyConfig` object in `index.html`:
- Located around line 280
- Contains arrays for all question options
- Changes are automatically reflected in the rendered form

## Port Configuration

Default port is **3000**. To change it, edit the `PORT` constant in `server.js`.

**Note for Windows users:** The `start.bat` script will automatically use port 3001 if 3000 is busy.

## Troubleshooting

### Windows-Specific Issues

#### "Node.js is not recognized"
- Install Node.js from https://nodejs.org/
- Restart Command Prompt after installation
- Verify installation: `node --version`

#### "Port 3000 is already in use"
- The `start.bat` script will attempt to free the port automatically
- Or manually stop the process:
  ```cmd
  netstat -ano | findstr :3000
  taskkill /PID <PID_NUMBER> /F
  ```

#### "Cannot find module"
- Run `npm install` in the project folder
- Ensure you're in the correct directory

#### Script won't run
- Right-click `start.bat` → Properties → Unblock (if blocked)
- Or run from Command Prompt: `start.bat`

### General Issues

#### Server Won't Start
- Ensure Node.js is installed (version 12 or higher)
- Run `npm install` to install dependencies
- Check that port 3000 is not in use

#### Submission Fails
- Make sure the server is running (`node server.js`)
- Check browser console for error messages (F12)
- Ensure port 3000 is not in use by another application

#### Images Not Displaying
- Ensure images are named exactly `comfort-zone-v1.jpg` and `comfort-zone-v2.jpg`
- Place images in the `images/` folder
- Check file permissions (Windows: ensure files are not read-only)
- A placeholder will display if images are missing

#### CSV File Not Created
- CSV file is created automatically on first submission
- Ensure the application has write permissions in the directory
- On Windows, ensure the folder is not read-only

## Technical Details

### Frontend
- Pure HTML5, CSS3, and Vanilla JavaScript (no frameworks)
- Responsive design with mobile support
- Client-side form validation
- Checkbox limit enforcement

### Backend
- Node.js with Express.js
- CSV file handling with proper escaping
- Timestamp tracking
- Concurrent submission handling

### Random Image Selection
- Implemented client-side with `Math.random()`
- 50/50 probability distribution
- Image version tracked and saved in CSV

## Code Comments

The code includes extensive comments explaining:
- Where to modify survey questions
- How random image selection works
- CSV column mapping
- How to run the application

## License

ISC

