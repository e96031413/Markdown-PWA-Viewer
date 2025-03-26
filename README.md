# Markdown PWA Viewer

A beautiful, modern Progressive Web App for viewing markdown files with support for offline usage, dark mode, math equations, and dynamic loading.

![Markdown Viewer Screenshot](https://github.com/user-attachments/assets/8b93acee-47d0-4690-bceb-62f8c8c3870e)

## Features

- 📱 Progressive Web App (PWA) support
- 🌓 Dark mode support
- ⚡ Dynamic chunk loading for large files
- 📂 Drag & drop file upload
- 🔄 Automatic file preview
- 💾 Offline support
- 🖥️ Responsive design
- 🎨 Beautiful typography and UI
- 🔒 Secure file handling (client-side only)
- 📐 LaTeX math equations support
- 🎯 Optimized performance with virtual scrolling

## File Storage

This application processes markdown files entirely on the client side:

- Files are stored temporarily in the browser's memory while viewing
- No server-side storage or processing
- Files are cleared when you close or refresh the browser
- For offline access, files are cached using Service Workers

## Development

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Building for Production

Build the application:
```bash
npm run build
```

The build output will be in the `dist` directory.

### Deployment Options

#### 1. Netlify (Recommended)

The easiest way to deploy this application is through Netlify:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

#### 2. Static Hosting

You can deploy the `dist` directory to any static hosting service:

- GitHub Pages
- Vercel
- Cloudflare Pages
- Any static file hosting

### Post-Deployment

After deployment:

1. Verify PWA functionality
2. Test offline capabilities
3. Confirm file upload and preview features
4. Check dark mode switching
5. Test math equation rendering
6. Test on different devices and browsers

## Usage

1. **Upload Files**
   - Drag and drop markdown files onto the upload area
   - Click the upload area to select files
   - Only `.md` files are supported

2. **View Files**
   - Click on a file in the sidebar to view its contents
   - Content is automatically rendered as HTML
   - Code blocks are syntax highlighted
   - Images and links are supported
   - Math equations are rendered using KaTeX

3. **Dark Mode**
   - Toggle dark mode using the sun/moon icon
   - Preference is saved locally
   - Optimized contrast for better readability
   - Math equations adapt to dark theme

4. **Offline Usage**
   - Install the PWA when prompted
   - Files viewed while online will be available offline
   - Changes are synchronized when back online

5. **Math Equations**
   - Supports inline math using single `$` delimiters
   - Supports display math using double `$$` delimiters
   - Example inline: $E = mc^2$
   - Example display:
     $$
     \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
     $$

## Technical Details

- Built with React and TypeScript
- Uses Vite for building and development
- Tailwind CSS for styling
- Marked for markdown parsing
- KaTeX for math equation rendering
- DOMPurify for security
- Service Workers for offline functionality
- React Virtuoso for efficient large file rendering

## Security

- All processing is done client-side
- Files are never uploaded to any server
- Content is sanitized using DOMPurify
- Math expressions are safely rendered
- No external API calls or tracking

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS/Android latest)

## Math Support

The application supports LaTeX math equations through KaTeX:

- Inline math using single `$` delimiters
- Display math using double `$$` delimiters
- Supports most LaTeX math commands
- Automatically adjusts for dark mode
- High-quality typography for mathematical notation
