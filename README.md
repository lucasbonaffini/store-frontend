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

## Deployment on Vercel

1. Create an account on [Vercel](https://vercel.com/)
2. Install the Vercel CLI `npm install -g vercel`
3. Run `vercel login` and follow the instructions
4. From the project root, run `vercel`
5. Configure the environment variables in the Vercel dashboard (from those you have in .env)
6. To update your application after changes, run `vercel --prod`

You can also deploy directly by connecting your GitHub repository to Vercel for automatic deployments.

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