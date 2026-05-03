// script.js - Professional Portfolio Interactions

// Resume Download Function
function downloadResume() {
    // Create resume content
    const resumeContent = `
LIHINI GIMHANI
Software Engineering Undergraduate | Full Stack Developer Intern

CONTACT INFORMATION
Email: ul.lihinigimhani@gmail.com
LinkedIn: linkedin.com/in/lihini-gimhani
GitHub: github.com/ullihinigimhani-oss
Location: Colombo, Western Province, Sri Lanka

PROFESSIONAL SUMMARY
A passionate and detail-oriented Software Engineering undergraduate with hands-on experience in 
full-stack development, microservices architecture, and cloud-native applications. Currently working 
as a Full Stack Developer Intern at Ceylon X Corporation. Skilled in building scalable, user-centric 
software solutions using MERN stack, Java, Docker, Kubernetes, and modern development practices.

EDUCATION
Bachelor of Science (Honours) in Information Technology
Sri Lanka Institute of Information Technology (SLIIT) | October 2023 – December 2027
Specialization: Software Engineering

PROFESSIONAL EXPERIENCE
Full Stack Developer Intern
Ceylon X Corporation | January 2026 – Present
- Developing scalable full-stack web applications using modern technologies
- Collaborating with cross-functional teams in agile development environments
- Building and integrating RESTful APIs for seamless data communication
- Working with modern frontend and backend technologies including MERN stack
- Contributing to cloud-native and enterprise-grade software solutions
- Participating in code reviews and maintaining high code quality standards

TECHNICAL SKILLS

Programming Languages: Java, JavaScript, Python, SQL, HTML5, CSS3
Frontend Technologies: React.js, Next.js, Bootstrap, Tailwind CSS, Responsive Web Design
Backend Technologies: Node.js, Express.js, Java Servlets, RESTful APIs
Databases: MongoDB, MySQL, SQL Server
DevOps & Cloud: Docker, Kubernetes, GitHub Actions, CI/CD Pipelines
Tools & Platforms: Git & GitHub, Postman, Figma, VS Code, IntelliJ IDEA

FEATURED PROJECTS

1. Distributed Systems Microservices Platform
- Cloud-native microservices application using Docker and Kubernetes
- Focused on scalability, resilience, and container orchestration
- GitHub: github.com/ullihinigimhani-oss/DS_project.git

2. MediReach
- MERN stack healthcare platform with scalable and user-friendly solutions
- Contributed to full-stack application development in team environment
- GitHub: github.com/chanuka-mr/MediReach.git

3. ROOHUB
- Full-stack MERN application with modern web functionalities and responsive UI
- Implemented backend services and database integration
- GitHub: github.com/ullihinigimhani-oss/ROOHUB.git

4. Textile Saree E-Commerce Platform
- MERN-based e-commerce solution with product catalog and shopping workflows
- Responsive and customer-focused design
- GitHub: github.com/ullihinigimhani-oss/Textile-Saree.git

5. Personal Library Manager
- MERN stack personal management application for book cataloging
- Clean, intuitive user experience design
- GitHub: github.com/ullihinigimhani-oss/personal-library-manager.git

6. Textile Management System
- MERN-based business management platform for streamlined operations
- Full-stack implementation with scalable architecture
- GitHub: github.com/ullihinigimhani-oss/TEXTILE.git
`;
    
    // Create blob and download
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Lihini_Gimhani_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Resume download started!', 'success');
}

// Project Filtering Function
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if ((category === 'all' && btn.textContent.toLowerCase().includes('all')) ||
            (category === 'mern' && btn.textContent.toLowerCase().includes('mern')) ||
            (category === 'fullstack' && btn.textContent.toLowerCase().includes('full stack')) ||
            (category === 'java' && btn.textContent.toLowerCase().includes('java')) ||
            (category === 'cloud' && btn.textContent.toLowerCase().includes('cloud'))) {
            btn.classList.add('active');
        }
    });
    
    // Filter projects
    projects.forEach(project => {
        const projectCategories = project.getAttribute('data-category');
        
        if (category === 'all') {
            project.style.display = 'flex';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 100);
        } else if (projectCategories && projectCategories.includes(category)) {
            project.style.display = 'flex';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 100);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
    
    // Show notification
    if (category !== 'all') {
        showNotification(`Showing ${category} projects`, 'info');
    }
}

// Initialize project cards with animation
function initializeProjectAnimation() {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach((project, index) => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(20px)';
        project.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Notification function
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Close button style
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button event
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeBtn.click();
        }
    }, 5000);
}

// Main DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Profile Photo Display
    const profilePhoto = document.getElementById('profilePhoto');
    const defaultAvatar = document.getElementById('defaultAvatar');
    
    // Check if the image loads successfully
    profilePhoto.onload = function() {
        profilePhoto.style.display = 'block';
        defaultAvatar.style.display = 'none';
    };
    
    // If there's an error loading the image, show the default avatar
    profilePhoto.onerror = function() {
        profilePhoto.style.display = 'none';
        defaultAvatar.style.display = 'flex';
    };
    
    // Check current image state
    if (profilePhoto.complete) {
        if (profilePhoto.naturalWidth === 0) {
            profilePhoto.onerror();
        } else {
            profilePhoto.onload();
        }
    }
    
    // Existing navigation code
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.getElementById('navToggle');
    const contactForm = document.getElementById('contactForm');
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile Navigation Toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = navToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                link.classList.add('active');
            }
        });
    });
    
    // Form Submission Handler
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show success message
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Skill Bars Animation on Scroll
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill bars
                const skillBars = entry.target.querySelectorAll('.skill-level');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s ease-in-out';
                        bar.style.width = width;
                    }, 300);
                });
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe skills section
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Active Nav Link on Scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Initialize project animation
    setTimeout(initializeProjectAnimation, 500);
    
    // Initialize with active home link
    if (window.scrollY < 100) {
        const homeLink = document.querySelector('.nav-link[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
});