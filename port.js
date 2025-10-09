
      // Tab switching functionality
      document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
          // Remove active class from all tabs and tab contents
          document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
          
          // Add active class to clicked tab
          tab.classList.add('active');
          
          // Show corresponding tab content
          const tabId = tab.getAttribute('data-tab');
          document.getElementById(`${tabId}-tab`).classList.add('active');
        });
      });
      
      // Skills functionality
      document.getElementById('addSkill').addEventListener('click', () => {
        const skillInput = document.getElementById('skillInput');
        const skill = skillInput.value.trim();
        
        if (skill) {
          const skillTag = document.createElement('div');
          skillTag.className = 'skill-tag';
          skillTag.innerHTML = `
            ${skill}
            <span class="remove-skill">&times;</span>
          `;
          
          document.getElementById('skillsContainer').appendChild(skillTag);
          skillInput.value = '';
          
          // Add remove functionality
          skillTag.querySelector('.remove-skill').addEventListener('click', () => {
            skillTag.remove();
            updateResumePreview();
          });
          
          updateResumePreview();
        }
      });
      
      // Experience functionality
      let experiences = [];
      document.getElementById('addExperience').addEventListener('click', () => {
        const company = document.getElementById('company').value.trim();
        const jobRole = document.getElementById('jobRole').value.trim();
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const jobDescription = document.getElementById('jobDescription').value.trim();
        
        if (company && jobRole && startDate) {
          experiences.push({
            company,
            jobRole,
            startDate,
            endDate,
            jobDescription
          });
          
          // Clear form
          document.getElementById('company').value = '';
          document.getElementById('jobRole').value = '';
          document.getElementById('startDate').value = '';
          document.getElementById('endDate').value = '';
          document.getElementById('jobDescription').value = '';
          
          updateResumePreview();
        } else {
          alert('Please fill in at least Company, Job Title, and Start Date');
        }
      });
      
      // Education functionality
      let educations = [];
      document.getElementById('addEducation').addEventListener('click', () => {
        const institution = document.getElementById('institution').value.trim();
        const degree = document.getElementById('degree').value.trim();
        const gradYear = document.getElementById('gradYear').value;
        const gpa = document.getElementById('gpa').value.trim();
        
        if (institution && degree && gradYear) {
          educations.push({
            institution,
            degree,
            gradYear,
            gpa
          });
          
          // Clear form
          document.getElementById('institution').value = '';
          document.getElementById('degree').value = '';
          document.getElementById('gradYear').value = '';
          document.getElementById('gpa').value = '';
          
          updateResumePreview();
        } else {
          alert('Please fill in at least Institution, Degree, and Graduation Year');
        }
      });
      
      // Resume preview update functionality
      function updateResumePreview() {
        const name = document.getElementById('fullName').value || 'Your Name';
        const title = document.getElementById('jobTitle').value || 'Your Professional Title';
        const email = document.getElementById('email').value || 'email@example.com';
        const phone = document.getElementById('phone').value || '(123) 456-7890';
        const location = document.getElementById('location').value || 'City, State';
        const summary = document.getElementById('summary').value || 'Your professional summary will appear here. Write a brief overview of your experience, skills, and career goals.';
        
        // Get skills
        const skillTags = document.querySelectorAll('.skill-tag');
        const skills = Array.from(skillTags).map(tag => tag.childNodes[0].textContent.trim()).filter(skill => skill);
        
        document.querySelector('.resume-name').textContent = name;
        document.querySelector('.resume-title').textContent = title;
        document.querySelector('.resume-contact').innerHTML = `
          <span>${email}</span>
          <span>${phone}</span>
          <span>${location}</span>
        `;
        
        // Update summary
        document.querySelector('#resumePreview .resume-section:nth-child(2) p').textContent = summary;
        
        // Update experience
        const experienceSection = document.querySelector('#resumePreview .resume-section:nth-child(3)');
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
        
        // Update education
        const educationSection = document.querySelector('#resumePreview .resume-section:nth-child(4)');
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
        
        // Update skills
        const skillsSection = document.querySelector('#resumePreview .resume-section:nth-child(5)');
        if (skills.length > 0) {
          skillsSection.innerHTML = `<div class="resume-section-title">Skills</div><p>${skills.join(', ')}</p>`;
        } else {
          skillsSection.innerHTML = `<div class="resume-section-title">Skills</div><p>Your skills will be listed here.</p>`;
        }
      }
      
      // Helper function to format dates
      function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      }
      
      // Add event listeners to update preview on input
      document.getElementById('fullName').addEventListener('input', updateResumePreview);
      document.getElementById('jobTitle').addEventListener('input', updateResumePreview);
      document.getElementById('email').addEventListener('input', updateResumePreview);
      document.getElementById('phone').addEventListener('input', updateResumePreview);
      document.getElementById('location').addEventListener('input', updateResumePreview);
      document.getElementById('summary').addEventListener('input', updateResumePreview);
      
      // Modal functionality
      const resumeModal = document.getElementById('resume-builder-modal');
      const buildResumeBtn = document.getElementById('build-resume-btn');
      const closeModalBtn = document.querySelector('.close-resume-builder');
      
      buildResumeBtn.addEventListener('click', () => {
        resumeModal.style.display = 'block';
      });
      
      closeModalBtn.addEventListener('click', () => {
        resumeModal.style.display = 'none';
      });
      
      // Close modal when clicking outside content
      window.addEventListener('click', (event) => {
        if (event.target === resumeModal) {
          resumeModal.style.display = 'none';
        }
      });
      
      // AI functionality - Improved with actual content generation
      document.getElementById('ai-summary').addEventListener('click', () => {
        const name = document.getElementById('fullName').value || 'the candidate';
        const jobTitle = document.getElementById('jobTitle').value || 'professional';
        const skills = Array.from(document.querySelectorAll('.skill-tag'))
          .map(tag => tag.childNodes[0].textContent.trim())
          .filter(skill => skill);
        
        // Generate a professional summary based on available information
        let summary = `Results-driven ${jobTitle} with a proven track record of success. `;
        
        if (skills.length > 0) {
          summary += `Proficient in ${skills.slice(0, 3).join(', ')}. `;
        }
        
        if (experiences.length > 0) {
          summary += `With ${experiences.length} ${experiences.length === 1 ? 'year' : 'years'} of relevant experience, `;
          summary += `${name} has demonstrated expertise in ${experiences[0].jobRole || 'their field'}. `;
        }
        
        summary += `Seeking to leverage skills and experience to contribute to team success through hard work, attention to detail, and excellent organizational skills.`;
        
        document.getElementById('summary').value = summary;
        updateResumePreview();
      });
      
      // AI Review functionality
      document.getElementById('ai-review').addEventListener('click', () => {
        const name = document.getElementById('fullName').value;
        const summary = document.getElementById('summary').value;
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
          review += "⚠️  You have some skills listed, but consider adding a few more.\n";
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
      });
      
      // PDF Download functionality - Now actually works!
      document.getElementById('downloadPdf').addEventListener('click', () => {
        // Use jsPDF to generate PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Get resume content
        const name = document.getElementById('fullName').value || 'Your Name';
        const title = document.getElementById('jobTitle').value || 'Professional Title';
        const email = document.getElementById('email').value || 'email@example.com';
        const phone = document.getElementById('phone').value || '(123) 456-7890';
        const location = document.getElementById('location').value || 'City, State';
        const summary = document.getElementById('summary').value || 'Professional summary will appear here.';
        
        // Set up PDF
        doc.setFontSize(20);
        doc.text(name, 20, 20);
        doc.setFontSize(14);
        doc.text(title, 20, 30);
        doc.setFontSize(10);
        doc.text(`${email} | ${phone} | ${location}`, 20, 40);
        
        // Add summary
        doc.setFontSize(12);
        doc.text('Professional Summary', 20, 55);
        doc.setFontSize(10);
        const splitSummary = doc.splitTextToSize(summary, 170);
        doc.text(splitSummary, 20, 65);
        
        // Add experiences
        let yPosition = 85;
        if (experiences.length > 0) {
          doc.setFontSize(12);
          doc.text('Work Experience', 20, yPosition);
          yPosition += 10;
          
          doc.setFontSize(10);
          experiences.forEach(exp => {
            const endDate = exp.endDate ? formatDate(exp.endDate) : 'Present';
            doc.text(`${exp.jobRole} at ${exp.company}`, 20, yPosition);
            doc.text(`${formatDate(exp.startDate)} - ${endDate}`, 20, yPosition + 5);
            
            const splitDesc = doc.splitTextToSize(exp.jobDescription, 170);
            doc.text(splitDesc, 20, yPosition + 15);
            
            yPosition += 30 + (splitDesc.length * 5);
            if (yPosition > 250) {
              doc.addPage();
              yPosition = 20;
            }
          });
        }
        
        // Add education
        if (educations.length > 0) {
          yPosition += 10;
          doc.setFontSize(12);
          doc.text('Education', 20, yPosition);
          yPosition += 10;
          
          doc.setFontSize(10);
          educations.forEach(edu => {
            doc.text(`${edu.degree}`, 20, yPosition);
            doc.text(`${edu.institution}, ${formatDate(edu.gradYear)}${edu.gpa ? `, GPA: ${edu.gpa}` : ''}`, 20, yPosition + 5);
            yPosition += 15;
          });
        }
        
        // Add skills
        const skillTags = document.querySelectorAll('.skill-tag');
        const skills = Array.from(skillTags).map(tag => tag.childNodes[0].textContent.trim()).filter(skill => skill);
        
        if (skills.length > 0) {
          yPosition += 10;
          doc.setFontSize(12);
          doc.text('Skills', 20, yPosition);
          yPosition += 10;
          
          doc.setFontSize(10);
          doc.text(skills.join(', '), 20, yPosition);
        }
        
        // Save the PDF
        doc.save('resume.pdf');
      });
      
      // Reset form functionality
      document.getElementById('resetForm').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all form data?')) {
          document.querySelectorAll('input, textarea').forEach(field => {
            field.value = '';
          });
          document.getElementById('skillsContainer').innerHTML = '';
          experiences = [];
          educations = [];
          updateResumePreview();
        }
      });
      
      // Back to top button functionality
      const backToTopButton = document.getElementById("btn-back-to-top");
      
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
      
      // Contact form submission
      document.getElementById('submitContact').addEventListener('click', function() {
        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const phone = document.getElementById('phoneInput').value;
        const message = document.getElementById('messageInput').value;
        
        if (name && email && message) {
          alert('Thank you for your message! We will get back to you soon.');
          document.getElementById('nameInput').value = '';
          document.getElementById('emailInput').value = '';
          document.getElementById('phoneInput').value = '';
          document.getElementById('messageInput').value = '';
        } else {
          alert('Please fill in all required fields (Name, Email, and Message).');
        }
      });
      
      // Initialize circular progress animations
      function animateProgress() {
        const progressElements = document.querySelectorAll('.circular-progress');
        const targetValues = [50, 30, 20, 70]; // HTML, JS, CSS, Bootstrap percentages
        
        progressElements.forEach((element, index) => {
          let currentValue = 0;
          
          const interval = setInterval(() => {
            if (currentValue >= targetValues[index]) {
              clearInterval(interval);
            } else {
              currentValue++;
              element.style.background = `conic-gradient(var(--accent-color) ${currentValue * 3.6}deg, #e0e0e0 0deg)`;
              element.querySelector('.progress-value').textContent = `${currentValue}%`;
            }
          }, 20);
        });
      }
      
      // Start animation when skills section is in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateProgress();
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(document.querySelector('.skill-with-progress'));
      
      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        });
      });
// ===== TEMPLATE SELECTOR FUNCTIONALITY =====
let currentTemplate = 'modern';

// Initialize template functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTemplateSelector();
});

function initializeTemplateSelector() {
    // Add template selector button event listener
    const templateBtn = document.getElementById('template-selector');
    if (templateBtn) {
        templateBtn.addEventListener('click', openTemplateModal);
    }
    
    // Add event listeners to template cards
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', function() {
            const template = this.getAttribute('data-template');
            applyTemplate(template);
        });
    });
    
    // Close modal when clicking outside
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
    document.getElementById('template-modal').style.display = 'block';
}

function closeTemplateModal() {
    document.getElementById('template-modal').style.display = 'none';
}

function applyTemplate(template) {
    currentTemplate = template;
    
    // Remove existing template classes
    const preview = document.getElementById('resumePreview');
    const templates = ['modern', 'executive', 'minimalist'];
    templates.forEach(t => {
        preview.classList.remove(`template-${t}`);
    });
    
    // Apply new template class
    preview.classList.add(`template-${template}`);
    
    // Update template-specific styling
    updateTemplateStyles(template);
    
    // Close modal after selection
    closeTemplateModal();
    
    // Show confirmation
    showTemplateConfirmation(template);
}

function updateTemplateStyles(template) {
    const preview = document.getElementById('resumePreview');
    
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
    
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    notification.textContent = `Template Applied: ${templateNames[template]}`;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Enhanced PDF generation with template support
const originalDownloadPdf = document.getElementById('downloadPdf').onclick;
document.getElementById('downloadPdf').addEventListener('click', function(e) {
    generatePDFWithTemplate();
});
// Enhanced PDF generation with template support - REPLACE THE EXISTING downloadPdf EVENT LISTENER
document.getElementById('downloadPdf').addEventListener('click', function() {
    generatePDFWithTemplate();
});

function generatePDFWithTemplate() {
    // Use jsPDF to generate PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Get resume content (using your original variables)
    const name = document.getElementById('fullName').value || 'Your Name';
    const title = document.getElementById('jobTitle').value || 'Professional Title';
    const email = document.getElementById('email').value || 'email@example.com';
    const phone = document.getElementById('phone').value || '(123) 456-7890';
    const location = document.getElementById('location').value || 'City, State';
    const summary = document.getElementById('summary').value || 'Professional summary will appear here.';
    
    // Apply template-specific styling to PDF
    applyTemplateToPDF(doc, currentTemplate);
    
    // Set up PDF based on template
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
            
            // Template-specific experience styling
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
                applyTemplateToPDF(doc, currentTemplate); // Re-apply template on new page
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
            // Template-specific education styling
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
    const skills = Array.from(skillTags).map(tag => tag.childNodes[0].textContent.trim()).filter(skill => skill);
    
    if (skills.length > 0) {
        currentY += 10;
        doc.setFontSize(12);
        doc.text('Skills', 20, currentY);
        currentY += 7;
        
        doc.setFontSize(10);
        
        // Template-specific skills styling
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
    
    // Save the PDF
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
            // Modern template - colored header
            doc.setFillColor(44, 62, 80); // Dark blue
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
            // Executive template - formal header
            doc.setFillColor(52, 73, 94); // Dark blue-gray
            doc.rect(0, 0, 210, 35, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(18);
            doc.text(name, 20, 20);
            doc.setFontSize(10);
            doc.text(title, 20, 28);
            
            // Contact info below header
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(9);
            doc.text(`${email} | ${phone} | ${location}`, 20, 45);
            yPosition = 60;
            break;
            
        case 'minimalist':
            // Minimalist template - clean centered header
            doc.setTextColor(39, 174, 96); // Green accent
            doc.setFontSize(22);
            doc.text(name, 105, 20, { align: 'center' });
            doc.setTextColor(100, 100, 100);
            doc.setFontSize(12);
            doc.text(title, 105, 28, { align: 'center' });
            
            // Contact info
            doc.setFontSize(9);
            doc.text(`${email} | ${phone} | ${location}`, 105, 35, { align: 'center' });
            
            // Accent line
            doc.setDrawColor(39, 174, 96);
            doc.line(50, 38, 160, 38);
            
            doc.setTextColor(0, 0, 0);
            yPosition = 50;
            break;
            
        default:
            // Default template (your original styling)
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

// Make sure the original formatDate function is available
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

function applyPDFTemplateStyles(doc, template) {
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

// Make sure the template modal close button works
document.querySelector('#template-modal .close-resume-builder').addEventListener('click', closeTemplateModal);