# Aslam Studioz Website

Professional photography website for Aslam Afeerdeen.

## Files
- `index.html` — Main website
- `style.css` — Styling (Dark/Light/Auto theme)
- `script.js` — Gallery, theme, contact form
- `admin.html` — Admin panel (password protected)
- `sitemap.xml` — SEO sitemap
- `robots.txt` — SEO robots file

## Admin Panel Setup

### Step 1: Set Your Password
1. Open `admin.html` in a browser
2. Type your password and press Login
3. It will be saved automatically (first login sets the password)

### Step 2: Set Up Cloudinary Upload Preset
1. Go to cloudinary.com → Settings → Upload
2. Click "Add upload preset"
3. Set Signing Mode: **Unsigned**
4. Set folder: `aslamstudioz`
5. Copy the preset name
6. Open `admin.html`, find this line:
   ```
   const UPLOAD_PRESET = 'aslamstudioz_upload';
   ```
   Replace `aslamstudioz_upload` with your preset name.

## GitHub Pages Setup
1. Upload all files to your GitHub repo
2. Go to repo Settings → Pages
3. Set source: main branch, root folder
4. Your site will be live at `aslamstudioz.github.io`
