# 🔐 GitHub Authentication Guide for PhishGuard

## Your Repository
- **GitHub URL**: https://github.com/Ameya2606/Phishguard
- **Username**: Ameya2606

---

## ✨ Method 1: GitHub Desktop (EASIEST - 5 minutes)

### Why this is best:
- ✅ No command line needed
- ✅ Uses your browser login (you're already logged in!)
- ✅ Visual interface
- ✅ One-click publish

### Steps:

1. **Download & Install**
   - Go to: https://desktop.github.com/
   - Download and install (2-3 minutes)

2. **Sign In**
   - Open GitHub Desktop
   - Click "Sign in to GitHub.com"
   - It will open your browser (you're already logged in!)
   - Authorize GitHub Desktop

3. **Add Your Project**
   - File → Add Local Repository
   - Click "Choose..." button
   - Navigate to: `D:\new project\download`
   - Click "Select Folder"
   - Click "Add Repository"

4. **Publish to GitHub**
   - Click "Publish repository" button (top bar)
   - Name: `Phishguard` (or keep current name)
   - Description: `AI-powered phishing detection tool`
   - Uncheck "Keep this code private" (if you want it public)
   - Click "Publish repository"

5. **Done!** ✅
   - Your code is now on GitHub!
   - View at: https://github.com/Ameya2606/Phishguard

---

## 🔑 Method 2: Personal Access Token (10 minutes)

### Generate Token:

1. **Go to Token Settings**
   - Link: https://github.com/settings/tokens/new
   - (Or: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic))

2. **Create New Token**
   - Note: `PhishGuard Upload`
   - Expiration: `90 days` (recommended)
   - Select scopes:
     - ✅ **repo** (full control of private repositories)
     - ✅ **workflow** (optional, for GitHub Actions)

3. **Generate & Copy**
   - Click "Generate token" (bottom of page)
   - **IMPORTANT**: Copy the token immediately!
   - Format: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - You won't see it again!

### Use Token:

**Option A: Run the script**
```
1. Double-click: push-with-token.bat
2. When prompted for password, PASTE YOUR TOKEN (not GitHub password!)
3. Done!
```

**Option B: Manual commands**
```powershell
# 1. Configure Git
git config --global user.name "Ameya2606"
git config --global user.email "your.email@example.com"

# 2. Navigate to project
cd "d:\new project\download"

# 3. Initialize (if needed)
git init

# 4. Add files
git add .

# 5. Commit
git commit -m "Initial commit: PhishGuard v1.0"

# 6. Set branch
git branch -M main

# 7. Add remote
git remote add origin https://github.com/Ameya2606/Phishguard.git

# 8. Push (will ask for authentication)
git push -u origin main

# When prompted:
# Username: Ameya2606
# Password: [PASTE YOUR TOKEN HERE - NOT your GitHub password!]
```

---

## 🖥️ Method 3: GitHub CLI (Advanced)

### Install GitHub CLI:

**Option A: Windows Package Manager**
```powershell
winget install --id GitHub.cli
```

**Option B: Manual Download**
- https://cli.github.com/
- Download and install

### Authenticate:
```powershell
# Login to GitHub
gh auth login

# Follow prompts:
# ? What account do you want to log into? → GitHub.com
# ? What is your preferred protocol? → HTTPS
# ? Authenticate Git with your GitHub credentials? → Yes
# ? How would you like to authenticate? → Login with a web browser

# Copy the one-time code shown
# Press Enter to open browser
# Paste code and authorize
```

### Push to GitHub:
```powershell
cd "d:\new project\download"
git init
git add .
git commit -m "Initial commit: PhishGuard v1.0"
git branch -M main
gh repo create Phishguard --public --source=. --remote=origin --push
```

---

## 🆘 Troubleshooting

### Issue: "remote: Support for password authentication was removed"
**Solution**: Use a Personal Access Token, NOT your GitHub password!
- Generate token: https://github.com/settings/tokens/new
- Use token as password when prompted

### Issue: "Authentication failed"
**Solution**: 
1. Make sure you copied the FULL token (starts with `ghp_`)
2. Try GitHub Desktop instead (easiest method)
3. Check token has `repo` scope enabled

### Issue: "repository not found"
**Solution**: 
1. Check repository exists: https://github.com/Ameya2606/Phishguard
2. Make sure you're using correct username: `Ameya2606`
3. Verify repository name matches: `Phishguard`

### Issue: "remote origin already exists"
**Solution**:
```powershell
git remote remove origin
git remote add origin https://github.com/Ameya2606/Phishguard.git
git push -u origin main
```

---

## ✅ Verification

After successful upload, check:

1. **Go to your repository**:
   - https://github.com/Ameya2606/Phishguard

2. **You should see**:
   - ✅ All your files and folders
   - ✅ README.md displayed
   - ✅ Green "Code" button
   - ✅ Commit message at top

3. **Files to verify**:
   - ✅ src/ folder
   - ✅ public/ folder
   - ✅ package.json
   - ✅ render.yaml
   - ✅ README.md

---

## 🎯 Recommendation

**I recommend Method 1 (GitHub Desktop)** because:
- ✅ You're already logged into GitHub
- ✅ No token management needed
- ✅ Visual interface (easier to understand)
- ✅ Takes only 5 minutes
- ✅ No command line errors

**Steps**: Download → Sign in → Add folder → Publish → Done!

---

## 🚀 After Upload

Once your code is on GitHub:

1. **Deploy to Render**:
   - Go to: https://render.com
   - Sign in with GitHub
   - New + → Blueprint
   - Select "Phishguard" repository
   - Click "Apply"
   - Wait 3-5 minutes
   - Done! App is live! 🎉

2. **Your app URL**:
   - https://phishguard.onrender.com
   - (or custom name you choose)

---

## 📞 Still Need Help?

If you get stuck:
1. Try GitHub Desktop first (easiest)
2. Check error messages carefully
3. Make sure repository exists on GitHub
4. Verify you have access to the repository

---

**Ready? Download GitHub Desktop and publish your code!** 🚀

Link: https://desktop.github.com/
