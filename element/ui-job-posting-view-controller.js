'use strict'
const uiJobPostingDocument = document._currentScript || document.currentScript;;
const uiJobPostingTemplate = uiJobPostingDocument.ownerDocument.querySelector('#ui-job-posting-view');

class JobPostingViewController extends HTMLElement{

	static get observedAttributes() {
		return ["model"];
	}

  constructor(model){
    super();
		this.model = new JobPosting(model);
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
			//else{ this.$baseSalaryContainer.hidden = true}

			if(this.$datePosted && this.model.datePosted){ this.$datePosted.innerText = this.model.datePosted}
			//else{ this.$datePosted.hidden = true}

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
			}
			//else{ this.$educationRequirementsContainer.hidden = true}


			if(this.$employmentType && this.model.employmentType){ this.$employmentType.innerText = this.model.employmentType}
			//else{ this.$employmentType.hidden = true}

			if(this.$experienceRequirements && this.model.experienceRequirements.length){ this.$experienceRequirements.innerText = this.model.experienceRequirements }
			//else{ this.$experienceRequirementsContainer.hidden = true; }

			if(this.$hiringOrganization && this.model.hiringOrganization){ this.$hiringOrganization.setAttribute('model', JSON.stringify(this.model.hiringOrganization))}
			//else{ this.$hiringOrganization.hidden = true; }

			if(this.$incentiveCompensation && this.model.incentiveCompensation){ this.$incentiveCompensation.innerText = this.model.incentiveCompensation }
			//else{ this.$incentiveCompensationContainer.hidden = true; }

			if(this.$industry && this.model.industry){ this.$industry.innerText = this.model.industry}
			//else{ this.$industry.hidden = true; }

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
			}
			//else{ this.$jobBenefitsContainer.hidden = true; }

			if(this.$jobLocation && this.model.jobLocation){ this.$jobLocation.innerText = this.model.jobLocation}
			//else{ this.$jobLocation.hidden = true; }

			if(this.$occupationalCategory && this.model.occupationalCategory){ this.$occupationalCategory.innerText = this.model.occupationalCategory}
			//else{ this.$occupationalCategory.hidden = true; }

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
			}
			//else{ this.$qualificationsContainer.hidden = true; }

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
			}
			//else{ this.$responsibilitiesContainer.hidden = true; }

			if(this.$salaryCurrency && this.model.salaryCurrency){ this.$salaryCurrency.innerText = this.model.salaryCurrency}
			//else{ this.$salaryCurrency.innerText = 'USD'; }

			if(this.$skills && this.model.skills){ this.$skills.innerText = this.model.skills}
			//else{ this.$skillsContainer.hidden = true; }

			if(this.$specialCommitments && this.model.specialCommitments){ this.$specialCommitments.innerText = this.model.specialCommitments}
			//else{ this.$specialCommitmentsContainer.hidden = true; }

			if(this.$title && this.model.title){ this.$title.innerText = this.model.title}
			//else{ this.$title.hidden = true; }

			if(this.$validThrough && this.model.validThrough){ this.$validThrough.innerText = this.model.validThrough}
			//else{ this.$validThrough.hidden = true; }

			if(this.$workHours && this.model.workHours){ this.$workHours.innerText = this.model.workHours}
			//else{ this.$workHours.hidden = true; }

			if(this.$description && this.model.description){ this.$description.innerText = this.model.description}
			//else{ this.$descriptionContainer.hidden = true; }

			if(this.$image && this.model.image){
				this.$image.src = this.model.image
				this.$image.style.display = "block";
			}
			//else{ this.$image.style.display = "none"; }
		}
	}

	stringifiedModel(){
		return JSON.stringify(JobPosting.assignedProperties(this.model));
	}

	get shadowRoot(){return this._shadowRoot;}
	set shadowRoot(value){ this._shadowRoot = value}


	get baseSalary(){return this.model.baseSalary;}
	set baseSalary(value){
		this.model.baseSalary = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get datePosted(){return this.model.datePosted;}
	set datePosted(value){
		this.model.datePosted = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get educationRequirements(){return this.model.educationRequirements;}
	set educationRequirements(value){
		this.model.educationRequirements = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get employmentType(){return this.model.employmentType;}
	set employmentType(value){
		this.model.employmentType = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get experienceRequirements(){return this.model.experienceRequirements;}
	set experienceRequirements(value){
		this.model.experienceRequirements = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get hiringOrganization(){return this.model.hiringOrganization;}
	set hiringOrganization(value){
		this.model.hiringOrganization = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get incentiveCompensation(){return this.model.incentiveCompensation;}
	set incentiveCompensation(value){
		this.model.incentiveCompensation = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get industry(){return this.model.industry;}
	set industry(value){
		this.model.industry = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get jobBenefits(){return this.model.jobBenefits;}
	set jobBenefits(value){
		this.model.jobBenefits = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get jobLocation(){return this.model.jobLocation;}
	set jobLocation(value){
		this.model.jobLocation = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get occupationalCategory(){return this.model.occupationalCategory;}
	set occupationalCategory(value){
		this.model.occupationalCategory = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get qualifications(){return this.model.qualifications;}
	set qualifications(value){
		this.model.qualifications = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get responsibilities(){return this.model.responsibilities;}
	set responsibilities(value){
		this.model.responsibilities = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get salaryCurrency(){return this.model.salaryCurrency;}
	set salaryCurrency(value){
		this.model.salaryCurrency = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get skills(){return this.model.skills;}
	set skills(value){
		this.model.skills = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get specialCommitments(){return this.model.specialCommitments;}
	set specialCommitments(value){
		this.model.specialCommitments = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get title(){return this.model.title;}
	set title(value){
		this.model.title = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get validThrough(){return this.model.validThrough;}
	set validThrough(value){
		this.model.validThrough = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get workHours(){return this.model.workHours;}
	set workHours(value){
		this.model.workHours = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get additionalType(){return this.model.additionalType;}
	set additionalType(value){
		this.model.additionalType = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get alternateName(){return this.model.alternateName;}
	set alternateName(value){
		this.model.alternateName = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get description(){return this.model.description;}
	set description(value){
		this.model.description = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get disambiguatingDescription(){return this.model.disambiguatingDescription;}
	set disambiguatingDescription(value){
		this.model.disambiguatingDescription = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get identifier(){return this.model.identifier;}
	set identifier(value){
		this.model.identifier = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get image(){return this.model.image;}
	set image(value){
		this.model.image = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get mainEntityOfPage(){return this.model.mainEntityOfPage;}
	set mainEntityOfPage(value){
		this.model.mainEntityOfPage = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get name(){return this.model.name;}
	set name(value){
		this.model.name = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get potentialAction(){return this.model.potentialAction;}
	set potentialAction(value){
		this.model.potentialAction = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get sameAs(){return this.model.sameAs;}
	set sameAs(value){
		this.model.sameAs = value
		this.setAttribute('model', this.stringifiedModel());
	}

	get url(){return this.model.url;}
	set url(value){
		this.model.url = value
		this.setAttribute('model', this.stringifiedModel());
	}

	disconnectedCallback() {
		//console.log('disconnected');
	}
}

window.customElements.define('ui-job-posting', JobPostingViewController);
