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
  }

	///STANDARD
	connectedCallback() {

		this.$baseSalaryContainer = this.shadowRoot.querySelector('.base-salary-container');
		this.$baseSalary = this.shadowRoot.querySelector('#baseSalary');

		this.$datePosted = this.shadowRoot.querySelector('#datePosted');
		this.$educationRequirements = this.shadowRoot.querySelector('#educationRequirements');
		this.$employmentType = this.shadowRoot.querySelector('#employmentType');
		this.$experienceRequirementsContainer = this.shadowRoot.querySelector('.experience-requirements-container');
		this.$experienceRequirements = this.shadowRoot.querySelector('#experienceRequirements');
		this.$hiringOrganization = this.shadowRoot.querySelector('#hiringOrganization');
		this.$incentiveCompensation = this.shadowRoot.querySelector('#incentiveCompensation');
		this.$industry = this.shadowRoot.querySelector('#industry');
		this.$jobBenefits = this.shadowRoot.querySelector('#jobBenefits');
		this.$jobLocation = this.shadowRoot.querySelector('#jobLocation');
		this.$occupationalCategory = this.shadowRoot.querySelector('#occupationalCategory');
		this.$qualifications = this.shadowRoot.querySelector('#qualifications');
		this.$responsibilities = this.shadowRoot.querySelector('#responsibilities');
		this.$salaryCurrency = this.shadowRoot.querySelector('#salaryCurrency');
		this.$skills = this.shadowRoot.querySelector('#skills');
		this.$specialCommitments = this.shadowRoot.querySelector('#specialCommitments');
		this.$title = this.shadowRoot.querySelector('#title');
		this.$validThrough = this.shadowRoot.querySelector('#validThrough');
		this.$workHours = this.shadowRoot.querySelector('#workHours');

		this.$description = this.shadowRoot.querySelector('#description');
		this.$image = this.shadowRoot.querySelector('#image');

		this.connected = true;
		this._updateRender();
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		this.model = new JobPosting(JSON.parse(newVal));
		this._updateRender();
	}

	_updateRender(){
		if(this.connected && this.model){

			if(this.$baseSalary && this.model.baseSalary){ this.$baseSalary.innerText = this.model.baseSalary}
			//else{ this.$baseSalaryContainer.hidden = true}

			if(this.$datePosted && this.model.datePosted){ this.$datePosted.innerText = this.model.datePosted}
			//else{ this.$datePosted.hidden = true}

			if(this.$educationRequirements && this.model.educationRequirements){ this.$educationRequirements.innerText = this.model.educationRequirements}


			if(this.$employmentType && this.model.employmentType){ this.$employmentType.innerText = this.model.employmentType}

			//Experience Requirements
			if(this.$experienceRequirements && this.model.experienceRequirements.length){ this.$experienceRequirements.innerText = this.model.experienceRequirements }
			//else{ this.$experienceRequirementsContainer.hidden = true; }

			if(this.$hiringOrganization && this.model.hiringOrganization){ this.$hiringOrganization.setAttribute('model', JSON.stringify(this.model.hiringOrganization))}
			if(this.$incentiveCompensation && this.model.incentiveCompensation){ this.$incentiveCompensation.innerText = this.model.incentiveCompensation }
			if(this.$industry && this.model.industry){ this.$industry.innerText = this.model.industry}
			if(this.$jobBenefits && this.model.jobBenefits){ this.$jobBenefits.innerText = this.model.jobBenefits}
			if(this.$jobLocation && this.model.jobLocation){ this.$jobLocation.innerText = this.model.jobLocation}
			if(this.$occupationalCategory && this.model.occupationalCategory){ this.$occupationalCategory.innerText = this.model.occupationalCategory}
			if(this.$qualifications && this.model.qualifications){ this.$qualifications.innerText = this.model.qualifications}
			if(this.$responsibilities && this.model.responsibilities){ this.$responsibilities.innerText = this.model.responsibilities}
			if(this.$salaryCurrency && this.model.salaryCurrency){ this.$salaryCurrency.innerText = this.model.salaryCurrency}
			if(this.$skills && this.model.skills){ this.$skills.innerText = this.model.skills}
			if(this.$specialCommitments && this.model.specialCommitments){ this.$specialCommitments.innerText = this.model.specialCommitments}
			if(this.$title && this.model.title){ this.$title.innerText = this.model.title}
			if(this.$validThrough && this.model.validThrough){ this.$validThrough.innerText = this.model.validThrough}
			if(this.$workHours && this.model.workHours){ this.$workHours.innerText = this.model.workHours}

			if(this.$description && this.model.description){ this.$description.innerText = this.model.description}
			if(this.$image && this.model.hiringOrganization.image){ this.$image.src = this.model.hiringOrganization.image}
			//if(this.$xxx){ this.$xxx.innerText = this.model.xxx}
		}
	}

	get shadowRoot(){return this._shadowRoot;}
	set shadowRoot(value){ this._shadowRoot = value}


	disconnectedCallback() {
		//console.log('disconnected');
	}
}

window.customElements.define('ui-job-posting', JobPostingViewController);
