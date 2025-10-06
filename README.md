# Limewire

**Limewire** is a modern audio file management and sharing platform that allows users to upload, discover, and interact with sound files including sound effects, Foley audio, and music samples. Built as a tribute to the classic file-sharing application, this web-based platform provides a community-driven space for audio enthusiasts, content creators, and music producers to share and discover high-quality audio content.

The application was developed to address the need for a centralized platform where audio professionals and hobbyists can organize, share, and collaborate around audio files. Whether you're a filmmaker looking for the perfect sound effect, a musician searching for unique samples, or a sound designer wanting to share your creations, Limewire provides an intuitive and feature-rich environment for audio file management.

## Getting Started

### 🚀 Live Application
[Deployed Application Link] - *Coming Soon*

### 📋 Planning Materials
[Trello Board / Project Planning Link] - *Coming Soon*

### 🔗 Backend Repository
[Backend Repository Link] - *Coming Soon*

### 🛠️ Local Development

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd LimeWire-front-end
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_BACK_END_SERVER_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```



## Features

- **User Authentication**: Secure sign-up and sign-in functionality with JWT token management
- **Audio Upload**: Upload various audio file formats with metadata including titles and tags
- **Audio Streaming**: Built-in audio player with controls for seamless playback
- **Tagging System**: Categorize sounds with tags like "Music", "Foley", "Sound Effect", "Ambient", and "Sound Bite"
- **User Profiles**: Personal profile pages displaying uploaded sounds and user information
- **Community Interaction**: Comment system for sounds with full CRUD functionality
- **Discovery Dashboard**: Browse all users and their uploaded content
- **Responsive Design**: Mobile-friendly interface with modern styling

## Technologies Used

### Frontend
- **React 19.1.1** - Modern JavaScript library for building user interfaces
- **React Router 7.9.3** - Declarative routing for React applications
- **Vite 7.1.7** - Fast build tool and development server
- **Axios 1.12.2** - Promise-based HTTP client for API communication

### Audio Technologies
- **react-audio-player 0.17.0** - React component for audio playback
- **wavesurfer.js 7.11.0** - Audio waveform visualization library

### Development Tools
- **ESLint 9.36.0** - Code linting and style enforcement
- **React Hooks ESLint Plugin** - React-specific linting rules
- **Vite React Plugin** - React integration for Vite

### Styling
- **CSS3** - Custom styling with modern CSS features
- **Responsive Design** - Mobile-first approach with flexible layouts

## Attributions

- **react-audio-player** - [MIT License](https://github.com/justinmc/react-audio-player) - Audio playback functionality
- **Axios** - [MIT License](https://github.com/axios/axios) - HTTP client library
- **React Router** - [MIT License](https://github.com/remix-run/react-router) - Routing solution

## Next Steps

### Planned Enhancements (Stretch Goals)

#### 🎵 Advanced Audio Features
- **In-app Audio Editing**: Implement audio manipulation tools including:
  - Pitch adjustment controls
  - Basic filtering and effects

#### 🔍 Enhanced Discovery
- **Advanced Search**: Implement search functionality by sound name and tags
- **Like System**: Add ability to like/favorite sounds with ranking system
- **Category Filtering**: Filter sounds by specific tags and categories

#### 🎨 User Experience Improvements
- **Drag & Drop Upload**: Intuitive file upload interface
- **Batch Upload**: Upload multiple files simultaneously

---

*Built with ❤️ for the audio community*
