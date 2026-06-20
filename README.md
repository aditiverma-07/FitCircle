# FitCircle

A mobile-first accountability app that helps small groups stay consistent with their fitness goals through daily accountability, social motivation, and gamification.

## Setup Instructions

### Prerequisites
- Node.js v18 or standard modern equivalent

### Installation
1. Clone this repository (or download as ZIP).
2. Run \`npm install\` to install dependencies.
3. Run \`npm run dev\` to start the full-stack development server.
4. Access the app at \`http://localhost:3000\`.

### Build for Production
\`npm run build\`
\`npm start\`

## Backend Notes
The app requested a Java 21/Spring Boot backend. Due to constraints in the browser environment, this application ships with a fully configured React frontend and a Node.js Express backend acting as a stand-in for the requested Spring APIs. Standard JSON REST endpoints and a mock database are included to drive the frontend seamlessly.

## Key Features Implemented:
- **Daily Check-In System:** Users can log weight, mood, and habits.
- **Dashboard:** Visualize your progress vs goals, and check your current habits completion.
- **Group Tracking:** Join circles with friends.
- **Social Feed:** Interact with your circles' updates.
