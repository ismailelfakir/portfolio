// Portfolio Data Manager
class PortfolioData {
    constructor() {
        this.data = null;
        this.loadData();
    }

    async loadData() {
        try {
            const response = await fetch('./js/portfolio-config.json');
            this.data = await response.json();
            this.initializePortfolio();
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            // Fallback to default data if JSON fails to load
            this.initializePortfolio();
        }
    }

    initializePortfolio() {
        if (!this.data) return;

        this.updatePersonalInfo();
        this.updateSkills();
        this.updateEducation();
        this.updateExperience();
        this.updateProjects();
        this.updateServices();
        this.updateContact();
    }

    updatePersonalInfo() {
        const { personal } = this.data;
        
        // Update header
        document.querySelector('.name').textContent = personal.name;
        document.querySelector('.typing').textContent = personal.title;
        document.querySelector('.home-info p').textContent = personal.bio[0];
        
        // Update CV link
        const cvLink = document.querySelector('a[download]');
        if (cvLink) {
            cvLink.href = personal.cv;
        }

        // Update profile images
        const profileImages = document.querySelectorAll('img[alt="me"]');
        profileImages.forEach(img => {
            img.src = personal.profileImage;
        });

        // Update about section
        const aboutText = document.querySelector('.about-text p');
        if (aboutText) {
            aboutText.textContent = personal.bio.join(' ');
        }

        // Update personal info
        this.updatePersonalInfoItems(personal);

        // Update social links
        this.updateSocialLinks(personal.socialLinks);
    }

    updatePersonalInfoItems(personal) {
        const infoItems = document.querySelectorAll('.info-item p');
        const infoData = [
            { label: 'Age', value: '22 years' },
            { label: 'City', value: personal.location },
            { label: 'Email', value: personal.email },
            { label: 'Phone', value: personal.phone },
            { label: 'Freelance', value: 'Available' }
        ];

        infoItems.forEach((item, index) => {
            if (infoData[index]) {
                item.innerHTML = `${infoData[index].label} : <span>${infoData[index].value}</span>`;
            }
        });
    }

    updateSocialLinks(socialLinks) {
        const socialContainer = document.querySelector('.follow-me .links');
        if (!socialContainer) return;

        const socialIcons = {
            instagram: 'fa-brands fa-instagram',
            facebook: 'fa-brands fa-facebook-f',
            twitter: 'fa-brands fa-twitter',
            linkedin: 'fa-brands fa-linkedin',
            github: 'fa-brands fa-github'
        };

        socialContainer.innerHTML = '';
        Object.entries(socialLinks).forEach(([platform, url]) => {
            if (socialIcons[platform]) {
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.innerHTML = `<i class="${socialIcons[platform]}"></i>`;
                socialContainer.appendChild(link);
            }
        });
    }

    updateSkills() {
        const { skills } = this.data;
        const skillsContainer = document.querySelector('.skills .row');
        if (!skillsContainer) return;

        skillsContainer.innerHTML = '';

        // Combine all skills
        const allSkills = [
            ...skills.frontend,
            ...skills.backend,
            ...skills.database,
            ...skills.other
        ];

        allSkills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item padd-15';
            
            const certificateLink = skill.certificate ? 
                `<a href="${skill.certificate}" class="show-certificate" target="_blank">Certificate <i class="fa fa-right-to-bracket"></i></a>` :
                `<a href="#" class="show-certificate">Certificate <i class="fa fa-right-to-bracket"></i></a>`;

            skillItem.innerHTML = `
                <h5>${skill.name}</h5>
                <div class="progress">
                    <div class="progress-in" style="width: ${skill.level}%;"></div>
                    <div class="skill-percent">${skill.level}%</div>
                    ${certificateLink}
                </div>
            `;
            
            skillsContainer.appendChild(skillItem);
        });
    }

    updateEducation() {
        const { education } = this.data;
        const educationContainer = document.querySelector('.education .timeline');
        if (!educationContainer) return;

        educationContainer.innerHTML = '';

        education.forEach(edu => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            
            timelineItem.innerHTML = `
                <div class="circle-dot"></div>
                <h3 class="timeline-date">
                    <i class="fa fa-calendar"></i>${edu.period}
                </h3>
                <h4 class="timeline-title">${edu.degree}</h4>
                <p class="timeline-text">${edu.institution}</p>
            `;
            
            educationContainer.appendChild(timelineItem);
        });
    }

    updateExperience() {
        const { experience } = this.data;
        const experienceContainer = document.querySelector('.experience .timeline');
        if (!experienceContainer) return;

        experienceContainer.innerHTML = '';

        experience.forEach(exp => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            
            timelineItem.innerHTML = `
                <div class="circle-dot"></div>
                <h3 class="timeline-date">
                    <i class="fa fa-calendar"></i>${exp.period}
                </h3>
                <h4 class="timeline-title">${exp.title}</h4>
                <p class="timeline-text">${exp.company}<br>${exp.description}</p>
            `;
            
            experienceContainer.appendChild(timelineItem);
        });
    }

    updateProjects() {
        const { projects } = this.data;
        const portfolioContainer = document.querySelector('.portfolio .row:last-child');
        if (!portfolioContainer) return;

        // Clear existing projects but keep the heading
        const existingItems = portfolioContainer.querySelectorAll('.portfolio-item');
        existingItems.forEach(item => item.remove());

        projects.forEach(project => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item padd-15';
            
            const demoLink = project.links.demo || '#';
            const githubLink = project.links.github || '#';
            
            portfolioItem.innerHTML = `
                <div class="portfolio-item-inner shadow-dark">
                    <div class="portfolio-img">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="links">
                        <a href="${demoLink}" target="_blank"><i class="fa fa-eye"></i></a>
                        <a href="${githubLink}" target="_blank"><i class="fa-brands fa-github"></i></a>
                    </div>
                </div>
            `;
            
            portfolioContainer.appendChild(portfolioItem);
        });
    }

    updateServices() {
        const { services } = this.data;
        const servicesContainer = document.querySelector('.service .row:last-child');
        if (!servicesContainer) return;

        servicesContainer.innerHTML = '';

        services.forEach(service => {
            const serviceItem = document.createElement('div');
            serviceItem.className = 'service-item padd-15';
            
            serviceItem.innerHTML = `
                <div class="service-item-inner">
                    <div class="icon">
                        <i class="fa ${service.icon}"></i>
                    </div>
                    <h4>${service.title}</h4>
                    <p>${service.description}</p>
                </div>
            `;
            
            servicesContainer.appendChild(serviceItem);
        });
    }

    updateContact() {
        const { contact } = this.data;
        const contactContainer = document.querySelector('.contact .row:nth-child(3)');
        if (!contactContainer) return;

        contactContainer.innerHTML = '';

        contact.contactInfo.forEach(info => {
            const contactItem = document.createElement('div');
            contactItem.className = 'contact-info-item padd-15';
            
            contactItem.innerHTML = `
                <div class="icon"><i class="fa ${info.icon}"></i></div>
                <h4>${info.title}</h4>
                <p>${info.value}</p>
            `;
            
            contactContainer.appendChild(contactItem);
        });
    }
}

// Initialize portfolio data when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioData();
});