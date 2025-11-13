# LimeWire – Front End  
A React-based client for a LimeWire-style audio library application.  
This interface provides a clean UI for browsing, uploading, streaming, and managing audio files — built as a music-tech prototype combining full-stack engineering with audio-focused product development.

---

## 🎨 Tech Stack  
- **React**
- **Vite**
- **Axios**
- **React Router**
- **Context API** (auth/session)
- **CSS / Custom Components**

---

## 🎧 Features  
- **User Authentication** (login & register)  
- **Audio Library Browser**  
  - View uploaded audio files  
  - Filter by tags, keywords, categories  
- **Audio Player Component**  
  - Stream audio from backend  
  - Playback controls: play/pause, seek, volume  
- **Upload Interface**  
  - Upload audio files + metadata  
- **Search & Filtering Tools**  
- **Responsive UI**  
- **Loading & Error States**

---

## 📁 Folder Structure  
```
/src
  /components      → Player, UploadForm, Navbar, etc.
  /pages           → Library, Auth, Upload, Home
  /api             → Axios API setup
  /context         → Auth / global state
  App.jsx
  main.jsx (or index.jsx)
```

---

## 🔧 Installation & Setup  

These steps show **any collaborator or reviewer** how to run the project:

### 1. Clone the repo  
```bash
git clone https://github.com/DanielAmit217/LimeWire-front-end
cd LimeWire-front-end
```

### 2. Install dependencies  
```bash
npm install
```

### 3. Create `.env`  
Create a file named **.env** in the root:

```
VITE_API_URL=http://localhost:3000
```

(Replace with your deployed backend URL if needed.)

### 4. Run the development server  
```bash
npm run dev
```

App will be available at:  
**http://localhost:5173**

---

## 🔗 Back-End Repository  
This frontend connects to the backend API here:  
👉 **https://github.com/Buru7734/limeWire-Back-End**

---



## 🚧 Future Improvements  
- Waveform visualization  
- Drag-and-drop upload  
- Playlist system  
- Audio trimming / editing  
- Dark mode  
- Cloud storage integration (S3, GCP)  

---

