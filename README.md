# FakeStore

An online product store built with React, Redux Toolkit, Firebase and Chakra UI.

## Features

- Product catalog with search functionality
- Shopping cart
- Checkout process
- Order storage in Firebase
- Responsive design with Chakra UI

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Firebase account
- Vercel account (for deployment)

## Firebase Setup

1. Create a project in [Firebase Console](https://console.firebase.google.com/)
2. Create a web application in your project
3. Enable Firestore Database in your project
4. Copy the configuration credentials
5. Create a `.env` file in the project root based on `.env.example`
6. Fill in the environment variables with your Firebase credentials

## Local Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployed Version

The application is already deployed and available at:
[https://store-frontend-sable-ten.vercel.app/](https://store-frontend-sable-ten.vercel.app/)

## Deployment on Vercel

This project is deployed using Vercel. If you want to deploy your own version:

1. Create an account on [Vercel](https://vercel.com/)
2. Connect your GitHub repository to Vercel for automatic deployments
3. Configure the environment variables in the Vercel dashboard (from those you have in .env)

## Project Structure

- `/src/api`: API configuration and endpoints
- `/src/assets`: Static resources
- `/src/components`: Reusable components
- `/src/firebase`: Firebase configuration
- `/src/hooks`: Custom hooks
- `/src/pages`: Application pages
- `/src/services`: Data services (products, cart, orders)
- `/src/store`: Global state with Redux Toolkit
- `/src/types`: TypeScript types

## License

MIT