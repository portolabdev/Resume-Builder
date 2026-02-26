const testimonials = [
    {
        id: 1,
        name: "Ashish Singh",
        company: "TechSolutions",
        position: "CEO",
        feedback: "Working with THE ETERNALS was a fantastic experience. They delivered our website ahead of schedule and the quality exceeded our expectations. Highly recommended for any web development project.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        date: "2026-02-15"
    },
    {
        id: 2,
        name: "Dhruva khare",
        company: "Client",
        position: "Project Manager",
        feedback: "The team at THE ETERNALS transformed our outdated website into a modern, responsive platform that has significantly improved our user engagement. Their attention to detail is remarkable.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        date: "2026-02-10"
    },
    {
        id: 3,
        name: "Priya Patel",
        company: "InnovateStart",
        position: "Founder",
        feedback: "As a startup, we needed a cost-effective but professional web presence. THE ETERNALS delivered exactly what we needed and provided excellent ongoing support. Great value for money!",
        rating: 4,
        image: "https://randomuser.me/api/portraits/women/63.jpg",
        date: "2026-02-05"
    },
    {
        id: 4,
        name: "Rahul Sharma",
        company: "Digital Solutions",
        position: "CTO",
        feedback: "THE ETERNALS demonstrated exceptional technical skills and creativity. They understood our requirements perfectly and delivered a solution that exceeded our expectations.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/22.jpg",
        date: "2026-01-28"
    },
    {
        id: 5,
        name: "Anjali Mehta",
        company: "Creative Agency",
        position: "Creative Director",
        feedback: "I'm impressed by how quickly THE ETERNALS adapted to our project needs. Their communication was excellent throughout, and they always met deadlines.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        date: "2026-01-20"
    },
    {
        id: 6,
        name: "Vikram Singh",
        company: "E-Commerce Plus",
        position: "Owner",
        feedback: "The e-commerce website built by THE ETERNALS has helped us increase our online sales by 40%. Their understanding of business requirements is commendable.",
        rating: 4,
        image: "https://randomuser.me/api/portraits/men/67.jpg",
        date: "2026-01-15"
    }
];

// ===== GLOBAL VARIABLES =====
let experiences = [];
let educations = [];
let currentTemplate = 'modern';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAll();
});

function initializeAll() {
    // Initialize all components
    initializeTabs();
    initializeEventListeners();
    initializeTemplateSelector();
    initializeBackToTop();
    initializeSmoothScroll();
    initializeFeedbackSection();
    loadCarouselTestimonials();
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            offset: 50,
        });
    }
}

// ===== TESTIMONIAL HELPER FUNCTIONS =====
function getAllTestimonials() {
    return testimonials;
}

function getTestimonialById(id) {
    return testimonials.find(t => t.id === id);
}

function getAverageRating() {
    const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
    return (total / testimonials.length).toFixed(1);
}

function getTestimonialsByRating(rating) {
    return testimonials.filter(t => t.rating === rating);
}

function getLatestTestimonials(count = 3) {
    return [...testimonials].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, count);
}

// ===== FEEDBACK SECTION FUNCTIONS =====
function initializeFeedbackSection() {
    if (typeof testimonials !== 'undefined') {
        displayTestimonials(getLatestTestimonials(6));
        updateStats(testimonials);
        initializeFeedbackForm();
        
        // Rating input functionality
        initializeRatingInput();
    }
}

function loadCarouselTestimonials() {
    const carouselInner = document.getElementById('testimonial-carousel');
    if (!carouselInner) return;
    
    const latestTestimonials = getLatestTestimonials(3);
    
    carouselInner.innerHTML = latestTestimonials.map((testimonial, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <div class="row justify-content-evenly">
                <div class="col-2 text-center">
                    <i class="bi bi-quote display-4 text-muted"></i>
                </div>
                <div class="col-10">
                    <p class="text-muted">"${testimonial.feedback}"</p>
                    <h4>${testimonial.name}</h4>
                    <p class="text-muted">${testimonial.company}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function displayTestimonials(testimonialsArray) {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    container.innerHTML = testimonialsArray.map(testimonial => `
        <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up">
            <div class="testimonial-card h-100">
                <div class="testimonial-header">
                    <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-img">
                    <div class="testimonial-rating">
                        ${generateStars(testimonial.rating)}
                    </div>
                </div>
                <div class="testimonial-body">
                    <p class="testimonial-text">"${testimonial.feedback}"</p>
                </div>
                <div class="testimonial-footer">
                    <h5 class="testimonial-name">${testimonial.name}</h5>
                    <p class="testimonial-position">${testimonial.position}, ${testimonial.company}</p>
                    <small class="testimonial-date">${formatDate(testimonial.date)}</small>
                </div>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="bi bi-star-fill text-warning"></i>';
        } else {
            stars += '<i class="bi bi-star text-warning"></i>';
        }
    }
    return stars;
}

function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function updateStats(testimonialsArray) {
    const statsContainer = document.getElementById('feedback-stats');
    if (!statsContainer) return;

    const totalFeedbacks = testimonialsArray.length;
    const averageRating = (testimonialsArray.reduce((sum, t) => sum + t.rating, 0) / totalFeedbacks).toFixed(1);
    const fiveStarCount = testimonialsArray.filter(t => t.rating === 5).length;

    statsContainer.innerHTML = `
        <div class="row text-center">
            <div class="col-md-4 mb-3">
                <div class="stat-card">
                    <h3 class="stat-number">${totalFeedbacks}</h3>
                    <p class="stat-label">Total Feedbacks</p>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="stat-card">
                    <h3 class="stat-number">${averageRating}</h3>
                    <p class="stat-label">Average Rating</p>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="stat-card">
                    <h3 class="stat-number">${fiveStarCount}</h3>
                    <p class="stat-label">5-Star Reviews</p>
                </div>
            </div>
        </div>
    `;
}

function initializeFeedbackForm() {
    const feedbackForm = document.getElementById('feedback-form');
    if (!feedbackForm) return;

    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('feedback-name')?.value || '';
        const email = document.getElementById('feedback-email')?.value || '';
        const company = document.getElementById('feedback-company')?.value || '';
        const rating = document.getElementById('feedback-rating')?.value || '';
        const message = document.getElementById('feedback-message')?.value || '';

        if (!name || !email || !rating || !message) {
            showFeedbackNotification('Please fill in all required fields', 'error');
            return;
        }

        const newTestimonial = {
            id: Date.now(),
            name: name,
            company: company || 'Client',
            position: 'Client',
            feedback: message,
            rating: parseInt(rating),
            image: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
            date: new Date().toISOString().split('T')[0]
        };

        testimonials.push(newTestimonial);
        displayTestimonials(getLatestTestimonials(6));
        updateStats(testimonials);
        loadCarouselTestimonials();

        showFeedbackNotification('Thank you for your feedback!', 'success');
        feedbackForm.reset();
        resetRatingStars();

        const modal = bootstrap.Modal.getInstance(document.getElementById('feedbackModal'));
        if (modal) {
            modal.hide();
        }
    });
}

function initializeRatingInput() {
    const ratingStars = document.querySelectorAll('#rating-input i');
    const ratingInput = document.getElementById('feedback-rating');

    if (!ratingStars.length || !ratingInput) return;

    ratingStars.forEach(star => {
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });

        star.addEventListener('mouseleave', function() {
            const currentRating = parseInt(ratingInput.value) || 0;
            highlightStars(currentRating);
        });

        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            ratingInput.value = rating;
            highlightStars(rating);
        });
    });
}

function highlightStars(rating) {
    const ratingStars = document.querySelectorAll('#rating-input i');
    ratingStars.forEach((star, index) => {
        if (index < rating) {
            star.className = 'bi bi-star-fill';
        } else {
            star.className = 'bi bi-star';
        }
    });
}

function resetRatingStars() {
    const ratingStars = document.querySelectorAll('#rating-input i');
    ratingStars.forEach(star => {
        star.className = 'bi bi-star';
    });
    const ratingInput = document.getElementById('feedback-rating');
    if (ratingInput) ratingInput.value = '';
}

function showFeedbackNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `feedback-notification ${type}`;
    notification.innerHTML = `
        <i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Filter testimonials by rating
function filterTestimonials(rating) {
    if (!testimonials) return;
    
    if (rating === 'all') {
        displayTestimonials(testimonials);
    } else {
        const filtered = testimonials.filter(t => t.rating === parseInt(rating));
        displayTestimonials(filtered);
    }
    updateStats(testimonials);
}

// Search testimonials
function searchTestimonials(query) {
    if (!testimonials) return;
    
    const searchTerm = query.toLowerCase();
    const filtered = testimonials.filter(t => 
        t.name.toLowerCase().includes(searchTerm) ||
        t.company.toLowerCase().includes(searchTerm) ||
        t.feedback.toLowerCase().includes(searchTerm)
    );
    displayTestimonials(filtered);
    updateStats(filtered);
}

// Load more testimonials
function loadMoreTestimonials() {
    if (typeof testimonials !== 'undefined') {
        displayTestimonials(testimonials);
        document.querySelector('.filter-buttons .filter-btn.active')?.click();
    }
}

// ===== RESUME BUILDER FUNCTIONS =====

// Tab Switching
function initializeTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            const tabContent = document.getElementById(`${tabId}-tab`);
            if (tabContent) tabContent.classList.add('active');
        });
    });
}

// Event Listeners
function initializeEventListeners() {
    // Resume builder links
    const buildResumeNav = document.getElementById('build-resume-nav');
    if (buildResumeNav) {
        buildResumeNav.addEventListener('click', (e) => {
            e.preventDefault();
            openResumeBuilder();
        });
    }
    
    const footerResumeLink = document.getElementById('footer-resume-link');
    if (footerResumeLink) {
        footerResumeLink.addEventListener('click', (e) => {
            e.preventDefault();
            openResumeBuilder();
        });
    }

    // Skills
    const addSkillBtn = document.getElementById('addSkill');
    if (addSkillBtn) addSkillBtn.addEventListener('click', addSkill);
    
    // Experience
    const addExpBtn = document.getElementById('addExperience');
    if (addExpBtn) addExpBtn.addEventListener('click', addExperience);
    
    // Education
    const addEduBtn = document.getElementById('addEducation');
    if (addEduBtn) addEduBtn.addEventListener('click', addEducation);
    
    // AI Features
    const aiSummaryBtn = document.getElementById('ai-summary');
    if (aiSummaryBtn) aiSummaryBtn.addEventListener('click', generateAISummary);
    
    const aiReviewBtn = document.getElementById('ai-review');
    if (aiReviewBtn) aiReviewBtn.addEventListener('click', aiReview);
    
    // PDF Download
    const downloadBtn = document.getElementById('downloadPdf');
    if (downloadBtn) downloadBtn.addEventListener('click', generatePDFWithTemplate);
    
    // Reset Form
    const resetBtn = document.getElementById('resetForm');
    if (resetBtn) resetBtn.addEventListener('click', resetForm);
    
    // Modal close
    const closeBtn = document.querySelector('.close-resume-builder');
    if (closeBtn) closeBtn.addEventListener('click', closeResumeBuilder);
    
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('resume-builder-modal');
        if (event.target === modal) {
            closeResumeBuilder();
        }
    });
    
    // Live preview updates
    const previewInputs = ['fullName', 'jobTitle', 'email', 'phone', 'location', 'summary'];
    previewInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updateResumePreview);
        }
    });
}

// Resume Builder Modal
function openResumeBuilder() {
    const modal = document.getElementById('resume-builder-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeResumeBuilder() {
    const modal = document.getElementById('resume-builder-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Skills Functionality
function addSkill() {
    const skillInput = document.getElementById('skillInput');
    if (!skillInput) return;
    
    const skill = skillInput.value.trim();
    
    if (skill) {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.innerHTML = `
            ${skill}
            <span class="remove-skill">&times;</span>
        `;
        
        const skillsContainer = document.getElementById('skillsContainer');
        if (skillsContainer) {
            skillsContainer.appendChild(skillTag);
        }
        
        skillInput.value = '';
        
        skillTag.querySelector('.remove-skill').addEventListener('click', () => {
            skillTag.remove();
            updateResumePreview();
        });
        
        updateResumePreview();
    }
}

// Experience Functionality
function addExperience() {
    const company = document.getElementById('company')?.value.trim() || '';
    const jobRole = document.getElementById('jobRole')?.value.trim() || '';
    const startDate = document.getElementById('startDate')?.value || '';
    const endDate = document.getElementById('endDate')?.value || '';
    const jobDescription = document.getElementById('jobDescription')?.value.trim() || '';
    
    if (company && jobRole && startDate) {
        experiences.push({
            company,
            jobRole,
            startDate,
            endDate,
            jobDescription
        });
        
        // Clear form
        const fields = ['company', 'jobRole', 'startDate', 'endDate', 'jobDescription'];
        fields.forEach(id => {
            const field = document.getElementById(id);
            if (field) field.value = '';
        });
        
        updateResumePreview();
    } else {
        alert('Please fill in at least Company, Job Title, and Start Date');
    }
}

// Education Functionality
function addEducation() {
    const institution = document.getElementById('institution')?.value.trim() || '';
    const degree = document.getElementById('degree')?.value.trim() || '';
    const gradYear = document.getElementById('gradYear')?.value || '';
    const gpa = document.getElementById('gpa')?.value.trim() || '';
    
    if (institution && degree && gradYear) {
        educations.push({
            institution,
            degree,
            gradYear,
            gpa
        });
        
        // Clear form
        const fields = ['institution', 'degree', 'gradYear', 'gpa'];
        fields.forEach(id => {
            const field = document.getElementById(id);
            if (field) field.value = '';
        });
        
        updateResumePreview();
    } else {
        alert('Please fill in at least Institution, Degree, and Graduation Year');
    }
}

// Resume Preview Update
function updateResumePreview() {
    const name = document.getElementById('fullName')?.value || 'Your Name';
    const title = document.getElementById('jobTitle')?.value || 'Your Professional Title';
    const email = document.getElementById('email')?.value || 'email@example.com';
    const phone = document.getElementById('phone')?.value || '(123) 456-7890';
    const location = document.getElementById('location')?.value || 'City, State';
    const summary = document.getElementById('summary')?.value || 'Your professional summary will appear here.';
    
    // Get skills
    const skillTags = document.querySelectorAll('.skill-tag');
    const skills = Array.from(skillTags).map(tag => tag.childNodes[0]?.textContent?.trim() || '').filter(skill => skill);
    
    // Update preview elements
    const resumeName = document.querySelector('.resume-name');
    if (resumeName) resumeName.textContent = name;
    
    const resumeTitle = document.querySelector('.resume-title');
    if (resumeTitle) resumeTitle.textContent = title;
    
    const resumeContact = document.querySelector('.resume-contact');
    if (resumeContact) {
        resumeContact.innerHTML = `
            <span>${email}</span>
            <span>${phone}</span>
            <span>${location}</span>
        `;
    }
    
    // Update summary
    const summarySection = document.querySelector('#resumePreview .resume-section:nth-child(2) p');
    if (summarySection) summarySection.textContent = summary;
    
    // Update experience
    const experienceSection = document.querySelector('#resumePreview .resume-section:nth-child(3)');
    if (experienceSection) {
        if (experiences.length > 0) {
            let experienceHTML = '';
            experiences.forEach(exp => {
                const endDate = exp.endDate ? formatDate(exp.endDate) : 'Present';
                experienceHTML += `
                    <div class="experience-item">
                        <div class="experience-title">${exp.jobRole} at ${exp.company}</div>
                        <div class="experience-dates">${formatDate(exp.startDate)} - ${endDate}</div>
                        <p>${exp.jobDescription}</p>
                    </div>
                `;
            });
            experienceSection.innerHTML = `<div class="resume-section-title">Work Experience</div>${experienceHTML}`;
        } else {
            experienceSection.innerHTML = `<div class="resume-section-title">Work Experience</div><p>Your work experience will be listed here.</p>`;
        }
    }
    
    // Update education
    const educationSection = document.querySelector('#resumePreview .resume-section:nth-child(4)');
    if (educationSection) {
        if (educations.length > 0) {
            let educationHTML = '';
            educations.forEach(edu => {
                educationHTML += `
                    <div class="education-item">
                        <div class="education-title">${edu.degree}</div>
                        <div class="education-dates">${edu.institution}, ${formatDate(edu.gradYear)}${edu.gpa ? `, GPA: ${edu.gpa}` : ''}</div>
                    </div>
                `;
            });
            educationSection.innerHTML = `<div class="resume-section-title">Education</div>${educationHTML}`;
        } else {
            educationSection.innerHTML = `<div class="resume-section-title">Education</div><p>Your education history will be listed here.</p>`;
        }
    }
    
    // Update skills
    const skillsSection = document.querySelector('#resumePreview .resume-section:nth-child(5)');
    if (skillsSection) {
        if (skills.length > 0) {
            skillsSection.innerHTML = `<div class="resume-section-title">Skills</div><p>${skills.join(', ')}</p>`;
        } else {
            skillsSection.innerHTML = `<div class="resume-section-title">Skills</div><p>Your skills will be listed here.</p>`;
        }
    }
}

// AI Functions
function generateAISummary() {
    const name = document.getElementById('fullName')?.value || 'the candidate';
    const jobTitle = document.getElementById('jobTitle')?.value || 'professional';
    const skills = Array.from(document.querySelectorAll('.skill-tag'))
        .map(tag => tag.childNodes[0]?.textContent?.trim() || '')
        .filter(skill => skill);
    
    let summary = `Results-driven ${jobTitle} with a proven track record of success. `;
    
    if (skills.length > 0) {
        summary += `Proficient in ${skills.slice(0, 3).join(', ')}. `;
    }
    
    if (experiences.length > 0) {
        summary += `With ${experiences.length} ${experiences.length === 1 ? 'year' : 'years'} of relevant experience, `;
        summary += `${name} has demonstrated expertise in ${experiences[0].jobRole || 'their field'}. `;
    }
    
    summary += `Seeking to leverage skills and experience to contribute to team success through hard work, attention to detail, and excellent organizational skills.`;
    
    const summaryField = document.getElementById('summary');
    if (summaryField) {
        summaryField.value = summary;
        updateResumePreview();
    }
}

function aiReview() {
    const name = document.getElementById('fullName')?.value;
    const summary = document.getElementById('summary')?.value;
    const skillsCount = document.querySelectorAll('.skill-tag').length;
    
    let review = "AI Resume Review:\n\n";
    
    if (!name) {
        review += "❌ Please add your full name for a more professional resume.\n";
    } else {
        review += "✅ Name is included - good start!\n";
    }
    
    if (!summary || summary.length < 50) {
        review += "❌ Your professional summary is too brief. Consider expanding it to at least 50-100 words.\n";
    } else {
        review += "✅ Professional summary has good length.\n";
    }
    
    if (skillsCount < 3) {
        review += "❌ Consider adding more skills (aim for at least 5-7 relevant skills).\n";
    } else if (skillsCount < 5) {
        review += "⚠️ You have some skills listed, but consider adding a few more.\n";
    } else {
        review += "✅ Good variety of skills listed.\n";
    }
    
    if (experiences.length === 0) {
        review += "❌ No work experience added. Even internships or volunteer work can be valuable.\n";
    } else {
        review += "✅ Work experience included - great!\n";
    }
    
    if (educations.length === 0) {
        review += "❌ No education history added. Include your highest degree.\n";
    } else {
        review += "✅ Education history included.\n";
    }
    
    review += "\nOverall, your resume is taking shape. Continue adding details to make it more comprehensive.";
    
    alert(review);
}

// Template Selector
function initializeTemplateSelector() {
    const templateBtn = document.getElementById('template-selector');
    if (templateBtn) {
        templateBtn.addEventListener('click', openTemplateModal);
    }
    
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', function() {
            const template = this.getAttribute('data-template');
            applyTemplate(template);
        });
    });
    
    const templateModal = document.getElementById('template-modal');
    if (templateModal) {
        templateModal.addEventListener('click', function(event) {
            if (event.target === this) {
                closeTemplateModal();
            }
        });
    }
}

function openTemplateModal() {
    const modal = document.getElementById('template-modal');
    if (modal) modal.style.display = 'block';
}

function closeTemplateModal() {
    const modal = document.getElementById('template-modal');
    if (modal) modal.style.display = 'none';
}

function applyTemplate(template) {
    currentTemplate = template;
    
    const preview = document.getElementById('resumePreview');
    if (!preview) return;
    
    const templates = ['modern', 'executive', 'minimalist'];
    templates.forEach(t => {
        preview.classList.remove(`template-${t}`);
    });
    
    preview.classList.add(`template-${template}`);
    updateTemplateStyles(template);
    closeTemplateModal();
    showTemplateConfirmation(template);
}

function updateTemplateStyles(template) {
    const preview = document.getElementById('resumePreview');
    if (!preview) return;
    
    switch(template) {
        case 'modern':
            preview.style.fontFamily = "'Arial', 'Helvetica', sans-serif";
            preview.style.fontSize = '14px';
            break;
        case 'executive':
            preview.style.fontFamily = "'Times New Roman', 'Georgia', serif";
            preview.style.fontSize = '13px';
            break;
        case 'minimalist':
            preview.style.fontFamily = "'Helvetica', 'Arial', sans-serif";
            preview.style.fontSize = '12px';
            break;
        default:
            preview.style.fontFamily = "'Times New Roman', serif";
            preview.style.fontSize = '14px';
    }
}

function showTemplateConfirmation(template) {
    const templateNames = {
        'modern': 'Modern Professional',
        'executive': 'Executive Classic', 
        'minimalist': 'Minimalist'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b35;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    notification.textContent = `Template Applied: ${templateNames[template]}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// PDF Generation
function generatePDFWithTemplate() {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) {
        alert('PDF library not loaded');
        return;
    }
    
    const doc = new jsPDF();
    
    const name = document.getElementById('fullName')?.value || 'Your Name';
    const title = document.getElementById('jobTitle')?.value || 'Professional Title';
    const email = document.getElementById('email')?.value || 'email@example.com';
    const phone = document.getElementById('phone')?.value || '(123) 456-7890';
    const location = document.getElementById('location')?.value || 'City, State';
    const summary = document.getElementById('summary')?.value || 'Professional summary will appear here.';
    
    applyTemplateToPDF(doc, currentTemplate);
    let yPosition = applyTemplateHeader(doc, currentTemplate, name, title, email, phone, location);
    
    // Add summary
    doc.setFontSize(12);
    doc.text('Professional Summary', 20, yPosition);
    doc.setFontSize(10);
    const splitSummary = doc.splitTextToSize(summary, 170);
    doc.text(splitSummary, 20, yPosition + 7);
    
    // Add experiences
    let currentY = yPosition + 20 + (splitSummary.length * 4);
    
    if (experiences.length > 0) {
        doc.setFontSize(12);
        doc.text('Work Experience', 20, currentY);
        currentY += 10;
        
        doc.setFontSize(10);
        experiences.forEach(exp => {
            const endDate = exp.endDate ? formatDate(exp.endDate) : 'Present';
            
            switch(currentTemplate) {
                case 'modern':
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(44, 62, 80);
                    break;
                case 'executive':
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(52, 73, 94);
                    break;
                case 'minimalist':
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(39, 174, 96);
                    break;
            }
            
            doc.text(`${exp.jobRole} at ${exp.company}`, 20, currentY);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(100, 100, 100);
            doc.text(`${formatDate(exp.startDate)} - ${endDate}`, 20, currentY + 5);
            doc.setTextColor(0, 0, 0);
            
            const splitDesc = doc.splitTextToSize(exp.jobDescription, 170);
            doc.text(splitDesc, 20, currentY + 12);
            
            currentY += 20 + (splitDesc.length * 4);
            if (currentY > 250) {
                doc.addPage();
                currentY = 20;
                applyTemplateToPDF(doc, currentTemplate);
            }
        });
    }
    
    // Add education
    if (educations.length > 0) {
        currentY += 10;
        doc.setFontSize(12);
        doc.text('Education', 20, currentY);
        currentY += 10;
        
        doc.setFontSize(10);
        educations.forEach(edu => {
            switch(currentTemplate) {
                case 'modern':
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(44, 62, 80);
                    break;
                case 'executive':
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(52, 73, 94);
                    break;
                case 'minimalist':
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(39, 174, 96);
                    break;
            }
            
            doc.text(edu.degree, 20, currentY);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(100, 100, 100);
            doc.text(`${edu.institution}, ${formatDate(edu.gradYear)}${edu.gpa ? `, GPA: ${edu.gpa}` : ''}`, 20, currentY + 5);
            doc.setTextColor(0, 0, 0);
            currentY += 12;
        });
    }
    
    // Add skills
    const skillTags = document.querySelectorAll('.skill-tag');
    const skills = Array.from(skillTags).map(tag => tag.childNodes[0]?.textContent?.trim() || '').filter(skill => skill);
    
    if (skills.length > 0) {
        currentY += 10;
        doc.setFontSize(12);
        doc.text('Skills', 20, currentY);
        currentY += 7;
        
        doc.setFontSize(10);
        
        switch(currentTemplate) {
            case 'modern':
                doc.setTextColor(44, 62, 80);
                break;
            case 'executive':
                doc.setTextColor(52, 73, 94);
                break;
            case 'minimalist':
                doc.setTextColor(39, 174, 96);
                break;
        }
        
        const skillsText = skills.join(', ');
        const splitSkills = doc.splitTextToSize(skillsText, 170);
        doc.text(splitSkills, 20, currentY);
    }
    
    doc.save('resume.pdf');
}

function applyTemplateToPDF(doc, template) {
    switch(template) {
        case 'modern':
            doc.setFont('helvetica');
            break;
        case 'executive':
            doc.setFont('times');
            break;
        case 'minimalist':
            doc.setFont('helvetica');
            break;
        default:
            doc.setFont('helvetica');
    }
}

function applyTemplateHeader(doc, template, name, title, email, phone, location) {
    let yPosition = 0;
    
    switch(template) {
        case 'modern':
            doc.setFillColor(44, 62, 80);
            doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(20);
            doc.text(name, 20, 20);
            doc.setFontSize(12);
            doc.text(title, 20, 30);
            doc.setFontSize(9);
            doc.setTextColor(200, 200, 200);
            doc.text(`${email} | ${phone} | ${location}`, 20, 38);
            doc.setTextColor(0, 0, 0);
            yPosition = 55;
            break;
            
        case 'executive':
            doc.setFillColor(52, 73, 94);
            doc.rect(0, 0, 210, 35, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(18);
            doc.text(name, 20, 20);
            doc.setFontSize(10);
            doc.text(title, 20, 28);
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(9);
            doc.text(`${email} | ${phone} | ${location}`, 20, 45);
            yPosition = 60;
            break;
            
        case 'minimalist':
            doc.setTextColor(39, 174, 96);
            doc.setFontSize(22);
            doc.text(name, 105, 20, { align: 'center' });
            doc.setTextColor(100, 100, 100);
            doc.setFontSize(12);
            doc.text(title, 105, 28, { align: 'center' });
            doc.setFontSize(9);
            doc.text(`${email} | ${phone} | ${location}`, 105, 35, { align: 'center' });
            doc.setDrawColor(39, 174, 96);
            doc.line(50, 38, 160, 38);
            doc.setTextColor(0, 0, 0);
            yPosition = 50;
            break;
            
        default:
            doc.setFontSize(20);
            doc.text(name, 20, 20);
            doc.setFontSize(14);
            doc.text(title, 20, 30);
            doc.setFontSize(10);
            doc.text(`${email} | ${phone} | ${location}`, 20, 40);
            yPosition = 55;
    }
    
    return yPosition;
}

// Reset Form
function resetForm() {
    if (confirm('Are you sure you want to reset all form data?')) {
        document.querySelectorAll('input, textarea').forEach(field => {
            if (field) field.value = '';
        });
        
        const skillsContainer = document.getElementById('skillsContainer');
        if (skillsContainer) skillsContainer.innerHTML = '';
        
        experiences = [];
        educations = [];
        updateResumePreview();
    }
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopButton = document.getElementById("btn-back-to-top");
    if (!backToTopButton) return;
    
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };
    
    backToTopButton.addEventListener("click", function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}

// Smooth Scrolling
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Make functions globally available
window.filterTestimonials = filterTestimonials;
window.loadMoreTestimonials = loadMoreTestimonials;
window.closeTemplateModal = closeTemplateModal;
window.openResumeBuilder = openResumeBuilder;
window.closeResumeBuilder = closeResumeBuilder;
