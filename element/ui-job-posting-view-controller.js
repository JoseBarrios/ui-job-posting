'use strict'
const uiJobPostingDocument = document._currentScript || document.currentScript;;
const uiJobPostingTemplate = uiJobPostingDocument.ownerDocument.querySelector('#ui-job-posting-view');

class JobPostingViewController extends HTMLElement{

	static get observedAttributes() {
		return ["model"];
	}

  constructor(){
    super();
		const view = document.importNode(uiJobPostingTemplate.content, true);
		this.shadowRoot = this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(view);
		this.connected = false;
		this.listOffset = '0.8em';
		this.updateEvent = new Event('update');
  }

	///STANDARD
	connectedCallback() {

		this.$baseSalaryContainer = this.shadowRoot.querySelector('.base-salary-container');
		this.$baseSalary = this.shadowRoot.querySelector('#baseSalary');

		this.$datePosted = this.shadowRoot.querySelector('#datePosted');

		this.$educationRequirements = this.shadowRoot.querySelector('#educationRequirements');
		this.$educationRequirementsContainer = this.shadowRoot.querySelector('.education-requirements-container');

		this.$employmentType = this.shadowRoot.querySelector('#employmentType');

		this.$experienceRequirementsContainer = this.shadowRoot.querySelector('.experience-requirements-container');
		this.$experienceRequirements = this.shadowRoot.querySelector('#experienceRequirements');

		this.$hiringOrganization = this.shadowRoot.querySelector('#hiringOrganization');

		this.$incentiveCompensation = this.shadowRoot.querySelector('#incentiveCompensation');
		this.$incentiveCompensationContainer = this.shadowRoot.querySelector('.incentive-compensation-container');

		this.$industry = this.shadowRoot.querySelector('#industry');

		this.$jobBenefits = this.shadowRoot.querySelector('#jobBenefits');
		this.$jobBenefitsContainer = this.shadowRoot.querySelector('.job-benefits-container');

		this.$jobLocation = this.shadowRoot.querySelector('#jobLocation');

		this.$occupationalCategory = this.shadowRoot.querySelector('#occupationalCategory');

		this.$qualifications = this.shadowRoot.querySelector('#qualifications');
		this.$qualificationsContainer = this.shadowRoot.querySelector('.qualifications-container');

		this.$responsibilities = this.shadowRoot.querySelector('#responsibilities');
		this.$responsibilitiesContainer = this.shadowRoot.querySelector('.responsibilities-container');

		this.$salaryCurrency = this.shadowRoot.querySelector('#salaryCurrency');

		this.$skills = this.shadowRoot.querySelector('#skills');
		this.$skillsContainer = this.shadowRoot.querySelector('.skills-container');

		this.$specialCommitments = this.shadowRoot.querySelector('#specialCommitments');
		this.$specialCommitmentsContainer = this.shadowRoot.querySelector('.special-commitments-container');

		this.$title = this.shadowRoot.querySelector('#title');
		this.$validThrough = this.shadowRoot.querySelector('#validThrough');
		this.$workHours = this.shadowRoot.querySelector('#workHours');

		this.$description = this.shadowRoot.querySelector('#description');
		this.$descriptionContainer = this.shadowRoot.querySelector('.description-container');

		this.$image = this.shadowRoot.querySelector('#image');

		this.connected = true;
		this._updateRender();
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		this.model = new JobPosting(JSON.parse(newVal));
		this._updateRender();
		this.dispatchEvent(this.updateEvent);
	}

	_updateRender(){
		if(this.connected && this.model){

			if(this.$baseSalary && this.model.baseSalary){ this.$baseSalary.innerText = this.model.baseSalary}
			else{ this.$baseSalaryContainer.hidden = true}

			if(this.$datePosted && this.model.datePosted){ this.$datePosted.innerText = this.model.datePosted}
			else{ this.$datePosted.hidden = true}

			//EDUCATION REQUIREMENTS
			if(this.$educationRequirements && this.model.educationRequirements){
				this.$educationRequirements.innerText = '';
				this.model.educationRequirements.forEach(requirement => {
					var p = document.createElement('p');
					p.innerText = `• ${requirement}`;
					p.style.paddingLeft = this.listOffset;
					p.style.margin = this.listOffset;
					this.$educationRequirements.appendChild(p);
				})
			} else{ this.$educationRequirementsContainer.hidden = true}


			if(this.$employmentType && this.model.employmentType){ this.$employmentType.innerText = this.model.employmentType}
			else{ this.$employmentType.hidden = true}

			if(this.$experienceRequirements && this.model.experienceRequirements.length){ this.$experienceRequirements.innerText = this.model.experienceRequirements }
			else{ this.$experienceRequirementsContainer.hidden = true; }

			if(this.$hiringOrganization && this.model.hiringOrganization){ this.$hiringOrganization.setAttribute('model', JSON.stringify(this.model.hiringOrganization))}
			else{ this.$hiringOrganization.hidden = true; }

			if(this.$incentiveCompensation && this.model.incentiveCompensation){ this.$incentiveCompensation.innerText = this.model.incentiveCompensation }
			else{ this.$incentiveCompensationContainer.hidden = true; }

			if(this.$industry && this.model.industry){ this.$industry.innerText = this.model.industry}
			else{ this.$industry.hidden = true; }

			//JOB BENEFITS
			if(this.$jobBenefits && this.model.jobBenefits){
				this.$jobBenefits.innerText = '';
				this.$jobBenefits.innerText = this.model.jobBenefits;
				//this.model.jobBenefits.forEach(requirement => {
					//var p = document.createElement('p');
					//p.innerText = `• ${requirement}`;
					//p.style.paddingLeft = this.listOffset;
					//p.style.margin = this.listOffset;
					//this.$jobBenefits.appendChild(p);
				//})
			} else{ this.$jobBenefitsContainer.hidden = true; }

			if(this.$jobLocation && this.model.jobLocation){ this.$jobLocation.innerText = this.model.jobLocation}
			else{ this.$jobLocation.hidden = true; }

			if(this.$occupationalCategory && this.model.occupationalCategory){ this.$occupationalCategory.innerText = this.model.occupationalCategory}
			else{ this.$occupationalCategory.hidden = true; }

			//QUALIFICATIONS
			if(this.$qualifications && this.model.qualifications){
				this.$qualifications.innerText = '';
				this.model.qualifications.forEach(requirement => {
					var p = document.createElement('p');
					p.innerText = `• ${requirement}`;
					p.style.paddingLeft = this.listOffset;
					p.style.margin = this.listOffset;
					this.$qualifications.appendChild(p);
				})
			} else{ this.$qualificationsContainer.hidden = true; }

			//RESPONSABILITIES
			if(this.$responsibilities && this.model.responsibilities){
				this.$responsibilities.innerText = '';
				this.model.responsibilities.forEach((requirement,index) => {
					if(requirement && requirement !== ''){
						var p = document.createElement('p');
						p.innerText = `• ${requirement}`;
						p.style.paddingLeft = this.listOffset;
						p.style.margin = this.listOffset;
						this.$responsibilities.appendChild(p);
					}
				})
			} else{ this.$responsibilitiesContainer.hidden = true; }


			if(this.$salaryCurrency && this.model.salaryCurrency){ this.$salaryCurrency.innerText = this.model.salaryCurrency}
			else{ this.$salaryCurrency.innerText = 'USD'; }

			if(this.$skills && this.model.skills){ this.$skills.innerText = this.model.skills}
			else{ this.$skillsContainer.hidden = true; }

			if(this.$specialCommitments && this.model.specialCommitments){ this.$specialCommitments.innerText = this.model.specialCommitments}
			else{ this.$specialCommitmentsContainer.hidden = true; }

			if(this.$title && this.model.title){ this.$title.innerText = this.model.title}
			else{ this.$title.hidden = true; }

			if(this.$validThrough && this.model.validThrough){ this.$validThrough.innerText = this.model.validThrough}
			else{ this.$validThrough.hidden = true; }

			if(this.$workHours && this.model.workHours){ this.$workHours.innerText = this.model.workHours}
			else{ this.$workHours.hidden = true; }

			if(this.$description && this.model.description){ this.$description.innerText = this.model.description}
			else{ this.$descriptionContainer.hidden = true; }

			if(this.$image && this.model.image){
				this.$image.src = this.model.image
				this.$image.style.display = "block";
			}
			else{ this.$image.style.display = "none"; }
		}
	}

	stringifiedModel(){
		return JSON.stringify(JobPosting.assignedProperties(this.model));
	}

	get shadowRoot(){return this._shadowRoot;}
	set shadowRoot(value){ this._shadowRoot = value}

	get title(){return this.model.title;}
	set title(value){
		this.model.title = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get employmentType(){return this.model.employmentType;}
	set employmentType(value){
		this.model.employmentType = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get xxx(){return this.model.xxx;}
	set xxx(value){
		this.model.xxx = value
		this.setAttribute('model', this.stringifiedModel());
	}




	disconnectedCallback() {
		//console.log('disconnected');
	}
}

window.customElements.define('ui-job-posting', JobPostingViewController);
