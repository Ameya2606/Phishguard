# 🚀 Quick GitHub Upload Guide

## 📋 Before You Start

### 1. Create Repository on GitHub
1. Go to: https://github.com/new
2. **Repository name**: `phishguard` (or any name you want)
3. **Description**: `AI-powered phishing detection tool`
4. **Visibility**: Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

---

## ⚡ Easy Method: Use the Script

### Option A: Double-click the script
1. Find `push-to-github.bat` in your project folder
2. Double-click it
3. When prompted, paste your GitHub repository URL:
   ```
   https://github.com/YOUR_USERNAME/phishguard.git
   ```
4. Press Enter and wait!

---

## 🖥️ Manual Method: PowerShell Commands

If the script doesn't work, run these commands in PowerShell:

```powershell
# Navigate to your project
cd "d:\new project\download"

# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: PhishGuard v1.0"

# Set main branch
git branch -M main

# Add your GitHub repo (REPLACE with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/phishguard.git

# Push to GitHub
git push -u origin main
```

---

## 🔑 If You Need to Authenticate

### First time using Git?
```powershell
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Authentication Methods:

#### Method 1: GitHub CLI (Recommended)
```powershell
# Install GitHub CLI if not already
winget install --id GitHub.cli

# Login
gh auth login
# Follow prompts: Choose GitHub.com → HTTPS → Yes → Login with browser
```

#### Method 2: Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control)
4. Copy the token
5. When git asks for password, paste the token

#### Method 3: GitHub Desktop (Easiest)
1. Download: https://desktop.github.com/
2. Install and sign in
3. File → Add local repository → Browse to your folder
4. Click "Publish repository"

---

## ⚠️ Common Issues & Solutions

### Issue 1: "repository not found"
**Solution**: Make sure you created the repository on GitHub first!
```
https://github.com/new
```

### Issue 2: "fatal: remote origin already exists"
**Solution**: Update the remote URL
```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/phishguard.git
```

### Issue 3: "Authentication failed"
**Solution**: Use a Personal Access Token instead of password
- Go to: https://github.com/settings/tokens
- Generate new token with `repo` scope
- Use token as password when prompted

### Issue 4: "refusing to merge unrelated histories"
**Solution**: Force push (only for new repos)
```powershell
git push -u origin main --force
```

---

## ✅ Success Checklist

After successful push, you should see:
- ✅ All your files on GitHub
- ✅ Green commit message at the top
- ✅ Folders: `src/`, `public/`, etc.
- ✅ Files: `README.md`, `package.json`, `render.yaml`, etc.

---

## 🎯 Next Step: Deploy to Render

### After files are on GitHub:

1. **Go to Render.com**
   - https://render.com
   - Sign in with GitHub

2. **Create New Service**
   - Click "New +" → "Blueprint"
   - Select your `phishguard` repository
   - Click "Apply"

3. **Wait for Build**
   - Build time: 3-5 minutes
   - Watch the logs for progress

4. **Get Your URL**
   - Copy the URL: `https://phishguard.onrender.com`
   - Share it with others!

---

## 🎉 You're Done!

Your app will be:
- ✅ Hosted on Render
- ✅ Auto-deployed on every push
- ✅ HTTPS enabled
- ✅ Fully functional

---

## 📞 Need Help?

If you get stuck:
1. Check the error message carefully
2. Make sure you created the GitHub repo first
3. Verify your GitHub authentication
4. Try GitHub Desktop (easiest method)

---

**Ready? Run `push-to-github.bat` or follow the manual steps above!** 🚀
