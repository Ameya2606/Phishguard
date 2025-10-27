# 🔧 Render Deployment Troubleshooting

## Your Deployment
- **URL**: https://phishguard-ngwd.onrender.com
- **Status**: Showing "Not Found"

---

## 🔍 **What "Not Found" Means**

This error happens when:
1. ❌ Build failed (app didn't compile)
2. ❌ App crashed after starting
3. ❌ Wrong start command
4. ❌ Missing files on GitHub

---

## 📊 **Step 1: Check Render Logs**

### View Build Logs:
1. Go to: https://dashboard.render.com
2. Click on your **"phishguard-ngwd"** service
3. Click **"Logs"** tab (left sidebar)
4. Look for errors in RED

### Common Error Messages:

#### Error: "npm install failed"
**Cause**: Missing or corrupted package.json
**Fix**: Make sure package.json is on GitHub

#### Error: "npm run build failed"
**Cause**: TypeScript errors or missing files
**Fix**: Check which files are missing

#### Error: "ENOENT: no such file or directory"
**Cause**: File not uploaded to GitHub
**Fix**: Push missing files

#### Error: "Module not found"
**Cause**: Missing dependency
**Fix**: Add to package.json

---

## ✅ **Step 2: Verify Files on GitHub**

Go to: https://github.com/Ameya2606/Phishguard

### Required Files Checklist:
- [ ] `package.json` - Dependencies
- [ ] `package-lock.json` - Lock file
- [ ] `next.config.js` - Next.js config
- [ ] `tsconfig.json` - TypeScript config
- [ ] `tailwind.config.js` - Tailwind config
- [ ] `postcss.config.js` - PostCSS config
- [ ] `src/` folder with all files
- [ ] `public/` folder
- [ ] `render.yaml` (optional but helpful)

### If Files Are Missing:
You need to push them to GitHub first!

---

## 🔧 **Step 3: Common Fixes**

### Fix 1: Update Build Command

In Render Dashboard:
1. Go to your service → **Settings**
2. **Build Command**: 
   ```bash
   npm install && npm run build
   ```
3. **Start Command**:
   ```bash
   npm start
   ```
4. Click **"Save Changes"**
5. Click **"Manual Deploy"** → **"Deploy latest commit"**

### Fix 2: Check Node Version

In Render Dashboard:
1. Settings → **Environment**
2. Add environment variable:
   - **Key**: `NODE_VERSION`
   - **Value**: `18.17.0`
3. Save and redeploy

### Fix 3: Increase Build Memory

If build fails with "Out of memory":
1. Settings → **Instance Type**
2. Upgrade to **Starter** plan ($7/month) OR
3. Optimize dependencies (remove unused packages)

### Fix 4: Check Port Binding

Make sure Next.js starts on the correct port.

**Your package.json should have**:
```json
{
  "scripts": {
    "start": "next start"
  }
}
```

This automatically uses Render's `PORT` environment variable.

---

## 🎯 **Step 4: Manual Redeploy**

After checking logs and fixing issues:

1. **In Render Dashboard**:
   - Click your service
   - Click **"Manual Deploy"** (top right)
   - Select **"Deploy latest commit"**
   - Wait 3-5 minutes

2. **Watch the Logs**:
   - Click "Logs" tab
   - Watch for:
     - ✅ "npm install" success
     - ✅ "npm run build" success  
     - ✅ "npm start" success
     - ✅ "Ready on http://0.0.0.0:10000"

3. **Test Your URL**:
   - https://phishguard-ngwd.onrender.com
   - Should load! ✅

---

## 🔍 **Step 5: Verify Build Locally**

Test if your code builds correctly:

```powershell
# Navigate to project
cd "d:\new project\download"

# Install dependencies
npm install

# Build (this is what Render does)
npm run build

# Start production server
npm start
```

**If this works locally**:
- ✅ Code is fine
- ❌ Issue is with deployment

**If this fails locally**:
- ❌ Fix the errors shown
- Push fixes to GitHub
- Redeploy on Render

---

## 📋 **Common Build Errors & Fixes**

### Error: "Cannot find module '@xenova/transformers'"
**Fix**:
```powershell
npm install @xenova/transformers --save
git add package.json package-lock.json
git commit -m "Fix: Add missing dependency"
git push origin main
```

### Error: "TypeScript error in src/..."
**Fix**:
1. Check the file mentioned in error
2. Fix TypeScript errors
3. Test: `npm run build`
4. Push to GitHub
5. Redeploy

### Error: "ENOENT: no such file or directory"
**Fix**:
1. Check which file is missing
2. Make sure it's in your local folder
3. Push to GitHub:
   ```powershell
   git add .
   git commit -m "Add missing files"
   git push origin main
   ```
4. Redeploy on Render

---

## 🆘 **Still Not Working?**

### Check These:

1. **Render Dashboard → Logs**:
   - What's the last line before it fails?
   - Copy the error message

2. **GitHub Repository**:
   - Are all files there?
   - Is src/ folder complete?
   - Is package.json present?

3. **Render Settings**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Node Version: `18.17.0`

4. **Local Build**:
   - Does `npm run build` work locally?
   - Does `npm start` work locally?

---

## 🎯 **Quick Debug Steps**

### 1. Check Render Logs Now:
```
1. Go to: https://dashboard.render.com
2. Click your service
3. Click "Logs"
4. Look for RED error messages
5. Copy the error
```

### 2. Common Quick Fixes:

**If logs show "Module not found"**:
→ Missing dependency, add to package.json

**If logs show "Build failed"**:
→ TypeScript errors, check and fix

**If logs show "Cannot read package.json"**:
→ File not on GitHub, push it

**If logs show nothing / blank**:
→ Service not starting, check start command

---

## 📞 **Share Your Logs**

To get specific help:

1. Go to Render Dashboard → Logs
2. Copy the error messages (especially RED text)
3. Look for lines like:
   - `error TS...` (TypeScript errors)
   - `npm ERR!` (npm errors)
   - `Error: Cannot find module` (missing files)
   - `ENOENT` (file not found)

Share those error messages and I can help fix them!

---

## ✅ **Expected Successful Deployment Logs**

When it works, you should see:

```
==> Cloning from https://github.com/Ameya2606/Phishguard...
==> Running 'npm install'
    added 500 packages in 45s
==> Running 'npm run build'
    > next build
    ✓ Creating optimized production build
    ✓ Compiled successfully
    ✓ Collecting page data
    ✓ Generating static pages (5/5)
    ✓ Finalizing page optimization
==> Running 'npm start'
    > next start
    ✓ Ready on http://0.0.0.0:10000
==> Service is live at https://phishguard-ngwd.onrender.com
```

If you see this → ✅ Working!

---

**Next Step: Check your Render logs and share any error messages you see!** 🔍
