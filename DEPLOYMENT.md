# 🚀 Render Deployment Guide for PhishGuard

## Quick Deploy to Render

### Option 1: Auto-Deploy with Blueprint (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Render**
   - Go to https://render.com
   - Sign in with GitHub
   - Click "New +" → "Blueprint"
   - Select your GitHub repository
   - Render will auto-detect `render.yaml` and configure everything

3. **Deploy!**
   - Click "Apply"
   - Wait 3-5 minutes for build
   - Your app will be live at `https://phishguard.onrender.com`

### Option 2: Manual Setup

1. **Create New Web Service**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repo

2. **Configure Settings**
   ```
   Name: phishguard
   Region: Oregon (US West)
   Branch: main
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

3. **Environment Variables**
   ```
   NODE_VERSION=18.17.0
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Auto-deploys on every git push

## 📁 Required Project Structure

```
phishguard/
├── render.yaml           ✅ Auto-deployment config
├── package.json          ✅ Dependencies & scripts
├── next.config.js        ✅ Next.js configuration
├── .gitignore           ✅ Excludes node_modules, .next
├── README.md            ✅ Documentation
├── public/              ✅ Static assets
├── src/
│   ├── app/            ✅ Next.js pages
│   ├── components/     ✅ React components
│   ├── lib/            ✅ Core logic
│   └── hooks/          ✅ Custom hooks
└── [other config files]
```

## ✅ Pre-Deployment Checklist

- [x] `package.json` has correct build scripts
- [x] `next.config.js` configured properly
- [x] `.gitignore` excludes build artifacts
- [x] `render.yaml` created (for auto-deploy)
- [x] All dependencies in `package.json`
- [x] No hardcoded secrets/API keys
- [x] Public folder has all static assets

## 🔧 Important Configuration

### next.config.js
Your current config is already optimized:
- ✅ Image optimization disabled (for static export)
- ✅ Webpack configured for ONNX/Transformers
- ✅ Output: standalone (for deployment)

### Environment Variables (if needed)
Add in Render Dashboard → Environment:
```
NODE_ENV=production
NODE_VERSION=18.17.0
```

## 🌐 After Deployment

### Custom Domain (Optional)
1. Go to your service in Render
2. Click "Settings" → "Custom Domain"
3. Add your domain
4. Update DNS records as shown

### Auto-Deploy on Push
- Every push to `main` branch = automatic deployment
- Build time: ~3-5 minutes
- Zero downtime deployments

## 📊 Monitoring

- **Logs**: Render Dashboard → Logs tab
- **Metrics**: CPU, Memory, Response times
- **Health Checks**: Automatic at `/` endpoint

## 🆓 Free Tier Limits

- **Sleep after 15 min inactivity**
- **750 hours/month free**
- **First request may be slow (cold start)**
- **100 GB bandwidth/month**

### Prevent Sleep (Paid plans only)
- Upgrade to Starter plan ($7/month)
- Or use external service to ping every 10 min

## 🐛 Troubleshooting

### Build Fails
```bash
# Check build locally first
npm install
npm run build
npm start
```

### Memory Issues
- Render free tier: 512MB RAM
- If build fails, upgrade to paid plan
- Or optimize build process

### Dependencies Not Found
```bash
# Ensure all dependencies are in package.json
npm install <missing-package> --save
git add package.json package-lock.json
git commit -m "Add missing dependency"
git push
```

## 🔄 Deployment Workflow

```
Local Development → Git Push → Render Auto-Build → Live Site
     (npm run dev)    (main)     (2-5 minutes)    (phishguard.onrender.com)
```

## 📱 Post-Deployment Testing

Test these features on live site:
- ✅ Message analysis with BERT
- ✅ URL pattern detection
- ✅ Real-time risk scoring
- ✅ Responsive UI
- ✅ Client-side processing

## 🎯 Success Criteria

Your app is successfully deployed when:
1. ✅ URL is accessible (no 404)
2. ✅ UI loads correctly
3. ✅ Message analysis works
4. ✅ URL analysis works
5. ✅ No console errors
6. ✅ Response time < 2s

## 🚀 Alternative Hosting Options

If Render doesn't work for you:

1. **Vercel** (Recommended for Next.js)
   - Instant deployment from GitHub
   - Built-in Next.js optimization
   - Free SSL + CDN
   - Deploy: `npx vercel`

2. **Netlify**
   - Free tier with auto-deploys
   - Great for static sites
   - Easy custom domains

3. **Railway**
   - Similar to Render
   - Good free tier
   - Simple setup

## 📞 Support

Issues with deployment? Check:
- Render Status: https://status.render.com
- Render Docs: https://render.com/docs
- GitHub Issues: [Your repo]/issues

---

**Ready to deploy? Follow Option 1 above for the fastest setup!** 🚀
