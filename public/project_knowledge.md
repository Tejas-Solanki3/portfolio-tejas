# Tejas Solanki — Project Knowledge Base
*Internal reference document for AI Portfolio Assistant. Written in third person. Optimized for retrieval and Q&A grounding. All information below is factual and sourced directly from project build logs, engineering documentation, and public demos.*

---

## 1. SaveState — AI-Powered Attendance Verification System

**Live Product:** https://save-state-ai.vercel.app  
**Video Demo:** https://www.linkedin.com/posts/tejas-solanki2006_artificialintelligence-machinelearning-computervision-activity-7476485001300230144-wYX7?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFCWA4gB2R3sDQHcQenTUy7gk2tIfsC18cA  
**Category:** Applied AI / Computer Vision / Machine Learning / Biometric Verification  

### Core Problem Solved
Traditional classroom attendance systems are vulnerable to proxy check-ins (one student marking attendance for another). Tejas built SaveState to fully automate class attendance using facial verification, eliminating manual roll calls and proxy fraud through computer vision.

### Technical Implementation & Architecture
- **Primary AI/ML Focus:** Real-time facial biometric verification and anti-spoofing pipeline.
- **Face Recognition Engine:** Built on the open-source `face_recognition` library (by Adam Geitgey), which wraps dlib's C++ ResNet-34 deep learning model.
  - The model is trained on a dataset of 3M+ faces.
  - Achieves 99.38% accuracy on standard facial recognition benchmarks.
- **Verification Pipeline:**
  1. Student opens webcam within the app.
  2. Captured face is converted into a 128-dimensional face embedding (vector).
  3. This vector is compared against the student's registered profile photo using Euclidean distance.
  4. A strict tolerance threshold of 0.45 is enforced — the match must fall within this distance to be verified.
- **Anti-Spoofing / Contextual Security Layer:** To prevent students from marking attendance remotely (e.g., from outside the classroom), SaveState uses a dynamic, time-limited room code system:
  - The professor generates a unique room code valid for only 2 minutes.
  - Students must enter this code to initialize the webcam session.
  - The backend cross-verifies that the matched face corresponds exactly to the credentials of the logged-in student account (prevents one student verifying while logged in as another).
- **Architecture & Backend:** A lightweight Python Flask microservice handles facial verification — chosen over expensive third-party face-recognition APIs to keep the system cost-efficient. Next.js and MongoDB support the classroom scheduling and student email whitelist dashboard.

### Challenges Overcome & ML Optimization
- **Infrastructure constraint:** Hosting the Flask verification backend on a budget-tier Render instance caused memory-limit crashes under load.
- **Solution implemented:**
  - Incoming camera frames are downscaled to a maximum of 320px before being passed to the recognition model, reducing memory footprint per request.
  - The verification route is wrapped in a manual garbage collection block to force immediate memory release after each request, preventing memory buildup on the constrained instance.
- This allowed a compute-heavy ML verification pipeline to run reliably on low-cost hosting without requiring expensive server tiers.

### Results / Impact
- Delivered a working, deployed, end-to-end AI product (live at save-state-ai.vercel.app).
- Replaced manual/proxy-prone attendance with a two-factor verification model: biometric (face match) + contextual (time-limited room code).
- Demonstrates the ability to design cost-conscious ML infrastructure — running a real facial recognition pipeline on budget hosting through frame downscaling and manual memory management.

---

## 2. OttoAi — AI Personal Operations System

**Live Product:** https://otto-ai.vercel.app  
**Video Demo:** https://www.linkedin.com/posts/tejas-solanki2006_buildinpublic-aiproducts-productengineering-activity-7464898309061599232-Kv75?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFCWA4gB2R3sDQHcQenTUy7gk2tIfsC18cA  
**Category:** LLM Orchestration / Generative AI / Agentic Automation / Productivity  

### Core Problem Solved
Managing daily digital operations has become fragmented — subscriptions, appointments, deadlines, emails, and documents are scattered across disconnected tools, causing heavy manual context-switching. OttoAi consolidates this into an intelligent AI-powered operations agent that monitors priorities, summarizes workflows, and lets users execute actions directly through AI orchestration.

### Technical Implementation & Architecture
- **Primary AI/LLM Focus:** Multi-service LLM orchestration, intelligent context parsing, automated summarization, and agentic task execution.
- **LLM Orchestration Backend:** Built with FastAPI, responsible for coordinating AI actions and prompt pipelines across connected services (summarization, drafting, priority detection).
- **Ecosystem Integrations & OAuth Pipelines:** 4+ Google services integrated with robust token management:
  - **Gmail** — AI-generated inbox summaries; AI-drafted replies generated directly in-app.
  - **Google Docs/Drive** — documents are analyzed and summarized by LLMs so users don't need to open and parse each file manually.
  - **Google Calendar** — supports creating bookings, auto-generating Google Meet links, sending invites, and syncing events.
  - **Google Fit** — activity and health metric data integration.
- **Operations Dashboard:** Provides a live, unified view of inbox activity, document summaries, upcoming events, connected app status, workflow health, automation signals, and system metrics.

### Engineering & Problem Solving
- Engineered beyond simple wrapper APIs: built robust authentication, automatic token refresh routines, and multi-service LLM context pipelining.
- Managed the complexity of orchestrating 4+ distinct Google APIs under one unified FastAPI backend with resilient error handling.

### Results / Impact
- Shipped a live, production-grade AI product (otto-ai.vercel.app) with real OAuth-authenticated integrations.
- Consolidated previously siloed tools into one actionable, AI-orchestrated operations hub.

---

## 3. SecureExam Lite — AI Browser-Based Proctoring System

**Video Demo:** https://www.linkedin.com/posts/tejas-solanki2006_edtech-ai-flask-activity-7363871384864727040-F9Dv?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFCWA4gB2R3sDQHcQenTUy7gk2tIfsC18cA  
**Category:** Computer Vision / Real-Time Proctoring / AI Anomaly Detection  

### Core Problem Solved
Preventing cheating in unproctored online assessments (impersonation, multi-person collusion, tab-switching, unauthorized copy-pasting) typically requires invasive desktop installations. SecureExam Lite provides an AI proctoring system that runs entirely inside the browser to detect and flag suspicious exam behavior in real time.

### Technical Implementation & Architecture
- **Primary AI/CV Focus:** Real-time computer vision inference in browser environments.
- **Vision Pipeline:** MediaPipe and OpenCV for real-time face tracking and multi-face anomaly detection.
- **Proctoring AI Detection Features:**
  - Multiple-face detection (flags whenever more than one person appears in frame).
  - Continuous face-activity & presence tracking.
  - Browser-level event telemetry: Tab-switch detection and right-click restriction.
- **System Architecture:** Flask backend providing auto-grading and structured proctoring log telemetry for educators.

### Results / Impact
- Delivered a working AI proctoring prototype with live computer vision inference running seamlessly alongside behavioral telemetry.

---

## 4. Gesture-Controlled Combat — AI-Powered Gaming Interface

**Video Demo:** https://www.linkedin.com/posts/tejas-solanki2006_artificialintelligence-computervision-gesturerecognition-activity-7346047514065707009-0B0E?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFCWA4gB2R3sDQHcQenTUy7gk2tIfsC18cA  
**Category:** Computer Vision / Pose Estimation / Human-Computer Interaction (HCI) / AI Gaming  

### Core Problem Solved
Enabling controller-free, real-time gaming interaction by translating human body movements into discrete combat inputs using standard webcam feeds without specialized hardware sensors.

### Technical Implementation & Architecture
- **Primary AI/CV Focus:** Real-time pose estimation and low-latency gesture classification.
- **OpenCV:** High-frequency webcam frame capture and preprocessing.
- **MediaPipe Pose Tracking:** ML-based 33-point 3D full-body landmark estimation.
- **Inference & Key Simulation:** Custom geometric gesture classifier mapping landmark vectors to game actions, integrated with `pynput` for sub-frame latency input synthesis into *Street Fighter IV*.
- **Gesture Mapping Logic:**
  | Gesture | In-Game Action |
  |---|---|
  | Right hand raised/extended | Punch |
  | Left hand raised/extended | Kick |
  | Both hands down | Crouch |
  | Both hands up | Jump |
  | Right hand up | Move Forward |
  | Left hand up | Move Backward |

### Results / Impact
- Achieved low-latency, controller-free gameplay of commercial games using purely open-source vision models and accessible webcams.

---

## Cross-Project Technical Summary (Quick Reference for LLM)

| Project | Primary Focus & Domain | Core AI/ML Component | Live URL | Video Demo |
|---|---|---|---|---|
| SaveState | AI Biometric Verification | dlib ResNet-34 Face Recognition (99.38% acc) | https://save-state-ai.vercel.app | [LinkedIn Demo](https://www.linkedin.com/posts/tejas-solanki2006_artificialintelligence-machinelearning-computervision-activity-7476485001300230144-wYX7) |
| OttoAi | LLM Agent & Automation | Multi-service LLM orchestration & OAuth | https://otto-ai.vercel.app | [LinkedIn Demo](https://www.linkedin.com/posts/tejas-solanki2006_buildinpublic-aiproducts-productengineering-activity-7464898309061599232-Kv75) |
| SecureExam Lite | Real-Time AI Proctoring | MediaPipe & OpenCV Face/Presence tracking | - | [LinkedIn Demo](https://www.linkedin.com/posts/tejas-solanki2006_edtech-ai-flask-activity-7363871384864727040-F9Dv) |
| Gesture Combat | Pose Estimation & HCI | MediaPipe 33-landmark pose classification | - | [LinkedIn Demo](https://www.linkedin.com/posts/tejas-solanki2006_artificialintelligence-computervision-gesturerecognition-activity-7346047514065707009-0B0E) |

**Key AI & Problem-Solving Themes:**
- Core strengths centered around Applied AI/ML, Computer Vision (MediaPipe, OpenCV, dlib), and LLM Orchestration & Automation.
- Deep optimization of ML pipelines for production constraints (memory management, frame downscaling, low-latency inference).
