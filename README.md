# InContext App

A full-stack application with a React Native frontend and Python backend for AI-powered chat functionality.

## Project Structure

```
InContextApp/
├── src/                    # React Native app source code
├── ai_server.py           # Python AI server
├── requirements.txt        # Python dependencies
├── package.json           # React Native dependencies
├── App.tsx               # React Native app entry point
└── README.md             # Project documentation
```

This is much simpler and easier to work with. You can now:

1. **Run the Python server** from the root:
   ```bash
   python ai_server.py
   ```

2. **Run the React Native app** from the root:
   ```bash
   npx expo start
   ```

The structure is now back to the original simple format without the frontend/backend folder separation. Everything is at the root level for easy access and development.
