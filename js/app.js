/**
 * MARK WILSON DE TORRES - PORTFOLIO ENGINE
 * Minimal & Visual Focused Project Showcase with Dedicated Project Overlay & Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initProjectModals();
  initLightboxViewer();
  initClipboardUtils();
});

/* ==========================================================================
   1. NAVIGATION & SCROLL MANAGEMENT
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileCloseBtn = document.querySelector('.mobile-nav-close');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    const scrollPosition = window.scrollY + 140;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  const openMobileNav = () => {
    mobileDrawer?.classList.add('open');
    mobileOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    mobileDrawer?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileMenuBtn?.addEventListener('click', openMobileNav);
  mobileCloseBtn?.addEventListener('click', closeMobileNav);
  mobileOverlay?.addEventListener('click', closeMobileNav);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer?.classList.contains('open')) {
        closeMobileNav();
      }
    });
  });
}

/* ==========================================================================
   2. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.08
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   3. PROJECT DATA STORE (Clean Presentation + Hidden Technical Details)
   ========================================================================== */
const projectsData = {
  "project1": {
    id: "project1",
    category: "CURRENT CAPSTONE",
    title: "Automated Transaction Processing System for an Online Thrift Store",
    shortDesc: "Automating customer transactions, inventory checking, and order processing through social media.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "n8n", "Docker", "Ngrok", "AI Agents"],
    screenshots: [
      {
        src: "images/projects/daring-darling/dashboard.png",
        caption: "Dashboard"
      },
      {
        src: "images/projects/daring-darling/inventory.png",
        caption: "Inventory Management"
      },
      {
        src: "images/projects/daring-darling/orders.png",
        caption: "Order Management"
      },
      {
        src: "images/projects/daring-darling/invoice.png",
        caption: "Invoice"
      },
      {
        src: "images/projects/daring-darling/social-media.png",
        caption: "Social Media Interaction"
      }
    ],
    details: {
      problem: "The shop primarily handles customer interactions through Instagram and Facebook. Manual checking of product availability, responding to inquiries, confirming orders, and preparing invoices can be time-consuming and may lead to delayed responses or conflicts when multiple customers inquire about the same item.",
      workflow: "Facebook / Instagram → n8n Webhook → AI Agent → MySQL Inventory → Transaction Processing → Automated Response / Invoice",
      lifecycle: "AVAILABLE → ON HOLD → PAID  |  ON HOLD → CANCELLED",
      functions: [
        "Customer sends an inquiry through Facebook or Instagram.",
        "n8n receives the incoming event through a webhook.",
        "AI agent interprets customer intent and extracted queries.",
        "System checks real-time product availability in MySQL.",
        "Customer receives an automated response and can proceed to purchase.",
        "Product placed on hold to help prevent double-selling.",
        "Transaction recorded and invoice generated automatically."
      ],
      database: ["Products", "Customer orders", "Invoices", "Payment information", "Inquiry logs", "Users", "Bundles"],
      contribution: "Full-stack development, database schema design, n8n webhook workflow automation, and AI agent prompt & response pipeline integration."
    }
  },

  "project2": {
    id: "project2",
    category: "INFORMATION SYSTEM",
    title: "Automated Online Facility Reservation through Facebook Messenger",
    shortDesc: "An automated facility reservation system integrating Facebook Messenger, n8n workflows, and database processing.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "n8n", "Docker", "Ngrok"],
    screenshots: [
      {
        src: "images/projects/facility-reservation/dashboard.png",
        caption: "Reservation Management"
      },
      {
        src: "images/projects/facility-reservation/reservations.png",
        caption: "Reservation Records"
      },
      {
        src: "images/projects/facility-reservation/messenger.png",
        caption: "Messenger Interaction"
      }
    ],
    details: {
      problem: "Traditional reservation processes can require users and administrators to manually communicate, verify availability, and process reservation details.",
      workflow: "User → Facebook Messenger → n8n Webhook → Reservation Processing → MySQL Database → Automated Response",
      functions: [
        "Reservation requests submitted through Facebook Messenger.",
        "Automated workflow processing powered by n8n.",
        "Database verification and scheduling management.",
        "Automated communication confirming availability and reservations."
      ],
      database: ["Facility Schedules", "Reservation Records", "User Profiles", "Availability Slots"],
      contribution: "System analysis, relational database structure design, n8n webhook workflow setup, and backend PHP integration."
    }
  },

  "project3": {
    id: "project3",
    category: "INFORMATION SYSTEM + HARDWARE",
    title: "Gym Management System",
    shortDesc: "A gym management system with RFID-based member identification and attendance tracking.",
    technologies: ["RFID", "Database", "Web Application"],
    screenshots: [
      {
        src: "images/projects/gym-management/dashboard.png",
        caption: "Dashboard"
      },
      {
        src: "images/projects/gym-management/members.png",
        caption: "Member Management"
      },
      {
        src: "images/projects/gym-management/attendance.png",
        caption: "RFID Attendance"
      },
      {
        src: "images/projects/gym-management/rfid.png",
        caption: "Attendance Records"
      }
    ],
    details: {
      problem: "Designed to organize member information and automate attendance tracking through RFID-based identification, eliminating manual attendance logbooks.",
      workflow: "RFID Scanner → Member Identification → Gym Management System → Database → Attendance Record",
      functions: [
        "Gym member management and profile organization.",
        "RFID-based physical member identification.",
        "Automated attendance and check-in tracking.",
        "Database management with structured attendance history."
      ],
      database: ["Member Profiles", "RFID Tag Mappings", "Attendance Logs", "Subscription Records"],
      contribution: "Database design, web application backend in PHP/MySQL, frontend user interface, and RFID hardware scan input processing."
    }
  }
};

/* ==========================================================================
   4. PROJECT DETAILS MODAL CONTROLLER
   ========================================================================== */
let activeProject = null;

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeaturedFrame = document.getElementById('modalFeaturedFrame');
  const modalFeaturedImg = document.getElementById('modalFeaturedImg');
  const modalFeaturedCaption = document.getElementById('modalFeaturedCaption');
  const modalThumbnails = document.getElementById('modalThumbnails');
  const modalDetailsSection = document.getElementById('modalDetailsSection');
  const modalProblem = document.getElementById('modalProblem');
  const modalWorkflow = document.getElementById('modalWorkflow');
  const modalFunctions = document.getElementById('modalFunctions');
  const modalContribution = document.getElementById('modalContribution');
  const closeBtn = document.getElementById('modalCloseBtn');

  const openProjectModal = (projectId) => {
    const proj = projectsData[projectId];
    if (!proj) return;
    activeProject = proj;

    // Header info
    modalCategory.textContent = proj.category;
    modalTitle.textContent = proj.title;
    modalDesc.textContent = proj.shortDesc;

    // Featured Screenshot
    const featured = proj.screenshots[0];
    modalFeaturedImg.src = featured.src;
    modalFeaturedImg.alt = `${proj.title} - ${featured.caption}`;
    modalFeaturedCaption.textContent = featured.caption;
    modalFeaturedFrame.onclick = () => openLightboxViewer(proj.id, 0);

    // Thumbnails / Additional Screenshots
    modalThumbnails.innerHTML = proj.screenshots.slice(1).map((s, idx) => `
      <div class="modal-thumbnail-card" onclick="openLightboxViewer('${proj.id}', ${idx + 1})">
        <img src="${s.src}" alt="${s.caption}" class="modal-thumbnail-img" loading="lazy">
        <div class="modal-thumbnail-label">${s.caption}</div>
      </div>
    `).join('');

    // Hidden Detailed Section (Collapsed Accordion)
    modalProblem.textContent = proj.details.problem;
    modalWorkflow.textContent = proj.details.workflow;
    if (proj.details.lifecycle) {
      modalWorkflow.textContent += `\nLifecycle: ${proj.details.lifecycle}`;
    }
    modalFunctions.innerHTML = proj.details.functions.map(f => `<li>${f}</li>`).join('');
    modalContribution.textContent = proj.details.contribution;

    // Reset accordion to closed state
    if (modalDetailsSection) modalDetailsSection.open = false;

    modal.showModal();
  };

  // Attach triggers
  document.querySelectorAll('[data-open-project]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = trigger.getAttribute('data-open-project');
      openProjectModal(projId);
    });
  });

  closeBtn?.addEventListener('click', () => modal.close());

  // Light-dismiss fallback
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    modal.addEventListener('click', (event) => {
      if (event.target !== modal) return;
      const rect = modal.getBoundingClientRect();
      const isContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isContent) modal.close();
    });
  }
}

/* ==========================================================================
   5. LIGHTBOX FULLSCREEN IMAGE VIEWER
   ========================================================================== */
let lightboxProjectId = null;
let lightboxIndex = 0;

function openLightboxViewer(projectId, index) {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;

  lightboxProjectId = projectId;
  lightboxIndex = parseInt(index, 10) || 0;
  updateLightboxState();
  modal.showModal();
}

function updateLightboxState() {
  const proj = projectsData[lightboxProjectId];
  if (!proj) return;

  const screen = proj.screenshots[lightboxIndex];
  if (!screen) return;

  const mainImg = document.getElementById('lightboxMainImg');
  const projectTitle = document.getElementById('lightboxProjectTitle');
  const screenTitle = document.getElementById('lightboxScreenTitle');
  const counter = document.getElementById('lightboxCounter');
  const caption = document.getElementById('lightboxCaption');

  projectTitle.textContent = proj.title;
  screenTitle.textContent = screen.caption;
  counter.textContent = `${lightboxIndex + 1} / ${proj.screenshots.length}`;
  caption.textContent = `${screen.caption} — ${proj.title}`;

  mainImg.src = screen.src;
  mainImg.alt = `${proj.title} - ${screen.caption}`;
}

function initLightboxViewer() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;

  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const closeBtn = document.getElementById('lightboxClose');

  const next = () => {
    const proj = projectsData[lightboxProjectId];
    if (!proj) return;
    lightboxIndex = (lightboxIndex + 1) % proj.screenshots.length;
    updateLightboxState();
  };

  const prev = () => {
    const proj = projectsData[lightboxProjectId];
    if (!proj) return;
    lightboxIndex = (lightboxIndex - 1 + proj.screenshots.length) % proj.screenshots.length;
    updateLightboxState();
  };

  nextBtn?.addEventListener('click', next);
  prevBtn?.addEventListener('click', prev);
  closeBtn?.addEventListener('click', () => modal.close());

  document.addEventListener('keydown', (e) => {
    if (!modal.open) return;
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'Escape') modal.close();
  });

  if (!('closedBy' in HTMLDialogElement.prototype)) {
    modal.addEventListener('click', (event) => {
      if (event.target !== modal) return;
      const rect = modal.getBoundingClientRect();
      const isContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isContent) modal.close();
    });
  }
}

/* ==========================================================================
   6. CLIPBOARD UTILITIES & TOAST NOTIFICATION
   ========================================================================== */
function initClipboardUtils() {
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMsg');

  const showToast = (text) => {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = text;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Copied to clipboard';
      
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`${label}: ${textToCopy}`);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`${label}: ${textToCopy}`);
      }
    });
  });
}
