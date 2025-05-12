document.addEventListener('DOMContentLoaded', function() {
    const taskDomainSelect = document.getElementById('taskDomainSelect');
    const taskInternshipSelect = document.getElementById('taskInternshipSelect');
    const addDomainForm = document.getElementById('addDomainForm');
    const domainNameInput = document.getElementById('domainNameInput');
    const domainDescriptionInput = document.getElementById('domainDescriptionInput');
    const domainsListContainer = document.getElementById('domainsList');
    const internshipDomainSelect = document.getElementById('internshipDomainSelect');
    if (taskDomainSelect && taskInternshipSelect) {
        taskDomainSelect.addEventListener('change', function() {
            const selectedDomain = this.value;
            taskInternshipSelect.innerHTML = '<option value="" disabled selected>Select Internship</option>';
            if (selectedDomain) {
                fetch(/manager/internships?domainName=${encodeURIComponent(selectedDomain)})
                    .then(response => response.json())
                    .then(data => {
                        taskInternshipSelect.innerHTML = '<option value="" disabled selected>Select Internship</option>';
                        data.forEach(internship => {
                            const option = document.createElement('option');
                            option.value = internship.name;
                            option.textContent = internship.name;
                            taskInternshipSelect.appendChild(option);
                        });
                    })
                    .catch(error => {
                        console.error('Error loading internships:', error);
                        taskInternshipSelect.innerHTML = '<option value="" disabled selected>Error loading</option>';
                    });
            }
        });
    }
    if (addDomainForm) {
        addDomainForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = domainNameInput.value.trim();
            const description = domainDescriptionInput.value.trim();
            if (!name) {
                alert('Please enter a domain name');
                return;
            }
            if (!description) {
                alert('Please enter a domain description');
                return;
            }
            try {
                const response = await fetch('/manager/add-domain', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        name: name,
                        description: description
                    })
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    alert('Failed to add domain: ' + errorText);
                    return;
                }
                alert('Domain added successfully!');
                window.location.reload(); // Refresh to show updated domain list
            } catch (error) {
                console.error('Error adding domain:', error);
                alert('An unexpected error occurred.');
            }
        });
    }
    function updateDomainsList(newDomain) {
        if (!domainsListContainer) return;
        const noDomainsMsg = domainsListContainer.querySelector('p');
        if (noDomainsMsg && noDomainsMsg.textContent.includes('No domains added yet')) {
            noDomainsMsg.remove();
        }
        const domainAccordion = document.createElement('div');
        domainAccordion.classList.add('accordion');
        const header = document.createElement('div');
        header.classList.add('accordion-header');
        header.innerHTML = <span>${newDomain.name}</span><i class="fas fa-chevron-down"></i>;
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('accordion-active');
        });
        const content = document.createElement('div');
        content.classList.add('accordion-content');
        content.innerHTML = <p>No internships in this domain yet.</p>;
        domainAccordion.appendChild(header);
        domainAccordion.appendChild(content);
        domainsListContainer.appendChild(domainAccordion);
    }
    function updateDomainDropdowns(newDomain) {
        if (internshipDomainSelect) {
            const option = document.createElement('option');
            option.value = newDomain.name;
            option.textContent = newDomain.name;
            internshipDomainSelect.appendChild(option);
        }
        if (taskDomainSelect) {
            const option = document.createElement('option');
            option.value = newDomain.name;
            option.textContent = newDomain.name;
            taskDomainSelect.appendChild(option);
        }
    }
});
