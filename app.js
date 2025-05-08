let currentSection = "home";
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  renderSection();
  initCarousel();
  initMobileMenu();
});

//------------------------------------------------------MAIN FUNCTIONS------------------------------------------------------

function changeSection(section) {
  currentSection = section;
  renderSection();
  updateNavigation();
}

function renderSection() {
  const mainContent = document.getElementById("main-content");
  const sectionInfo = document.querySelector(".section-info");

  mainContent.innerHTML = "";
  sectionInfo.innerHTML = "";

  const sections = {
    home: renderHome,
    projects: renderProjects,
    about: renderAbout,
    contact: renderContact,
    messages: renderMessages,
  };

  mainContent.appendChild(sections[currentSection]());

  sectionInfo.append(
    createEl(
      "h1",
      { class: "section-description" },
      sectionData[currentSection].title
    ),
    createEl(
      "p",
      { class: "section-info-text" },
      sectionData[currentSection].subtitle
    )
  );

  if (currentSection === "home") initCarousel();
  if (currentSection === "projects") setupProjectModal();
  if (currentSection === "contact") setupContactForm();
}

function addNewProject(title, technologies) {
  const newId =
    portfolioData.projects.length > 0
      ? Math.max(...portfolioData.projects.map((p) => p.id)) + 1
      : 1;

  const newProject = {
    id: newId,
    title: title,
    technologies: technologies.split(",").map((tech) => tech.trim()),
    image: "images/projectbg.jpg",
  };

  portfolioData.projects.push(newProject);
  renderSection();
}

function deleteProject(projectId) {
  portfolioData.projects = portfolioData.projects.filter(
    (p) => p.id !== projectId
  );
  renderSection();
}

//------------------------------------------------------DOM CREATION HELPERS------------------------------------------------------

function createEl(tag, attributes = {}, ...children) {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(attributes)) {
    if (key === "class") {
      element.className = value;
    } else if (key === "dataset") {
      Object.assign(element.dataset, value);
    } else if (key === "style") {
      Object.assign(element.style, value);
    } else if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else {
      element.setAttribute(key, value);
    }
  }

  element.append(...children);
  return element;
}

function createFormGroup(id, labelText, type, placeholder, isTextarea = false) {
  const input = isTextarea
    ? createEl("textarea", {
        id,
        name: id.split("-")[1],
        rows: "1",
        placeholder,
      })
    : createEl("input", {
        type,
        id,
        name: id.split("-")[1],
        placeholder,
      });

  return createEl(
    "div",
    { class: "form-group" },
    createEl("label", { for: id }, labelText),
    createEl(
      "div",
      { class: "input-container" },
      input,
      createEl("div", { class: "input-underline" })
    ),
    createEl("div", { class: "error-message", id: `${id}-error` })
  );
}

function createFormLevel(groups) {
  return createEl("div", { class: "form-level" }, ...groups);
}

function createProjectCard(project, showDeleteButton = false) {
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : project.technologies.split(",").map((tech) => tech.trim());

  const card = createEl(
    "div",
    { class: "project-card" },
    createEl(
      "div",
      { class: "project-image-container" },
      createEl("img", {
        class: "project-bg-image",
        src: "images/projectbg.jpg",
        alt: project.title,
      }),
      createEl("div", { class: "project-overlay" })
    ),
    createEl(
      "div",
      { class: "project-info" },
      createEl("h3", {}, project.title),
      createEl(
        "ul",
        { class: "technologies-list" },
        ...technologies.map((tech) => createEl("li", {}, tech))
      )
    )
  );

  if (showDeleteButton) {
    card.append(
      createEl(
        "button",
        {
          class: "delete-project-button",
          onClick: () => deleteProject(project.id),
        },
        createEl("img", {
          src: "images/bin.png",
          alt: "Delete project",
          class: "delete-icon",
        })
      )
    );
  }
  return card;
}

function createProjectsCarousel() {
  const shouldShowControls = portfolioData.projects.length > 3;

  const carouselControls = shouldShowControls
    ? createEl(
        "div",
        { class: "carousel-controls" },
        createEl(
          "button",
          {
            class: "carousel-btn",
            id: "prev-btn",
          },
          createEl("img", {
            src: "images/left_arrow.png",
            alt: "Previous",
            class: "arrow-icon",
          })
        ),
        createEl(
          "button",
          {
            class: "carousel-btn",
            id: "next-btn",
          },
          createEl("img", {
            src: "images/right_arrow.png",
            alt: "Next",
            class: "arrow-icon",
          })
        )
      )
    : "";

  return createEl(
    "div",
    { class: "carousel-container" },
    createEl(
      "div",
      { class: "projects-wrapper" },
      ...portfolioData.projects
        .slice(0, 3)
        .map((project) => createProjectCard(project, false))
    ),
    carouselControls
  );
}

function createSkillsGrid() {
  return createEl(
    "div",
    { class: "skills-grid" },
    ...portfolioData.skills.map((skill) =>
      createEl(
        "div",
        { class: "skill-item" },
        createEl(
          "div",
          { class: "skill-logo" },
          createEl("img", {
            src: `images/${skill.icon}`,
            alt: `${skill.name} logo`,
          })
        ),
        createEl(
          "div",
          { class: "skill-details" },
          createEl("span", { class: "skill-name" }, skill.name),
          createEl(
            "div",
            { class: "skill-dots" },
            ...Array(5)
              .fill()
              .map((_, i) =>
                createEl("span", {
                  class: `dot ${i < skill.years ? "filled" : ""}`,
                })
              )
          ),
          createEl(
            "span",
            { class: "skill-years" },
            `${skill.years} year${skill.years !== 1 ? "s" : ""}`
          )
        )
      )
    )
  );
}

//------------------------------------------------------SECTION RENDERERS------------------------------------------------------

function renderHome() {
  return createEl(
    "div",
    { class: "home-container" },
    createEl(
      "section",
      { class: "home-logo" },
      createEl("img", {
        src: "images/male.png",
        alt: "Profile Image",
        class: "profile-image",
      })
    ),
    createEl(
      "section",
      { class: "about-section" },
      createEl("h2", {}, "About Me"),
      createEl("p", {}, portfolioData.personalInfo.about)
    ),
    createEl(
      "section",
      { class: "skills-section" },
      createEl("h2", {}, "My Skills"),
      createSkillsGrid()
    ),
    createProjectsCarousel()
  );
}

function renderProjects() {
  return createEl(
    "div",
    { class: "projects-container" },
    createEl(
      "div",
      { class: "projects-header" },
      createEl(
        "button",
        {
          class: "add-project-button",
          id: "add-project-button",
          onClick: () =>
            (document.getElementById("project-modal").style.display = "flex"),
        },
        createEl("img", {
          src: "images/add.png",
          alt: "plus image",
          class: "add-icon",
        }),
        "Add project"
      )
    ),
    portfolioData.projects.length > 0
      ? createEl(
          "section",
          { class: "projects-list" },
          ...portfolioData.projects.map((project) =>
            createProjectCard(project, true)
          )
        )
      : createEl(
          "div",
          { class: "no-projects-message" },
          "There are no projects to display."
        )
  );
}

function renderAbout() {
  return createEl(
    "div",
    { class: "about-container" },
    createEl(
      "div",
      { class: "about-content" },
      createEl(
        "section",
        { class: "about-profile-image" },
        createEl("img", {
          src: "images/male.png",
          alt: "Profile Image",
          class: "profile-image",
        })
      ),
      createEl(
        "section",
        {},
        createEl("h2", {}, "My background"),
        createEl("p", {}, portfolioData.personalInfo.myBackground)
      ),
      createEl(
        "section",
        {},
        createEl("h2", {}, "My hobbies and interests"),
        createEl("p", {}, portfolioData.personalInfo.hobbies)
      ),
      createEl(
        "button",
        {
          class: "contact-me-button",
          onclick: () => changeSection("contact"),
        },
        createEl("img", {
          src: "images/right_arrow.png",
          alt: "right arrow image",
          class: "arrow-icon",
        }),
        "Contact Me"
      )
    )
  );
}

function renderContact() {
  return createEl(
    "div",
    { class: "contact-container" },
    createEl(
      "form",
      {
        id: "contact-form",
        class: "minimalist-form",
      },
      createEl("h2", {}, "Contact me"),
      createFormLevel([
        createFormGroup("contact-name", "Name", "text", "Your Name"),
        createFormGroup("contact-email", "Email", "text", "email@example.com"),
      ]),
      createFormLevel([
        createFormGroup(
          "contact-message",
          "Message",
          "textarea",
          "Hello, my name is...",
          true
        ),
      ]),
      createEl(
        "button",
        {
          type: "submit",
          class: "message-button",
          id: "send-message-button",
        },
        "Send message"
      )
    )
  );
}

function renderMessages() {
  return createEl(
    "div",
    { class: "messages-container" },
    portfolioData.messages.length > 0
      ? createEl(
          "div",
          { class: "messages-list" },
          ...portfolioData.messages.map((msg) =>
            createEl(
              "div",
              { class: "message-card" },
              createEl(
                "div",
                { class: "message-header" },
                createEl("h4", {}, `Name: ${msg.name}`),
                createEl(
                  "span",
                  { class: "message-email" },
                  `Email: ${msg.email}`
                )
              ),
              createEl(
                "div",
                { class: "message-content" },
                createEl("p", {}, `Message: ${msg.message}`)
              )
            )
          )
        )
      : createEl("p", { class: "no-messages" }, "No messages yet.")
  );
}

function updateNavigation() {
  document
    .querySelectorAll(".nav-desktop li, .footer-nav li, .nav-mobile li")
    .forEach((item) => {
      item.classList.toggle("active", item.dataset.section === currentSection);
    });
}

//------------------------------------------------------MODAL AND FORM FUNCTIONS------------------------------------------------------

function setupProjectModal() {
  const modalOverlay = document.getElementById("project-modal");
  const addButton = document.getElementById("add-project-button");
  const closeButton = document.querySelector(".close-modal");
  const form = document.getElementById("add-project-form");
  const titleInput = document.getElementById("project-title");
  const technologiesInput = document.getElementById("project-technologies");

  const resetFormErrors = () => {
    document.querySelectorAll(".form-group").forEach((group) => {
      group.classList.remove("error");
      const errorMsg = group.querySelector(".error-message");
      if (errorMsg) errorMsg.textContent = "";
    });
  };

  const openModal = () => {
    resetFormErrors();
    modalOverlay.style.display = "flex";
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modalOverlay.style.display = "none";
    document.body.classList.remove("modal-open");
    form.reset();
    resetFormErrors();
  };

  addButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isTitleValid = validateField(
      titleInput,
      projectValidationRules["project-title"],
      { showUnderline: false }
    );

    const isTechValid = validateField(
      technologiesInput,
      projectValidationRules["project-technologies"],
      { showUnderline: false }
    );

    if (isTitleValid && isTechValid) {
      const title = titleInput.value.trim();
      const technologies = technologiesInput.value.trim();
      addNewProject(title, technologies);
      closeModal();
      renderSection();
    }
  });

  titleInput.addEventListener("input", () => {
    validateField(titleInput, projectValidationRules["project-title"], {
      showUnderline: false,
    });
  });

  technologiesInput.addEventListener("input", () => {
    validateField(
      technologiesInput,
      projectValidationRules["project-technologies"],
      { showUnderline: false }
    );
  });
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const inputs = [
    { id: "contact-name", rules: contactValidationRules["contact-name"] },
    { id: "contact-email", rules: contactValidationRules["contact-email"] },
    { id: "contact-message", rules: contactValidationRules["contact-message"] },
  ];

  const validateAllFields = () => {
    let isFormValid = true;
    inputs.forEach(({ id, rules }) => {
      const input = document.getElementById(id);
      const isValid = validateField(input, rules);
      if (!isValid) isFormValid = false;
    });
    return isFormValid;
  };

  inputs.forEach(({ id, rules }) => {
    const input = document.getElementById(id);
    const validateFieldHandler = () => validateField(input, rules);

    input.addEventListener("input", validateFieldHandler);
    input.addEventListener("blur", validateFieldHandler);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (validateAllFields()) {
      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const message = document.getElementById("contact-message").value.trim();

      const newId =
        portfolioData.messages.length > 0
          ? Math.max(...portfolioData.messages.map((m) => m.id)) + 1
          : 1;

      portfolioData.messages.push({ id: newId, name, email, message });
      form.reset();
    }
  });
}

function validateField(input, rules, options = { showUnderline: true }) {
  const formGroup = input.closest(".form-group");
  if (!formGroup) return true;

  const errorElement = formGroup.querySelector(".error-message");
  const underline = options.showUnderline
    ? formGroup.querySelector(".input-underline")
    : null;
  const value = input.value.trim();
  let isValid = true;

  formGroup.classList.remove("error");
  if (errorElement) errorElement.textContent = "";
  if (underline) underline.style.background = "var(--primary-color)";

  if (rules.required && !value) {
    if (errorElement) errorElement.textContent = rules.errorMessages.required;
    isValid = false;
  } else if (value.length < rules.minLength) {
    if (errorElement) errorElement.textContent = rules.errorMessages.tooShort;
    isValid = false;
  } else if (value.length > rules.maxLength) {
    if (errorElement) errorElement.textContent = rules.errorMessages.tooLong;
    isValid = false;
  } else if (rules.pattern && !rules.pattern.test(value)) {
    if (errorElement) errorElement.textContent = rules.errorMessages.pattern;
    isValid = false;
  }

  if (!isValid) {
    formGroup.classList.add("error");
    if (underline) underline.style.background = "var(--error-color)";
  }
  return isValid;
}

//------------------------------------------------------INITIALIZERS------------------------------------------------------

function initNavigation() {
  document
    .querySelectorAll(".nav-desktop li, .footer-nav li")
    .forEach((item) => {
      item.addEventListener("click", () => {
        changeSection(item.dataset.section);
      });
    });

  document.querySelectorAll(".nav-mobile li").forEach((item) => {
    item.addEventListener("click", () => {
      changeSection(item.dataset.section);
    });
  });
}

function initCarousel() {
  const wrapper = document.querySelector(".projects-wrapper");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (portfolioData.projects.length <= 3) return;

  let currentIndex = 0;

  const updateProjects = () => {
    wrapper.innerHTML = "";
    const projectsToShow = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % portfolioData.projects.length;
      projectsToShow.push(portfolioData.projects[index]);
    }
    wrapper.append(
      ...projectsToShow.map((project) => createProjectCard(project, false))
    );
  };

  prevBtn?.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + portfolioData.projects.length) %
      portfolioData.projects.length;
    updateProjects();
  });

  nextBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % portfolioData.projects.length;
    updateProjects();
  });

  updateProjects();
}

function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger-icon");
  const menu = document.querySelector(".mobile-menu-container");

  hamburger?.addEventListener("click", (e) => {
    e.stopPropagation();
    hamburger.classList.toggle("open");
    menu.classList.toggle("open");
  });
}
