# Migration Guide: From Static Files to Modern Web Development

This guide will help you migrate the Zone01 Mission Viewer from static HTML files to a modern Node.js/Express application. This transition represents how professional web applications are structured and served.

## Prerequisites

- Node.js installed on your system (download from [nodejs.org](https://nodejs.org/))
- Basic familiarity with terminal/command line
- Your existing mission viewer files

## Step 1: Initialize NPM Project

1. **Open terminal in your project directory**
   ```bash
   cd /path/to/your/mission-viewer
   ```

2. **Initialize npm project**
   ```bash
   npm init -y
   ```
   This creates a `package.json` file that manages your project dependencies and scripts.

3. **Install Express.js**
   ```bash
   npm install express
   ```
   Express is a minimal web framework for Node.js that will serve your files.

## Step 2: Create Project Structure

Reorganize your files into a professional structure:

```
mission-viewer/
├── package.json
├── server.js          # New - Express server
├── public/            # New directory - static assets
│   ├── index.html     # Move from root
│   ├── styles.css     # Move from root
│   ├── mission.png    # Move from root
│   └── js/            # New directory
│       └── main.js    # Move and potentially split
└── README.md
```

**Actions to take:**
1. Create `public` directory: `mkdir public`
2. Create `public/js` directory: `mkdir public/js`
3. Move files:
   - `mv index.html public/`
   - `mv styles.css public/`
   - `mv mission.png public/`
   - `mv main.js public/js/`

## Step 3: Create Express Server

Create a new file called `server.js` in your project root:

```javascript
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Mission Viewer running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});
```

## Step 4: Update HTML File

Update `public/index.html` to reference the moved JavaScript file:

```html
<!-- Change this line: -->
<script src="main.js"></script>

<!-- To this: -->
<script src="js/main.js"></script>
```

## Step 5: Configure NPM Scripts

Edit your `package.json` to add useful scripts. Update the `scripts` section:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js",
    "test": "echo \"No tests specified\" && exit 0"
  }
}
```

## Step 6: Test Your Setup

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

3. **Verify functionality:**
   - All visual elements appear correctly
   - Canvas renders the mission map
   - Mouse interactions work (clicking to place points)
   - Keyboard shortcuts function properly
   - Export/import features work
   - Menu controls respond correctly

4. **Stop the server:**
   Press `Ctrl+C` in the terminal

## Step 7: Development Workflow

Now you can work like a professional developer:

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Make changes to your code** in the `public/` directory

3. **Refresh browser** to see changes (manual refresh required)

4. **Stop server when done:** `Ctrl+C`

## Understanding the Benefits

This migration teaches you:

1. **Server Architecture:** How web applications serve content
2. **Dependency Management:** Using npm to manage libraries
3. **Project Structure:** Professional code organization
4. **Development Workflow:** Industry-standard development practices
5. **Scalability:** Foundation for adding features like user accounts, databases, etc.

## Troubleshooting

**Port already in use:**
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill
```

**Files not loading:**
- Check file paths are correct relative to `public/` directory
- Verify Express static middleware is configured
- Check browser developer console for 404 errors

**Module not found:**
- Ensure you ran `npm install express`
- Check that `node_modules/` directory exists
