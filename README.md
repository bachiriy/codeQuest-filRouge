# Code Quest 🚀

A gamified programming learning platform where users can solve coding challenges, compete with others, and track their progress in programming skills.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Code Quest is an interactive platform designed to help users improve their programming skills through challenges, competitions, and social learning. Users can solve coding problems, participate in competitions, join groups, and track their progress.

## ✨ Features

### User Management
- User registration and authentication
- Profile customization
- Progress tracking and statistics
- Social features (friends, messaging)

### Programming Challenges
- Multi-difficulty challenges (Easy, Medium, Hard, Expert)
- Support for multiple programming languages
- Automated test cases
- Real-time code execution and validation

### Competition System
- Individual and group competitions
- Real-time leaderboards
- Custom competition creation
- Achievement badges

### Social Features
- Group creation and management
- Friend system
- Private messaging
- Solution sharing and commenting

## 🛠 Technologies

### Backend
- Java 17+
- Spring Boot
- PostgreSQL
- Redis
- JUnit & Mockito

### Frontend
- Angular
- TypeScript
- Ionic Framework
- Cypress for testing

## 🚀 Getting Started

### Prerequisites
```bash
# Node.js & npm
node -v  # Should be 14.x or higher
npm -v   # Should be 6.x or higher

# Java
java -version  # Should be 8 or higher

# Angular CLI
npm install -g @angular/cli

# Ionic CLI
npm install -g @ionic/cli
```

### Installation
1. Clone the repository
```bash
git clone https://github.com/bachiriy/codeQuest-filRouge.git
```

2. Backend Setup
```bash
cd api 
./mvnw clean install
./mvnw spring-boot:run
```

3. Frontend Setup
```bash
cd ui 
npm install
ionic serve
```

## 📁 Project Structure
```
code-quest/
├── api/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
├── ui/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── environments/
│   └── package.json
└── README.md
```

## 🧪 Testing

### Backend Tests
```bash
cd api 
./mvnw test
```

### Frontend Tests
```bash
cd ui 
ng test
ng e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **Mohammed El Bachiri** - *Initial work*

## 🙏 Acknowledgments

- Thanks to all contributors who helped with this project
- Inspired by platforms like LeetCode and HackerRank
- Special thanks to the Angular and Spring Boot communities

## 📞 Contact

For any questions or suggestions, please feel free to reach out:
- Project Link: [https://github.com/bachiriy/codeQuest-filRouge](https://github.com/bachiriy/codeQuest-filRouge)

---
⭐️ If you found this project helpful, please give it a star on GitHub!
