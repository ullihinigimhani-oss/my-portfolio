// script.js - Professional Portfolio Interactions

// Certificate Data
const certificates = {
    python: {
        title: "Python for Beginners",
        university: "University of Moratuwa, Sri Lanka",
        holder: "Lihini Gimhani",
        issuedBy: "Department of Computer Science & Engineering, Faculty of Engineering",
        issuedDate: "February 28, 2023",
        verificationCode: "Yf59Vingru",
        verifyUrl: "https://open.uom.lk/verify",
        content: `
            <div class="certificate-preview">
                <div class="preview-header">
                    <h3 class="preview-title">Python for Beginners</h3>
                    <div class="preview-university">University of Moratuwa, Sri Lanka</div>
                </div>
                <div class="preview-content">
                    <p>This is to certify that</p>
                    <h4 style="text-align: center; margin: 20px 0; font-size: 24px; color: var(--cert-blue);">Lihini Gimhani</h4>
                    <p>has participated in the online learning programme in <strong>Python for Beginners</strong></p>
                    <p>conducted by the Department of Computer Science & Engineering, Faculty of Engineering, University of Moratuwa</p>
                    <div style="margin-top: 30px; display: flex; justify-content: space-between;">
                        <div>
                            <p><strong>Programme Coordinator</strong></p>
                        </div>
                        <div>
                            <p><strong>Head, Department of Computer Science & Engineering</strong></p>
                        </div>
                    </div>
                    <div style="margin-top: 40px; border-top: 1px solid var(--light-gray); padding-top: 20px;">
                        <p><strong>Verification Code:</strong> Yf59Vingru</p>
                        <p><strong>Verification URL:</strong> https://open.uom.lk/verify</p>
                        <p><strong>Issued Date:</strong> February 28, 2023</p>
                    </div>
                </div>
            </div>
        `
    },
    webdesign: {
        title: "Web Design for Beginners",
        university: "University of Moratuwa, Sri Lanka",
        holder: "Lihini Gimhani",
        issuedBy: "Department of Information Technology, Faculty of Information Technology",
        issuedDate: "2022",
        verificationCode: "39c9W7H96",
        verifyUrl: "https://open.uom.lk/verify",
        content: `
            <div class="certificate-preview">
                <div class="preview-header">
                    <h3 class="preview-title">Web Design for Beginners</h3>
                    <div class="preview-university">University of Moratuwa, Sri Lanka</div>
                </div>
                <div class="preview-content">
                    <p>This is to certify that</p>
                    <h4 style="text-align: center; margin: 20px 0; font-size: 24px; color: var(--cert-blue);">Lihini Gimhani</h4>
                    <p>has participated in the online learning programme in <strong>Web Design for Beginners</strong></p>
                    <p>conducted by the <strong>Department of Information Technology, Faculty of Information Technology, University of Moratuwa</strong></p>
                    <div style="margin-top: 30px;">
                        <p><strong>Programme Coordinator</strong></p>
                        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                            <div>
                                <p><strong>Head, Department of Information Technology</strong></p>
                            </div>
                            <div>
                                <p><strong>Director, Centre for Open & Distance Learning</strong></p>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 40px; border-top: 1px solid var(--light-gray); padding-top: 20px;">
                        <p><strong>Verification Code:</strong> 39c9W7H96</p>
                        <p><strong>Verification URL:</strong> https://open.uom.lk/verify</p>
                        <p><strong>Issued Year:</strong> 2022</p>
                    </div>
                </div>
            </div>
        `
    }
};

// Certificate Functions
function viewCertificate(certId) {
    const cert = certificates[certId];
    if (!cert) return;
    
    document.getElementById('modalTitle').textContent = cert.title;
    document.getElementById('modalBody').innerHTML = cert.content;
    document.getElementById('certificateModal').classList.add('active');
}

function downloadCertificate(certId) {
    const cert = certificates[certId];
    if (!cert) return;
    
    const content = `
        Certificate: ${cert.title}
        Issued to: ${cert.holder}
        Issued by: ${cert.issuedBy}
        Issued Date: ${cert.issuedDate}
        Verification Code: ${cert.verificationCode}
        Verify at: ${cert.verifyUrl}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cert.title.replace(/\s+/g, '_')}_Certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(`${cert.title} certificate download started`, 'success');
}

// Project Filtering Function
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => {
        if (btn.textContent.toLowerCase().includes(category.toLowerCase()) || 
            (category === 'all' && btn.textContent.toLowerCase().includes('all'))) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
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

// Close modal
document.getElementById('modalClose').addEventListener('click', function() {
    document.getElementById('certificateModal').classList.remove('active');
});

// Close modal when clicking outside
document.getElementById('certificateModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});

// Photo Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const photoUpload = document.getElementById('photoUpload');
    const uploadButton = document.getElementById('uploadButton');
    const photoPreview = document.getElementById('photoPreview');
    const defaultAvatar = document.getElementById('defaultAvatar');
    const removePhotoButton = document.getElementById('removePhotoButton');
    
    // Check if there's a saved photo in localStorage
    const savedPhoto = localStorage.getItem('portfolioPhoto');
    if (savedPhoto) {
        photoPreview.src = savedPhoto;
        photoPreview.style.display = 'block';
        defaultAvatar.style.display = 'none';
    }
    
    // Open file dialog when upload button is clicked
    uploadButton.addEventListener('click', function() {
        photoUpload.click();
    });
    
    // Handle file selection
    photoUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('File size should be less than 2MB');
                return;
            }
            
            // Check file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                alert('Please select a valid image file (JPG, PNG, GIF)');
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Save to localStorage
                localStorage.setItem('portfolioPhoto', e.target.result);
                
                // Update preview
                photoPreview.src = e.target.result;
                photoPreview.style.display = 'block';
                defaultAvatar.style.display = 'none';
                
                // Show success message
                showNotification('Photo uploaded successfully!', 'success');
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Remove photo
    removePhotoButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to remove your photo?')) {
            // Remove from localStorage
            localStorage.removeItem('portfolioPhoto');
            
            // Reset preview
            photoPreview.src = '';
            photoPreview.style.display = 'none';
            defaultAvatar.style.display = 'flex';
            
            // Reset file input
            photoUpload.value = '';
            
            // Show notification
            showNotification('Photo removed successfully', 'info');
        }
    });
    
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
        `;
        document.head.appendChild(style);
        
        // Add to document
        document.body.appendChild(notification);
        
        // Close button event
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            
            const slideOutStyle = document.createElement('style');
            slideOutStyle.textContent = `
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(slideOutStyle);
            
            setTimeout(() => {
                notification.remove();
                document.head.removeChild(slideOutStyle);
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                closeBtn.click();
            }
        }, 5000);
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
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            link.classList.add('active');
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
        document.querySelector('.nav-link[href="#home"]').classList.add('active');
    }
});