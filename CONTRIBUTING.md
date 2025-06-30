
# 🤝 Contributing to WikiWhiz

Welcome! 🎉  
We're thrilled that you're considering contributing to **WikiWhiz – Learn Smarter with Wikipedia-Powered Quizzes**, built during the WikiVerse Hackathon at IIIT-Hyderabad. WikiWhiz transforms Wikipedia content into dynamic, interactive quizzes. Let's build a more engaging way to learn — together!

---

## 🚀 How to Contribute

### 1. 🔧 Setup the Project Locally

```bash
git clone https://github.com/yourusername/wikiwhiz.git
cd wikiwhiz
npm install
npm run dev
```

Make sure you have Node.js and npm installed before running the commands.

### 2. 🪛 Good First Issues

If you're new to open source, here are some beginner-friendly tasks:

- Add new question topics (e.g., Art, Music, Philosophy)
- Improve question randomness and difficulty levels  
- Enhance mobile responsiveness
- Add multilingual support using Wiktionary
- Create better loading animations

Look for issues tagged as `good first issue` or `help wanted`.

### 3. 📁 Project Structure

```
wikiwhiz/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   └── ui/         # shadcn/ui components
│   ├── pages/          # Main page components
│   ├── lib/            # Utility functions
│   └── hooks/          # Custom React hooks
├── README.md
├── CONTRIBUTING.md
└── package.json
```

### 4. ✅ Code Guidelines

- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Write clear and descriptive commit messages
- Test your changes before pushing
- Keep components small and focused

### 5. 🧪 Submitting Pull Requests

1. **Fork** the repository
2. **Create** your branch: `git checkout -b feature/your-feature-name`
3. **Make** your changes
4. **Commit**: `git commit -m "Add: your feature description"`
5. **Push**: `git push origin feature/your-feature-name`
6. **Create** a Pull Request (PR) and link any related issues

We'll review and merge it after discussion 🚀

### 6. 🐛 Reporting Issues

When reporting bugs, please include:
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Browser and OS information
- Screenshots if applicable

### 7. 💡 Suggesting Features

We love new ideas! When suggesting features:
- Explain the problem it solves
- Describe your proposed solution
- Consider how it fits with existing features
- Think about Wikipedia API limitations

---

## 🎯 Current Development Priorities

- **Performance**: Optimize Wikipedia API calls
- **UX**: Improve loading states and animations  
- **Content**: Better question generation algorithms
- **Accessibility**: Ensure app works for all users
- **Mobile**: Enhanced mobile experience

---

## 🙋 Need Help?

Reach out to our team:

- **Shashank Verma** – Team Lead  
  📧 f20230547@pilani.bits-pilani.ac.in

- **Aditya Tarun J** – UI/UX Designer  
  📧 adityatarunjandhyala6996@gmail.com

- **Sanjana Kanchi** – Frontend Developer  
  📧 sanjanakanchi21@gmail.com

- **Chandra Harsha** – Project Coordinator

---

## 📋 Development Guidelines

### API Usage
- Always include `origin=*` in Wikipedia API calls for CORS
- Handle API failures gracefully with user-friendly messages
- Respect API rate limits and implement caching where possible

### UI/UX Standards
- Maintain consistent color scheme (blue/purple gradients)
- Ensure responsive design works on all screen sizes
- Use loading states for better user experience
- Provide clear feedback for user actions

### Code Quality
- Write self-documenting code with clear variable names
- Add comments for complex logic
- Use TypeScript interfaces for data structures
- Follow the existing project structure

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Let's make knowledge fun, accessible, and open! 🌍📚**  
**Happy Hacking! 💙**
