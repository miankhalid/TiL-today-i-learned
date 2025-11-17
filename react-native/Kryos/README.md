# Kryos - Twitter/X/Threads clone

Kryos is a social media application similar to Twitter/X built using React Native with TypeScript & some JavaScript, allowing users to create posts, reply to posts, and manage their profiles. The app is fully functional with authentication, post creation, and social features.

### Core Features

1. **User Authentication**
   - Secure sign up and login using Supabase authentication
   - Session management with automatic persistence
   - Protected navigation based on authentication status

2. **Post Creation and Management**
   - Create text posts with optional image attachments
   - Upload multiple images when creating a post
   - View all posts in a feed format

3. **Social Interaction**
   - Reply to existing posts in threaded conversations
   - View detailed post conversations with replies

4. **Profile Management**
   - Update profile information (username, full name, bio, website)
   - Change profile picture using image URLs
   - Manage account settings

5. **UI/UX Features**
   - Responsive design with safe area handling
   - Dark/light theme support with automatic persistence
   - Multi-language support (English and French)
   - Pull-to-refresh functionality for content updates
   - Keyboard-aware input fields for replies

### Data Model

The app uses the following main data structures:

- **User**: Contains user information (ID, name, username, bio, image, website)
- **Post**: Represents a post with content, creation date, user association, parent references for replies, and nested replies

## 🚀 Features

- **React Native** (0.80.2) - Cross-platform mobile development
- **Theming System** - Dynamic light/dark theme switching with MMKV persistence
- **Internationalization** - Multi-language support with i18next (English and French)
- **Authentication** - Supabase-based authentication system (sign in/sign up)
- **API Communication**: Uses Axios through a custom API instance with proper error handling
- **State Management**: React Query handles server state with caching, background updates, and optimistic updates
- **Type Safety** - Comprehensive TypeScript usage with Zod for runtime validation
- **Modern Navigation** - React Navigation 7.x with type-safe routing
- **Redux Toolkit** - Predictable state management
- **Shopify Restyle** - Themed UI components with consistent design system
- **Asset Management** - SVG support and themed assets
- **Fast Storage** - MMKV for high-performance key-value storage
- **Form Validation**: Zod schemas ensure data integrity with React Hook Form integration
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages

## 🛠️ Tech Stack

### Core Libraries
- **React Native**: 0.80.2
- **TypeScript**: Strictly typed JavaScript
- **React Navigation**: 7.x for routing and navigation
- **React Query (TanStack Query)**: 5.x for server state management
- **Redux Toolkit**: State management solution
- **MMKV**: Fast key-value storage
- **i18next**: Internationalization framework
- **Zod**: Runtime validation
- **Supabase**: Backend integration
- **Shopify Restyle**: Theming and styling system

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **React Native Testing Library**: Component testing
- **Babel**: JavaScript compiler
- **Metro**: JavaScript bundler

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components (atomic design)
├── hooks/               # Custom hooks for data fetching and logic
├── navigation/          # Routing configuration
├── screens/             # Screen components
├── services/            # API clients and services (Supabase, MMKV)
├── store/               # Redux store configuration
├── theme/               # Theming system with dark/light mode
├── translations/        # Internationalization files
├── types/               # TypeScript type definitions
├── schemas/             # Zod validation schemas
└── constants/           # Application constants
```

## 🚀 Getting Started

### Prerequisites

- Node.js (>=20.12)
- Yarn package manager
- React Native development environment (Xcode for iOS, Android Studio for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kryos
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **For iOS (after installing dependencies)**
   ```bash
   cd ios && pod install && cd ..
   yarn ios
   ```

4. **For Android**
   ```bash
   yarn android
   ```

5. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Development

1. **Start Metro Bundler**
   ```bash
   yarn start
   ```

2. **Run on iOS**
   ```bash
   yarn ios
   ```

3. **Run on Android**
   ```bash
   yarn android
   ```

## 🧪 Testing

- **Run all tests**: `yarn test`
- **Run tests with coverage report**: `yarn test:report`

## 🧹 Linting and Formatting

- **Run all linting checks**: `yarn lint` (ESLint, Prettier, Type-check)
- **Fix linting issues automatically**: `yarn lint:fix`
- **Run ESLint only**: `yarn lint:rules`
- **Check code formatting**: `yarn lint:code-format`
- **Run TypeScript type checking**: `yarn lint:type-check`

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `yarn android` | Build and run on Android |
| `yarn ios` | Build and run on iOS |
| `yarn start` | Start Metro bundler |
| `yarn test` | Run tests |
| `yarn lint` | Run all linting checks |
| `yarn lint:fix` | Fix linting issues automatically |
| `yarn pod-install` | Install iOS pods |
| `yarn lint:rules` | Run ESLint only |
| `yarn lint:code-format` | Check code formatting with Prettier |
| `yarn lint:type-check` | Run TypeScript type checking |
| `yarn test:report` | Run tests with coverage report |

## 🎨 Theming System

Kryos implements a dynamic theming system using Shopify Restyle:

- **Theme Configuration**: Defined in `src/theme/restyleTheme.ts`
- **Theme Provider**: `ThemeProvider` component manages theme state and persistence
- **Theme Context**: Provides theme switching functionality across the app
- **Persistent Storage**: Theme preference saved with MMKV
- **Navigation Integration**: React Navigation themes match the application theme

## 🌐 Internationalization (i18n)

The application supports multiple languages using i18next:

- **Supported Languages**: English (en-EN) and French (fr-FR)
- **Default Language**: English (en-EN)
- **Resource Files**: Language files located in `src/translations/`
- **Formatter**: Custom capitalization formatter available

## 🔐 Authentication

Kryos integrates with Supabase for authentication:

- **Supabase**: Used for user authentication and authorization
- **Session Management**: Automatic session handling with persistence
- **Hooks**: Custom authentication hooks for sign in, sign up, and logout
- **Protected Routes**: Navigation based on authentication status

## 🗂️ State Management

The application uses multiple state management solutions:

- **Server State**: Managed with React Query (TanStack Query) with caching and background updates
- **Global State**: Managed with Redux Toolkit for predictable state management
- **Local State**: React hooks for component-specific state

## 🛣️ Navigation

- **React Navigation**: 7.x for stack navigation
- **Type Safety**: Generated types for type-safe navigation
- **Protected Routes**: Conditional routing based on authentication status
- **Layout**: Consistent navigation structure across the app

## 🏗️ Architecture Patterns

1. **Modular Structure**: Components organized by feature and atomic design
2. **Separation of Concerns**: Clear separation between presentation and business logic
3. **Type Safety**: Comprehensive TypeScript implementation
4. **Validation**: Zod schemas for runtime validation
5. **Testing**: Jest and React Native Testing Library for unit and integration tests

## 📱 Supported Platforms

- **iOS**: iOS 12 and above
- **Android**: Android 5.0 (API level 21) and above

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/miankhalid/TiL-today-i-learned/blob/main/LICENSE) file for details.

## 🙏 Acknowledgments

- React Native team for the excellent framework
- Shopify for the Restyle theming library
- Supabase team for the backend integration
- The open-source community for countless libraries and tools
