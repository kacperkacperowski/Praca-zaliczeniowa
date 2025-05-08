const portfolioData = {
  personalInfo: {
    name: "Kacper",
    lastName: "Woźniak",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    myBackground:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    hobbies:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    email: "john.doe@example.com",
    phone: "+123456789",
  },

  skills: [
    { name: "HTML", years: 4, icon: "HTML5.png" },
    { name: "CSS", years: 3, icon: "CSS3.png" },
    { name: "JavaScript", years: 5, icon: "Javascript.png" },
    { name: "Git", years: 1, icon: "Git.png" },
    { name: "Figma", years: 1, icon: "Figma.png" },
    { name: "Chrome", years: 3, icon: "Chrome.png" },
    { name: "VSCode", years: 5, icon: "VSCode.png" },
  ],

  projects: [
    {
      id: 1,
      title: "E-commerce Website",
      technologies: "React, Node.js, MongoDB, Stripe API",
    },
    {
      id: 2,
      title: "Portfolio Website",
      technologies: "HTML, CSS, JavaScript",
    },
    {
      id: 3,
      title: "Task Management App",
      technologies: "React, Firebase",
    },
    {
      id: 4,
      title: "Weather Application",
      technologies: "JavaScript, OpenWeather API",
    },
  ],

  messages: [
    {
      id: 1,
      name: "Alice Smith",
      email: "alice@example.com",
      message: "Hello, I'm interested in your work!",
    },
    {
      id: 2,
      name: "Bob Johnson",
      email: "bob@example.com",
      message: "Can we schedule a meeting to discuss potential collaboration?",
    },
  ],
};

const sectionData = {
  home: {
    title: `KACPER WOŹNIAK`,
    subtitle: "WEB-DESIGNER",
  },
  projects: {
    title: "MY PROJECTS",
    subtitle: "MADE WITH LOVE",
  },
  about: {
    title: "ABOUT ME",
    subtitle: "IT'S A-ME, KACPER!",
  },
  contact: {
    title: "CONTACT ME",
    subtitle: "SAY HELLO TO ME",
  },
  messages: {
    title: "MESSAGES",
    subtitle: "MESSAGE FROM THE INTERESTED PERSON",
  },
};

const contactValidationRules = {
  "contact-name": {
    minLength: 3,
    maxLength: 20,
    errorMessages: {
      tooShort: "The name must be at least 3 characters long.",
      tooLong: "The name must not exceed 20 characters.",
    },
  },
  "contact-email": {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessages: {
      pattern: "Please enter a valid email address."
    },
  },
  "contact-message": {
    minLength: 1,
    maxLength: 100,
    errorMessages: {
      tooShort: "The message cannot be empty.",
      tooLong: "The message must not exceed 100 characters.",
    },
  },
};

const projectValidationRules = {
  "project-title": {
    minLength: 3,
    maxLength: 30,
    errorMessages: {
      tooShort: "The title must be at least 3 characters long.",
      tooLong: "The title must not exceed 30 characters.",
    },
  },
  "project-technologies": {
    required: true,
    errorMessages: {
      required: "Please add some technologies.",
    },
  },
};

const sections = ["home", "projects", "about", "contact", "messages"];
