
document.addEventListener('DOMContentLoaded', function() {
    const tocList = document.getElementById("toc-list");
    const sectionTitles = document.querySelectorAll(".section-title");

   
    tocList.innerHTML = '';

    sectionTitles.forEach((title, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="#${title.id}">${index + 1}. ${title.textContent}</a>`;
        tocList.appendChild(listItem);

        
        title.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSection(this);
        });
    });

    tocList.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                toggleSection(targetElement);
                targetElement.scrollIntoView({behavior: 'smooth'});
            }
        });
    });

 
    const subSectionTitles = document.querySelectorAll(".sub-section-title");
    subSectionTitles.forEach((title) => {
        title.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // stop  the click from bubbling up 
            toggleSubSection(this);
        });
    });

    function toggleSection(sectionTitle) {
        const contentId = sectionTitle.id + "-content";
        const contentElement = document.getElementById(contentId);
        
        if (contentElement) {
            contentElement.classList.toggle('show');
            
            
            sectionTitles.forEach((otherTitle) => {
                if (otherTitle !== sectionTitle) {
                    const otherContentId = otherTitle.id + "-content";
                    const otherContentElement = document.getElementById(otherContentId);
                    if (otherContentElement) {
                        otherContentElement.classList.remove('show');
                    }
                }
            });
        }
    }

    function toggleSubSection(subSectionTitle) {
        const contentId = subSectionTitle.getAttribute('data-target').substring(1);
        const contentElement = document.getElementById(contentId);
        
        if (contentElement) {
            contentElement.classList.toggle('show');
        }
    }
});
