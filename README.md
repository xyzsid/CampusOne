# CampusOne

A mobile school management app built with **Expo** (React Native) and **Supabase**. Designed for teachers and admins to manage students, attendance, fees, and parent communication — with multilingual support (English + Telugu).

---

## Features

- 👥 **Students** — Browse, search, and add students by name or roll number
- ✓ **Attendance** — Mark and review daily attendance records
- 💰 **Fees** — Track fee status (paid, due soon, overdue) per student
- 💬 **Messages** — Send and monitor messages to parents
- ⚙️ **Settings** — Language toggle (English / Telugu), sign out
- 🔐 **Auth** — Magic link sign-in via Supabase (passwordless)
- 🌐 **i18n** — Full English and Telugu localisation
- 🍎 **Liquid Glass UI** — Uses `expo-glass-effect` for iOS 26+ glassmorphic tab bar

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Expo](https://expo.dev) ~54 (React Native 0.81) |
| Language | TypeScript |
| Backend / Auth | [Supabase](https://supabase.com) |
| Navigation | React Navigation v7 (bottom tabs + native stack) |
| UI primitives | React Native Paper (MD3) + custom component library |
| State | React Context (`AppProvider`) |
| Storage | AsyncStorage (session persistence) |

---

## Project Structure

```
CampusOne/
├── App.tsx                  # Entry point — mounts AppRoot
├── app.json                 # Expo config
├── assets/                  # App icons and splash images
└── src/
    ├── components/
    │   └── ui.tsx           # Shared UI components (Card, Badge, Screen, etc.)
    ├── core/
    │   ├── AppRoot.tsx      # Root component — theme + providers
    │   └── authLinks.ts     # Supabase magic link URL helpers
    ├── data/
    │   └── mockData.ts      # Local mock data (students, fees, attendance)
    ├── i18n/
    │   └── strings.ts       # English + Telugu translations
    ├── lib/
    │   └── supabase.ts      # Supabase client initialisation
    ├── navigation/
    │   ├── MainTabs.tsx     # Bottom tab navigator
    │   ├── RootNavigator.tsx# Auth-gated root navigator
    │   └── types.ts         # Navigation type definitions
    ├── screens/
    │   ├── AttendanceScreen.tsx
    │   ├── AuthScreen.tsx
    │   ├── FeesScreen.tsx
    │   ├── MessagesScreen.tsx
    │   ├── SettingsScreen.tsx
    │   └── StudentsScreen.tsx
    ├── state/
    │   └── appContext.tsx   # Global state (locale, session)
    ├── theme/
    │   └── tokens.ts        # Design tokens (colors, spacing, typography)
    └── types/
        └── models.ts        # Shared TypeScript types (Student, FeeRow, etc.)
```

---

## Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- A [Supabase](https://supabase.com) project

### 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in your values in `.env`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the app

```bash
npm start          # Expo Go / dev client (iOS, Android, Web)
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Browser
```

---

## Supabase Setup

The app expects the following tables with Row Level Security enabled:

| Table | Key columns |
|---|---|
| `students` | `id`, `name`, `roll_no`, `class_name`, `parent_email`, `active` |
| `attendance` | `student_id`, `date`, `present` |
| `fees` | `student_id`, `student_name`, `amount`, `status` |
| `messages` | `id`, `subject`, `recipient`, `status`, `timestamp` |

Auth is handled via Supabase magic links. No passwords are stored.

---

## Localisation

Strings live in `src/i18n/strings.ts`. The active locale is stored in `AppContext` and can be toggled in Settings. To add a new language, add a new entry to the `map` object in `strings.ts`.

---

## Roadmap

- [ ] Wire screens to real Supabase tables (replace mock data)
- [ ] Role-based access (admin vs teacher views)
- [ ] Push notifications for fee reminders
- [ ] Offline-first with sync queue
- [ ] Dark mode support
- [ ] Additional languages (Hindi, Tamil, Kannada)
