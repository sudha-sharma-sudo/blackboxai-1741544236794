# SolidCab App

A modern ride-hailing mobile application built with React Native.

## Features

- Book rides with real-time fare calculation
- Multiple vehicle types to choose from
- One-way and round trip options
- Location search with autocomplete
- Ride history and tracking
- Secure payment integration
- User profile management

## Tech Stack

- React Native
- TypeScript
- React Navigation
- React Native Safe Area Context
- React Native DateTimePicker
- Styled Components
- Dayjs

## Project Structure

```
src/
├── api/              # API services and endpoints
├── components/       # Reusable UI components
├── screens/          # Screen components
├── styles/          # Theme and global styles
└── types/           # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js >= 14
- npm or yarn
- React Native development environment setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/solidcab-app.git
```

2. Install dependencies:
```bash
cd solidcab-app
npm install
```

3. Start the Metro bundler:
```bash
npm start
```

4. Run the app:
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## Development

### Code Style

- Follow the TypeScript best practices
- Use functional components with hooks
- Maintain component modularity
- Write clean, self-documenting code
- Add proper TypeScript types

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch
```

### Building for Production

```bash
# Build iOS
cd ios && pod install && cd ..
npm run build:ios

# Build Android
npm run build:android
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
