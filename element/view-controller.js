'use strict'
const uiJobPostingDocument = document._currentScript || document.currentScript;;
const uiJobPostingTemplate = uiJobPostingDocument.ownerDocument.querySelector('#ui-job-posting-view');

class JobPostingViewController extends HTMLElement{

	static get observedAttributes() {
		return ["model"];
	}

  constructor(){
    super();
		this.model = new JobPosting();
		const view = document.importNode(uiJobPostingTemplate.content, true);
		this.shadowRoot = this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(view);
  }

	///STANDARD
	connectedCallback() {

		this.$baseSalary = this.shadowRoot.querySelector('#baseSalary');
		this.$datePosted = this.shadowRoot.querySelector('#datePosted');
		this.$educationRequirements = this.shadowRoot.querySelector('#educationRequirements');
		this.$employmentType = this.shadowRoot.querySelector('#employmentType');
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

		this._updateRender();
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		this.model = new JobPosting(JSON.parse(newVal));
		this._updateRender();
	}

	_updateRender(){

		if(this.$baseSalary && this.model.baseSalary){ this.$baseSalary.innerText = this.model.baseSalary}
		if(this.$datePosted){ this.$datePosted.innerText = this.model.datePosted}
		if(this.$educationRequirements){ this.$educationRequirements.innerText = this.model.educationRequirements}
		if(this.$employmentType){ this.$employmentType.innerText = this.model.employmentType}
		if(this.$experienceRequirements){ this.$experienceRequirements.innerText = this.model.experienceRequirements}
		//if(this.$hiringOrganization){ this.$hiringOrganization.setAttribute('model', JSON.stringify(this.model.hiringOrganization))}
		if(this.$incentiveCompensation){ this.$incentiveCompensation.innerText = this.model.incentiveCompensation }
		if(this.$industry){ this.$industry.innerText = this.model.industry}
		if(this.$jobBenefits){ this.$jobBenefits.innerText = this.model.jobBenefits}
		if(this.$jobLocation){ this.$jobLocation.innerText = this.model.jobLocation}
		if(this.$occupationalCategory){ this.$occupationalCategory.innerText = this.model.occupationalCategory}
		if(this.$qualifications){ this.$qualifications.innerText = this.model.qualifications}
		if(this.$responsibilities){ this.$responsibilities.innerText = this.model.responsibilities}
		if(this.$salaryCurrency){ this.$salaryCurrency.innerText = this.model.salaryCurrency}
		if(this.$skills){ this.$skills.innerText = this.model.skills}
		if(this.$specialCommitments){ this.$specialCommitments.innerText = this.model.specialCommitments}
		if(this.$title){ this.$title.innerText = this.model.title}
		if(this.$validThrough){ this.$validThrough.innerText = this.model.validThrough}
		if(this.$workHours){ this.$workHours.innerText = this.model.workHours}

		if(this.$description){ this.$description.innerText = this.model.description}
		if(this.$image && this.model.image){ this.$image.src = this.model.image}
		//if(this.$xxx){ this.$xxx.innerText = this.model.xxx}
	}

	get shadowRoot(){return this._shadowRoot;}
	set shadowRoot(value){ this._shadowRoot = value}


	disconnectedCallback() {
		//console.log('disconnected');
	}
}

window.customElements.define('ui-job-posting', JobPostingViewController);
