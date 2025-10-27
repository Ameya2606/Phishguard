# Software Requirements Specification (SRS)

## PhishGuard - AI-Powered Phishing Detection System

**Version:** 1.0  
**Date:** October 9, 2025  
**Project Team:** Development Team  
**Document Status:** Final

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 Purpose
   - 1.2 Scope
   - 1.3 Definitions, Acronyms, and Abbreviations
   - 1.4 References
   - 1.5 Overview
2. [Overall Description](#2-overall-description)
   - 2.1 Product Perspective
   - 2.2 Product Functions
   - 2.3 User Characteristics
   - 2.4 Constraints
   - 2.5 Assumptions and Dependencies
3. [Specific Requirements](#3-specific-requirements)
   - 3.1 Functional Requirements
   - 3.2 Non-Functional Requirements
   - 3.3 External Interface Requirements
4. [System Features](#4-system-features)
5. [Data Requirements](#5-data-requirements)
6. [Design Constraints](#6-design-constraints)
7. [Quality Attributes](#7-quality-attributes)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document provides a complete description of the PhishGuard application - an AI-powered phishing detection system designed to analyze URLs and messages for potential phishing threats. This document is intended for:

- Development team members
- Project stakeholders
- Quality assurance team
- System administrators
- End users seeking technical documentation

### 1.2 Scope

**Product Name:** PhishGuard

**Product Description:** PhishGuard is a web-based application that leverages machine learning and rule-based analysis to detect phishing attempts in URLs and text messages. The system provides real-time analysis with detailed risk assessments and actionable feedback.

**Key Objectives:**
- Provide instant phishing detection for URLs and messages
- Achieve high accuracy in identifying phishing attempts
- Minimize false positives for legitimate content
- Offer user-friendly interface accessible to non-technical users
- Support multiple languages and currency formats

**Benefits:**
- Enhanced online security for users
- Educational tool for understanding phishing tactics
- Real-time threat assessment
- No data storage or privacy concerns (client-side processing)

### 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|------|------------|
| **Phishing** | Fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity |
| **ML** | Machine Learning - algorithms that improve through experience |
| **USE** | Universal Sentence Encoder - pre-trained NLP model |
| **API** | Application Programming Interface |
| **UI** | User Interface |
| **UX** | User Experience |
| **TensorFlow.js** | JavaScript library for machine learning in browsers |
| **Next.js** | React framework for web applications |
| **SRS** | Software Requirements Specification |
| **URL** | Uniform Resource Locator |
| **TLD** | Top-Level Domain (e.g., .com, .org) |

### 1.4 References

- IEEE Std 830-1998: IEEE Recommended Practice for Software Requirements Specifications
- Next.js Documentation (v14.0)
- TensorFlow.js Documentation
- React Hook Form Documentation
- Tailwind CSS Documentation

### 1.5 Overview

This document is organized into seven main sections covering the introduction, overall product description, specific requirements, system features, data requirements, design constraints, and quality attributes. Each section provides detailed information necessary for understanding and implementing the PhishGuard system.

---

## 2. Overall Description

### 2.1 Product Perspective

PhishGuard is a standalone web application that operates independently without requiring backend infrastructure or database connectivity. The system is designed to:

- Run entirely in the user's browser (client-side processing)
- Require no user authentication or registration
- Store no personal data or analysis history
- Function offline for rule-based analysis (ML requires initial model download)

**System Context:**
```
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│     PhishGuard Web App          │
│  ┌──────────────────────────┐   │
│  │   User Interface Layer   │   │
│  └───────────┬──────────────┘   │
│              │                   │
│  ┌───────────▼──────────────┐   │
│  │   Analysis Engine         │   │
│  │  • Rule-Based Detection   │   │
│  │  • ML-Based Detection     │   │
│  │  • Scoring Algorithm      │   │
│  └───────────┬──────────────┘   │
│              │                   │
│  ┌───────────▼──────────────┐   │
│  │   TensorFlow.js (ML)      │   │
│  └───────────────────────────┘   │
└─────────────────────────────────┘
```

### 2.2 Product Functions

**Primary Functions:**

1. **URL Analysis**
   - Detect suspicious domain patterns
   - Identify IP-based URLs
   - Check for known malicious TLDs
   - Analyze subdomain structures
   - Detect URL shorteners

2. **Message Analysis**
   - Identify urgent/threatening language
   - Detect requests for personal information
   - Analyze grammar and spelling patterns
   - Recognize lottery/prize scam patterns
   - Identify money-related scams

3. **Hybrid Detection System**
   - Rule-based pattern matching
   - ML-based semantic analysis
   - Keyword extraction and weighting
   - Risk score calculation
   - Classification (Legitimate/Suspicious/Phishing)

4. **User Interface**
   - Dual-mode input (URL/Message)
   - Sample data testing
   - Real-time validation
   - Visual risk indicators
   - Detailed analysis reports
   - Dark/Light theme support

### 2.3 User Characteristics

**Target Users:**

1. **General Public**
   - Age: 13+
   - Technical Expertise: Minimal to none required
   - Usage: Personal email and web browsing protection

2. **Business Users**
   - Age: 18+
   - Technical Expertise: Basic computer literacy
   - Usage: Corporate email security, link verification

3. **Educational Users**
   - Age: 13-65+
   - Technical Expertise: Varied
   - Usage: Learning about phishing tactics and cybersecurity

**User Skills Required:**
- Basic web browsing capability
- Ability to copy/paste text
- Understanding of basic security concepts (helpful but not required)

### 2.4 Constraints

**Technical Constraints:**
- Browser compatibility: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- JavaScript must be enabled
- Minimum screen resolution: 320px width (mobile support)
- Internet connection required for initial ML model download
- ML model size: ~25MB (one-time download)

**Design Constraints:**
- Client-side processing only (no server-side data storage)
- Privacy-first approach (no analytics or tracking)
- Responsive design for mobile/tablet/desktop
- Accessibility compliance (WCAG 2.1 Level AA)

**Regulatory Constraints:**
- GDPR compliance (no personal data collection)
- No data retention requirements
- No third-party data sharing

### 2.5 Assumptions and Dependencies

**Assumptions:**
- Users have access to a modern web browser
- Users can identify when they receive suspicious content
- Users understand the purpose of phishing detection
- Internet connectivity is available for ML features

**Dependencies:**
- Next.js framework (v14.0+)
- React (v18+)
- TensorFlow.js (v4.11+)
- Universal Sentence Encoder model availability
- Node.js (v18+ for development)

---

## 3. Specific Requirements

### 3.1 Functional Requirements

#### FR-1: URL Analysis

**FR-1.1** The system shall accept URL input up to 5000 characters.

**FR-1.2** The system shall validate URL format before analysis.

**FR-1.3** The system shall detect the following URL patterns:
- IP addresses (IPv4 format)
- Suspicious TLDs (.zip, .mov, .xyz, .live, .buzz, .info, .top, .review)
- URL shorteners (bit.ly, t.co, tinyurl.com)
- Complex subdomain structures (>2 subdomains)
- Excessive hyphens in domains (>2)
- Suspicious keywords (login, secure, account, verify, bank, etc.)

**FR-1.4** The system shall assign risk scores based on detected patterns.

**FR-1.5** The system shall classify URLs as Legitimate, Suspicious, or Phishing.

#### FR-2: Message Analysis

**FR-2.1** The system shall accept message text input up to 5000 characters.

**FR-2.2** The system shall analyze text for the following indicators:
- Urgent/threatening language
- Generic salutations
- Requests for personal information
- Poor grammar/spelling
- Money-related scams
- Prize/lottery patterns
- Banking detail requests

**FR-2.3** The system shall detect URLs within messages and apply URL analysis.

**FR-2.4** The system shall identify multi-currency formats (USD, EUR, GBP, INR, etc.).

**FR-2.5** The system shall recognize various number formats (1,000 / 1.000 / 1,00,000).

#### FR-3: Machine Learning Analysis

**FR-3.1** The system shall load the Universal Sentence Encoder model on first use.

**FR-3.2** The system shall cache the ML model for subsequent analyses.

**FR-3.3** The system shall compare input against known phishing patterns.

**FR-3.4** The system shall compare input against known legitimate patterns.

**FR-3.5** The system shall calculate semantic similarity scores.

**FR-3.6** The system shall fallback to rule-based analysis if ML fails.

#### FR-4: Risk Scoring

**FR-4.1** The system shall calculate risk scores from 0-100.

**FR-4.2** The system shall combine rule-based and ML-based scores.

**FR-4.3** The system shall apply adaptive weighting based on signal strength.

**FR-4.4** The system shall classify content as:
- Legitimate (0-20 points)
- Suspicious (21-40 points)
- Phishing (41-100 points)

#### FR-5: User Interface

**FR-5.1** The system shall provide tabbed interface for URL and Message input.

**FR-5.2** The system shall validate input before enabling analysis.

**FR-5.3** The system shall display loading state during analysis.

**FR-5.4** The system shall show visual risk indicators (color-coded).

**FR-5.5** The system shall display detailed analysis results including:
- Risk score (0-100)
- Classification (Legitimate/Suspicious/Phishing)
- Summary explanation
- List of detected indicators

**FR-5.6** The system shall provide sample data for testing.

**FR-5.7** The system shall support dark and light themes.

#### FR-6: Sample Data

**FR-6.1** The system shall provide at least two sample inputs:
- Suspicious URL
- Phishing message

**FR-6.2** Sample data shall auto-populate the input field when selected.

**FR-6.3** Sample data shall trigger validation automatically.

### 3.2 Non-Functional Requirements

#### NFR-1: Performance

**NFR-1.1** The system shall analyze input within 3 seconds (rule-based).

**NFR-1.2** The system shall complete ML analysis within 5 seconds.

**NFR-1.3** The system shall load the initial page within 2 seconds.

**NFR-1.4** The ML model shall load within 10 seconds on first use.

**NFR-1.5** The system shall cache the ML model for instant subsequent uses.

#### NFR-2: Usability

**NFR-2.1** The system shall be operable by users with minimal technical knowledge.

**NFR-2.2** The system shall provide clear, non-technical explanations.

**NFR-2.3** The system shall use intuitive icons and visual indicators.

**NFR-2.4** The system shall be responsive on mobile devices (320px+).

**NFR-2.5** The system shall maintain consistent UI across browsers.

#### NFR-3: Security

**NFR-3.1** The system shall not transmit user input to external servers.

**NFR-3.2** The system shall not store any user data locally.

**NFR-3.3** The system shall not use cookies or tracking mechanisms.

**NFR-3.4** The system shall process all analysis client-side.

**NFR-3.5** The system shall use HTTPS for hosting.

#### NFR-4: Reliability

**NFR-4.1** The system shall maintain 99% uptime (excluding maintenance).

**NFR-4.2** The system shall handle ML failures gracefully.

**NFR-4.3** The system shall validate all inputs before processing.

**NFR-4.4** The system shall display appropriate error messages.

**NFR-4.5** The system shall continue functioning with rule-based analysis if ML fails.

#### NFR-5: Maintainability

**NFR-5.1** The system shall use modular code architecture.

**NFR-5.2** The system shall separate concerns (UI, logic, ML).

**NFR-5.3** The system shall include inline code documentation.

**NFR-5.4** The system shall use TypeScript for type safety.

**NFR-5.5** The system shall follow consistent coding standards.

#### NFR-6: Portability

**NFR-6.1** The system shall run on Windows, macOS, and Linux.

**NFR-6.2** The system shall support major browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**NFR-6.3** The system shall be deployable to any static hosting service.

#### NFR-7: Accessibility

**NFR-7.1** The system shall meet WCAG 2.1 Level AA standards.

**NFR-7.2** The system shall support keyboard navigation.

**NFR-7.3** The system shall use appropriate ARIA labels.

**NFR-7.4** The system shall maintain sufficient color contrast ratios.

**NFR-7.5** The system shall support screen readers.

### 3.3 External Interface Requirements

#### 3.3.1 User Interfaces

**UI-1: Main Page**
- Header with logo and theme toggle
- Tabbed input interface (URL/Message)
- Input validation feedback
- Sample data buttons
- Analysis button
- Results display area

**UI-2: Theme Support**
- Light theme (default)
- Dark theme
- System preference detection
- Persistent theme selection

**UI-3: Responsive Design**
- Mobile view (320px - 767px)
- Tablet view (768px - 1023px)
- Desktop view (1024px+)

#### 3.3.2 Software Interfaces

**SI-1: TensorFlow.js**
- Version: 4.11.0+
- Purpose: ML model execution
- Interface: JavaScript API

**SI-2: Universal Sentence Encoder**
- Version: 1.3.3+
- Purpose: Text embedding generation
- Interface: TensorFlow.js model API

**SI-3: Next.js Framework**
- Version: 14.0.0+
- Purpose: Application framework
- Interface: React components, Server Actions

#### 3.3.3 Communication Interfaces

**CI-1: HTTPS Protocol**
- Purpose: Secure page delivery
- Requirements: TLS 1.2+

**CI-2: Static Asset Loading**
- Purpose: Load ML models and resources
- Protocol: HTTPS
- Source: TensorFlow Hub

---

## 4. System Features

### 4.1 Feature: URL Phishing Detection

**Priority:** High

**Description:** Analyze URLs for phishing indicators using pattern matching and heuristic analysis.

**Functional Requirements:**
- FR-1.1 through FR-1.5

**Use Case:**
```
Actor: User
Precondition: User has received a suspicious link
Main Flow:
1. User selects URL tab
2. User pastes URL into input field
3. System validates URL format
4. User clicks Analyze button
5. System processes URL through detection rules
6. System calculates risk score
7. System displays classification and indicators
Postcondition: User understands risk level of URL
```

### 4.2 Feature: Message Phishing Detection

**Priority:** High

**Description:** Analyze text messages for phishing indicators using keyword analysis and pattern recognition.

**Functional Requirements:**
- FR-2.1 through FR-2.5

**Use Case:**
```
Actor: User
Precondition: User has received a suspicious email or text
Main Flow:
1. User selects Message tab
2. User pastes message content into textarea
3. System validates input length
4. User clicks Analyze button
5. System processes message through keyword analysis
6. System checks for URLs within message
7. System applies ML analysis (if available)
8. System calculates combined risk score
9. System displays classification and detailed indicators
Postcondition: User understands risk level and specific threats
```

### 4.3 Feature: Hybrid ML Detection

**Priority:** Medium

**Description:** Enhance detection accuracy using machine learning-based semantic analysis.

**Functional Requirements:**
- FR-3.1 through FR-3.6

**Technical Details:**
- Model: Universal Sentence Encoder
- Input: Text strings (URLs or messages)
- Output: Semantic similarity scores
- Fallback: Rule-based analysis

### 4.4 Feature: Risk Visualization

**Priority:** High

**Description:** Display risk assessment in an intuitive, visual format.

**Functional Requirements:**
- FR-5.4, FR-5.5

**Components:**
- Circular risk score indicator
- Color-coded classification badge
- Summary text
- Expandable detailed indicators list

### 4.5 Feature: Sample Testing

**Priority:** Low

**Description:** Allow users to test the system with pre-defined examples.

**Functional Requirements:**
- FR-6.1 through FR-6.3

**Sample Types:**
- Suspicious URL (with multiple red flags)
- Phishing message (typical scam pattern)

---

## 5. Data Requirements

### 5.1 Data Models

#### 5.1.1 Analysis Result
```typescript
{
  classification: 'Legitimate' | 'Suspicious' | 'Phishing',
  riskScore: number (0-100),
  summary: string,
  explanation: string,
  indicators: string[]
}
```

#### 5.1.2 Form Input
```typescript
{
  content: string (10-5000 chars)
}
```

### 5.2 Data Dictionary

| Data Element | Type | Description | Constraints |
|--------------|------|-------------|-------------|
| content | string | User input (URL or message) | 10-5000 characters |
| classification | enum | Risk classification | Legitimate/Suspicious/Phishing |
| riskScore | number | Calculated risk value | 0-100 |
| summary | string | Brief assessment | N/A |
| explanation | string | Detailed findings | N/A |
| indicators | array | List of detected issues | String array |

### 5.3 Data Storage

**Principle:** Zero data storage

- No user inputs are stored
- No analysis results are persisted
- No cookies or local storage used (except theme preference)
- ML model cached by browser automatically

---

## 6. Design Constraints

### 6.1 Technology Stack Constraints

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui components
- **ML:** TensorFlow.js, Universal Sentence Encoder
- **Forms:** React Hook Form, Zod validation
- **Icons:** Lucide React

### 6.2 Architecture Constraints

- Client-side rendering only
- Server actions for async operations
- Stateless design (no session management)
- Component-based architecture

### 6.3 Security Constraints

- No server-side data processing
- No external API calls (except ML model download)
- No user authentication required
- No data logging or analytics

---

## 7. Quality Attributes

### 7.1 Accuracy

**Target:** 90%+ detection rate for common phishing patterns

**Measures:**
- True positive rate: ≥90%
- False positive rate: ≤5%
- True negative rate: ≥95%

### 7.2 User Satisfaction

**Target:** User-friendly interface requiring no training

**Measures:**
- Time to first analysis: <30 seconds
- Comprehension of results: 95%+ users understand output
- UI clarity: Clear visual indicators and explanations

### 7.3 Privacy

**Target:** Zero personal data collection

**Measures:**
- No server-side logging
- No cookies (except theme preference)
- No third-party trackers
- No analytics

### 7.4 Scalability

**Target:** Support unlimited concurrent users

**Measures:**
- Client-side processing eliminates server bottlenecks
- CDN hosting for global availability
- No database constraints

### 7.5 Availability

**Target:** 99.9% uptime

**Measures:**
- Static hosting resilience
- No backend dependencies
- Graceful ML degradation

---

## Appendix A: Risk Scoring Algorithm

### Rule-Based Scoring

**URL Analysis:**
- IP Address: +40 points
- Suspicious TLD: +30 points
- URL Shortener: +25 points
- Multiple Subdomains: +20 points
- Suspicious Keywords: +15 points

**Message Analysis:**
- High-risk keywords: +15 points each
- Medium-risk keywords: +8 points each
- Scam phrases: +25 points each
- Urgency + Action combo: +10 points
- Money + Prize + Request: +30 points
- Congratulations + Won: +25 points
- Won + Claim + Details request: +40 points

**ML Scoring:**
- Semantic similarity difference: 0-60 points
- Adaptive weighting: 30-70% based on keyword strength
- Confidence boost: +15% when both methods agree

### Classification Thresholds

- **Legitimate:** 0-20 points
- **Suspicious:** 21-40 points
- **Phishing:** 41-100 points

---

## Appendix B: Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 0.1 | Oct 1, 2025 | Dev Team | Initial draft |
| 0.5 | Oct 3, 2025 | Dev Team | Added ML requirements |
| 1.0 | Oct 9, 2025 | Dev Team | Final version |

---

## Appendix C: Glossary

**Phishing:** A cyber attack that uses disguised email, messages, or websites to trick recipients into revealing sensitive information.

**False Positive:** A legitimate item incorrectly classified as phishing.

**False Negative:** A phishing item incorrectly classified as legitimate.

**Semantic Analysis:** Understanding the meaning of text using AI/ML techniques.

**Risk Score:** Numerical value (0-100) indicating likelihood of phishing.

**TLD:** Top-Level Domain - the last segment of a domain name (e.g., .com, .org).

---

**Document End**
