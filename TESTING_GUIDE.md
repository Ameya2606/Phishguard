# Testing Guide - PhishGuard BERT Implementation

## ✅ App Successfully Running
**URL**: http://localhost:3002

## 🧪 Test Scenarios

### Test 1: Phishing Message Detection

**Input**: Paste this into the analyzer:
```
URGENT: Your Amazon account has been compromised! 
We detected suspicious activity from an unknown device.
Click here within 24 hours to verify your identity: 
http://amazon-secure-verify.tk/login
Failure to act will result in permanent account suspension.
```

**Expected Result**:
- Classification: **Phishing** or **Suspicious**
- Risk Score: **High** (70-100%)
- Explanation should mention:
  - Urgency manipulation ("URGENT", "24 hours")
  - Threats ("permanent suspension")
  - Request for personal information
  - Suspicious URL domain (.tk TLD)
  - Impersonation attempt (Amazon)

---

### Test 2: Legitimate Message

**Input**: Paste this into the analyzer:
```
Hi there,

Your order #AB12345 has been shipped!

Track your package here: https://www.amazon.com/orders

Expected delivery: Tomorrow by 8 PM

Thank you for shopping with us!
```

**Expected Result**:
- Classification: **Legitimate**
- Risk Score: **Low** (0-30%)
- Explanation should mention:
  - Legitimate business communication detected
  - No urgency or threats
  - Official company domain

---

### Test 3: URL with IP Address (Highly Suspicious)

**Input**: Paste this URL:
```
http://192.168.1.100/banking/login.php
```

**Expected Result**:
- Classification: **Phishing** or **Suspicious**
- Risk Score: **High**
- Explanation should mention:
  - IP address usage (major red flag)
  - Missing HTTPS
  - Banking-related path

---

### Test 4: Legitimate URL

**Input**: Paste this URL:
```
https://www.google.com
```

**Expected Result**:
- Classification: **Legitimate**
- Risk Score: **Low**
- Explanation should mention:
  - Well-known domain
  - HTTPS present
  - No suspicious patterns

---

### Test 5: Prize/Lottery Scam

**Input**:
```
🎉 CONGRATULATIONS! 🎉

You've won $5,000,000 in the Microsoft Lottery!

To claim your prize, send your:
- Full name
- Bank account number  
- Social security number

Reply within 48 hours or your prize will be forfeited!
```

**Expected Result**:
- Classification: **Phishing**
- Risk Score: **Very High** (80-100%)
- Explanation should mention:
  - Fraudulent prize notification
  - Request for sensitive information (SSN, bank details)
  - Time pressure ("48 hours")
  - Too-good-to-be-true offer

---

## 📊 What to Observe

### During First Test:
1. **Loading indicator** should appear
2. **Browser console** will show:
   ```
   Loading BERT classification model...
   Classification model loaded successfully
   ```
3. **Download progress** in Network tab (~60-130 MB)
4. First analysis takes **2-5 seconds**

### Subsequent Tests:
1. **Much faster** (<1 second)
2. Models loaded from **cache**
3. No re-download needed

### In Browser DevTools:

**Console Tab** - Should see:
- ✅ Model loading messages
- ✅ No errors
- ✅ Analysis results

**Network Tab** - Should see:
- ✅ Model files downloading (first time only)
- ✅ `.onnx` files being cached
- ✅ No requests to external APIs

**Application Tab** - Should see:
- ✅ Models cached in IndexedDB
- ✅ Cache storage growing (~60-130 MB)

---

## ⚠️ Known Behaviors

### First Load:
- **Slow** (2-5 seconds) - Models downloading
- Network usage spike (~60-130 MB)
- "Analyzing..." spinner visible longer

### Subsequent Loads:
- **Fast** (<1 second) - Models from cache
- No network activity for models
- Nearly instant analysis

### URL Analysis:
- Currently uses **feature-based detection** (111 features)
- Does **NOT** require the trained ONNX model yet
- Will work even without training the model
- More accurate after model training

### Message Analysis:
- Uses **pre-trained BERT** (works immediately)
- Zero-shot classification
- No training required
- Generates on-device explanations

---

## 🐛 If Something Goes Wrong

### Issue: Stuck on "Analyzing..."
**Solution**: 
- Check browser console for errors
- Ensure JavaScript is enabled
- Try clearing site data and refreshing

### Issue: "Failed to load model"
**Solution**:
- Check internet connection (first load only)
- Verify firewall isn't blocking HuggingFace CDN
- Try a different browser

### Issue: Incorrect classifications
**Solution**:
- This is expected during testing phase
- BERT models improve with more context
- URL model needs training for best results

### Issue: Very slow analysis
**Solution**:
- First load is always slow (model download)
- Check Network tab - models should cache
- Try clearing browser cache and reload

---

## ✨ Success Indicators

You'll know everything is working when:

1. ✅ App loads without errors
2. ✅ First analysis takes 2-5 seconds (model loading)
3. ✅ Subsequent analyses are fast (<1 second)
4. ✅ Console shows "Model loaded successfully"
5. ✅ Results have detailed explanations
6. ✅ Risk scores are displayed correctly
7. ✅ UI responds smoothly

---

## 📸 Expected UI Behavior

### Input Phase:
- Text area accepts both messages and URLs
- "Analyze" button enabled when text entered
- Clean, modern interface

### Analysis Phase:
- Loading spinner appears
- Button shows "Analyzing..."
- No page refresh needed

### Results Phase:
- Risk score displayed as circular progress
- Color-coded classification (red/yellow/green)
- Detailed explanation with bullet points
- Smooth fade-in animation

---

## 🎯 Next Steps After Testing

Once basic testing works:

1. **Train the URL model** for better accuracy:
   ```bash
   pip install -r requirements_training.txt
   python train_url_model.py
   copy url_classifier.onnx public\models\
   ```

2. **Test edge cases**:
   - Very long messages
   - Mixed content (message + URL)
   - Non-English text
   - Special characters

3. **Performance optimization**:
   - Monitor memory usage
   - Check model caching
   - Test on slower devices

4. **Production readiness**:
   - Add loading progress indicators
   - Improve error messages
   - Add retry logic
   - Optimize bundle size

---

**Happy Testing!** 🚀

If you encounter any issues, check the browser console first, then review `FIXES_APPLIED.md` for troubleshooting tips.
