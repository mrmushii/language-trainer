# AI Interview Practice Platform

An AI-powered interview practice application that helps users prepare for technical interviews through voice-based conversations with an AI interviewer. Get instant feedback on your performance, practice with real interview questions, and improve your interview skills.

## 🚀 Features

- **Voice-Based AI Interviews**: Practice interviews using natural voice conversations powered by Vapi.ai
- **Interview Generation**: Generate personalized interviews based on role, tech stack, and difficulty level
- **Real-time Feedback**: Receive comprehensive feedback after each interview session
- **Detailed Analytics**: View breakdown scores across multiple categories:
  - Pronunciation & Fluency
  - Grammar & Sentence Structure
  - Vocabulary & Word Choice
  - Coherence & Organization
  - Confidence & Engagement
- **Interview History**: Track all your past interviews and review feedback
- **Tech Stack Support**: Practice interviews for various technologies including React, Node.js, Python, and more
- **User Authentication**: Secure authentication using Firebase Auth
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **AI Voice**: Vapi.ai SDK
- **AI Models**: OpenAI GPT-4, Google AI SDK
- **UI Components**: Radix UI, shadcn/ui
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: Day.js

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+ and npm/yarn/pnpm
- Firebase project with Authentication and Firestore enabled
- Vapi.ai account and API credentials
- OpenAI API key (for AI models)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

   # Firebase Admin SDK (Server-side)
   FIREBASE_ADMIN_PROJECT_ID=your_firebase_project_id
   FIREBASE_ADMIN_CLIENT_EMAIL=your_firebase_admin_client_email
   FIREBASE_ADMIN_PRIVATE_KEY=your_firebase_admin_private_key

   # Vapi.ai Configuration
   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
   NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id

   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key

   # Google AI Configuration (if using)
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
   ```

4. **Set up Firebase Admin SDK**
   
   - Create a service account in Firebase Console
   - Download the private key JSON file
   - Add the credentials to your environment variables

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ai/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (root)/              # Main application routes
│   │   ├── interview/       # Interview pages
│   │   │   ├── [id]/        # Individual interview
│   │   │   │   └── feedback/ # Interview feedback
│   │   │   └── page.tsx     # Interview generation
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   └── api/                 # API routes
│       └── vapi/
│           └── genarate/    # Vapi workflow generation
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── firebase/            # Firebase client/admin setup
│   ├── Agent.tsx            # AI interview agent component
│   ├── AuthForm.tsx         # Authentication form
│   ├── InterviewCard.tsx    # Interview card display
│   └── DisplayTechIcons.tsx # Tech stack icons
├── lib/                     # Utility functions and SDKs
│   ├── actions/             # Server actions
│   │   ├── auth.action.ts  # Authentication actions
│   │   └── general.action.ts # General database actions
│   ├── utils.ts            # Utility functions
│   └── vapi.sdk.ts         # Vapi SDK initialization
├── constants/               # Application constants
│   └── index.ts            # Interview configs, mappings
├── types/                   # TypeScript type definitions
│   ├── index.d.ts          # General types
│   └── vapi.d.ts           # Vapi-specific types
└── public/                  # Static assets
```

## 🎯 Usage

### Starting an Interview

1. **Sign up or Sign in** to your account
2. Navigate to the **Interview** page
3. Click **"Start an Interview"** to generate a new interview
4. The AI will create a personalized interview based on your preferences

### Taking an Interview

1. Select an interview from your dashboard
2. Click the **"CALL"** button to start the voice interview
3. Answer the AI interviewer's questions naturally
4. View real-time transcript of the conversation
5. Click **"End"** when finished

### Viewing Feedback

1. After completing an interview, you'll be redirected to the feedback page
2. Review your overall score and category breakdowns
3. Read strengths and areas for improvement
4. Retake the interview or return to dashboard

## 🔐 Authentication

The application uses Firebase Authentication with session cookies for secure user management. Users can sign up and sign in using email/password authentication.

## 🎤 Voice Interview Integration

The platform integrates with Vapi.ai to provide voice-based interview experiences:
- Real-time speech-to-text transcription
- Natural voice responses using 11Labs
- GPT-4 powered conversation flow
- Customizable interview workflows

## 📊 Feedback System

After each interview, the system generates comprehensive feedback including:
- Overall score (0-100)
- Category-specific scores and comments
- Identified strengths
- Areas for improvement
- Final assessment summary

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is private and proprietary.

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Authentication Errors**
   - Ensure all Firebase environment variables are correctly set
   - Verify Firebase project has Authentication enabled
   - Check that Firestore is properly configured

2. **Vapi.ai Connection Issues**
   - Verify `NEXT_PUBLIC_VAPI_WEB_TOKEN` is set correctly
   - Check that `NEXT_PUBLIC_VAPI_WORKFLOW_ID` matches your Vapi workflow
   - Ensure microphone permissions are granted in the browser

3. **Build Errors**
   - Clear `.next` folder and rebuild
   - Verify all dependencies are installed correctly
   - Check TypeScript configuration

## 📞 Support

For issues and questions, please open an issue in the repository.

---

Built with ❤️ using Next.js and AI technology
