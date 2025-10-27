# PhishGuard - AI-Powered Phishing Detection System

A modern web application that uses advanced AI and pattern analysis to detect phishing attempts in messages and URLs, helping users stay safe online.

## 🚀 Features

### Message Analysis
- **BERT-powered Text Classification**: Uses `distilbert-base-uncased-mnli` for zero-shot classification
- **Sentiment Analysis**: Detects emotional manipulation tactics
- **Pattern Detection**: Identifies urgency, threats, and suspicious requests
- **Real-time Analysis**: All processing happens in-browser using WebAssembly

### URL Analysis
- **Heuristic Pattern Detection**: Analyzes 111+ URL structural features
- **Risk Scoring**: 25-point intelligent scoring system
- **Suspicious Indicator Detection**:
  - IP addresses instead of domain names
  - Suspicious TLDs (.tk, .ml, .ga, etc.)
  - Excessive hyphens and special characters
  - URL obfuscation techniques
  - Random character spam detection
  - Suspicious keyword patterns
- **Dynamic Confidence Calculation**: Adjusts confidence based on indicator strength

### Security & Privacy
- ✅ **100% Client-Side Processing**: No data sent to servers
- ✅ **Privacy-First**: All analysis happens locally in your browser
- ✅ **No Backend Required**: Pure static web application
- ✅ **Offline Capable**: Works without internet after initial load

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components

### AI/ML
- **Transformers.js** - In-browser machine learning
- **ONNX Runtime Web** - WebAssembly-based ML inference
- **BERT Model** - Advanced natural language understanding

### Analysis
- **Pattern-based Heuristics** - 111-feature URL analysis
- **Zero-shot Classification** - No training data required for new categories
- **Sentiment Analysis** - Emotional manipulation detection

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/phishguard.git
   cd phishguard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Building for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📖 Usage

### Analyzing Messages
1. Paste or type a message into the text area
2. Click "Analyze Content"
3. Review the risk assessment and detected indicators
4. Check explanation details for specific concerns

### Analyzing URLs
1. Enter a URL in the analysis form
2. Click "Analyze Content"
3. View risk score (0-100) and classification
4. Review detected suspicious patterns

### Risk Classifications
- **Legitimate (0-29)**: Safe to interact with
- **Suspicious (30-54)**: Proceed with caution
- **Phishing (55-100)**: Likely malicious, avoid

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📁 Project Structure

```
phishguard/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── phish-guard/  # Main app components
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Core libraries
│       ├── message-analyzer.ts  # BERT-based message analysis
│       ├── url-analyzer.ts      # Pattern-based URL analysis
│       └── local-analyzer.ts    # Orchestration layer
├── public/               # Static assets
└── docs/                 # Documentation
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for any custom configuration:

```env
NEXT_PUBLIC_APP_NAME=PhishGuard
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 🙏 Acknowledgments

- **Transformers.js** by Xenova for in-browser ML capabilities
- **Hugging Face** for the BERT models
- **shadcn/ui** for beautiful UI components
- **Next.js** team for the amazing framework


## 🔒 Security

If you discover a security vulnerability, please email [security@example.com] instead of using the issue tracker.

## 🗺️ Roadmap

- [ ] Browser extension version
- [ ] Mobile app (React Native)
- [ ] Email integration
- [ ] Historical analysis dashboard
- [ ] Multi-language support
- [ ] Advanced ML model training pipeline

---

**Built with ❤️ for a safer internet**
