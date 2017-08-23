'use strict'
const uiJobPostingDocument = document._currentScript || document.currentScript;;
const uiJobPostingTemplate = uiJobPostingDocument.ownerDocument.querySelector('#ui-job-posting-view');

class JobPostingViewController extends HTMLElement{

	static get observedAttributes() {
		return ["value", "preview"];
	}

  constructor(model){
    super();
		this.model = new JobPosting(model);
		const view = document.importNode(uiJobPostingTemplate.content, true);
		this.shadowRoot = this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(view);
		this.connected = false;
		this.listOffset = '0.8em';
		this.preview = false;

		this.defaultEventName = "update";
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
		this.$qualificationsContainer = this.shadowRoot.querySelector('.qualifications-container');
		this.$qualifications = this.shadowRoot.querySelector('#qualifications');
		this.$responsibilities = this.shadowRoot.querySelector('#responsibilities');
		//this.$responsibilitiesContainer = this.shadowRoot.querySelector('.responsibilities-container');
		this.$salaryCurrency = this.shadowRoot.querySelector('#salaryCurrency');
		this.$skills = this.shadowRoot.querySelector('#skills');
		this.$skillsContainer = this.shadowRoot.querySelector('.skills-container');
		this.$specialCommitments = this.shadowRoot.querySelector('#specialCommitments');
		this.$specialCommitmentsContainer = this.shadowRoot.querySelector('#specialCommitmentsContainer');
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
		switch(attrName){
			case 'value':
				this.value = JSON.parse(newVal);
				break;
			case 'preview':
				this.preview = (newVal === 'true');
				break;
			default:
				console.warn(`Attribute #{attrName} is not handled... go do that`);
		}
		this._updateRender();
	}

	get shadowRoot(){return this._shadowRoot;}
	set shadowRoot(value){ this._shadowRoot = value}


	//MASTER
	get value(){
		let value = {}
		value = JobPosting.assignedProperties(this.model)
		if(value.hiringOrganization){
			value.hiringOrganization = Organization.assignedProperties(this.model.hiringOrganization)
			if(value.hiringOrganization.address){
				value.hiringOrganization.address = PostalAddress.assignedProperties(this.model.hiringOrganization.address)
			}
		}
		return value;
	}
	set value(value){
		if(!value.skills){ this.$skills.innerHTML = "• The list of skills required to fulfill this role (e.g., familiarity with Javascript, etc)" }
		//if(!value.skills){ this.$skills.innerHTML = "• Specific qualifications required for this role (e.g., food save certificate)" }
		//if(!value.skills){ this.$skills.innerHTML = "• Responsibilities associated with this role (e.g., coordinate yearly HR conference)" }
		//if(!value.skills){ this.$skills.innerHTML = "• Educational background needed for the position (e.g., Bachelor's degree)." }
		//if(!value.skills){ this.$skills.innerHTML = "• Description of the experience needed for the position. (e.g., 3 years of experience using Javascript)" }
		//if(!value.skills){ this.$skills.innerHTML = "• Description of benefits associated with the job (e.g., flexible hours, dental, etc)." }
		//if(!value.skills){ this.$skills.innerHTML = "• Description of bonus and commission compensation aspects of the job. (e.g., stock options, etc)" }

		this.model = new JobPosting(value);
		this.model.hiringOrganization = new Organization(value.hiringOrganization);
		this.model.hiringOrganization.address = new PostalAddress(this.model.hiringOrganization.address);
		//DO NOT UPDATE ATTRIBUTE HERE, OTHERWISE INFINITE LOOP HAPPENS
		this._updateRender();
		this._updateEvent();
	}


	get baseSalary(){return this.model.baseSalary;}
	set baseSalary(value){
		this.model.baseSalary = value
		this.$baseSalary.hidden = false;
		this.$salaryCurrency.hidden = false;
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get datePosted(){return this.model.datePosted;}
	set datePosted(value){
		this.model.datePosted = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get educationRequirements(){return this.model.educationRequirements;}
	set educationRequirements(value){
		this.model.educationRequirements = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get employmentType(){return this.model.employmentType;}
	set employmentType(value){
		this.model.employmentType = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get experienceRequirements(){return this.model.experienceRequirements;}
	set experienceRequirements(value){
		this.model.experienceRequirements = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get hiringOrganization(){
		let value = {};
		if(this.model.hiringOrganization){
			value = Organization.assignedProperties(this.model.hiringOrganization);
			if(this.model.hiringOrganization.address){
				value.address = PostalAddress.assignedProperties(value.address);
			}
		}
		return value;
	}
	set hiringOrganization(value){
		this.model.hiringOrganization = new Organization(value);
		this.model.hiringOrganization.address = new PostalAddress(value.address);
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get incentiveCompensation(){return this.model.incentiveCompensation;}
	set incentiveCompensation(value){
		this.model.incentiveCompensation = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get industry(){return this.model.industry;}
	set industry(value){
		this.model.industry = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get jobBenefits(){return this.model.jobBenefits;}
	set jobBenefits(value){
		this.model.jobBenefits = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get jobLocation(){return this.model.jobLocation;}
	set jobLocation(value){
		this.model.jobLocation = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get occupationalCategory(){return this.model.occupationalCategory;}
	set occupationalCategory(value){
		this.model.occupationalCategory = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get qualifications(){return this.model.qualifications;}
	set qualifications(value){
		this.model.qualifications = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get responsibilities(){return this.model.responsibilities;}
	set responsibilities(value){
		this.model.responsibilities = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get salaryCurrency(){return this.model.salaryCurrency;}
	set salaryCurrency(value){
		this.model.salaryCurrency = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get skills(){return this.model.skills;}
	set skills(value){
		this.model.skills = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get specialCommitments(){return this.model.specialCommitments;}
	set specialCommitments(value){
		this.model.specialCommitments = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get title(){return this.model.title;}
	set title(value){
		this.model.title = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get validThrough(){return this.model.validThrough;}
	set validThrough(value){
		this.model.validThrough = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get workHours(){return this.model.workHours;}
	set workHours(value){
		this.model.workHours = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get additionalType(){return this.model.additionalType;}
	set additionalType(value){
		this.model.additionalType = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get alternateName(){return this.model.alternateName;}
	set alternateName(value){
		this.model.alternateName = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get description(){return this.model.description;}
	set description(value){
		this.model.description = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get disambiguatingDescription(){return this.model.disambiguatingDescription;}
	set disambiguatingDescription(value){
		this.model.disambiguatingDescription = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get identifier(){return this.model.identifier;}
	set identifier(value){
		this.model.identifier = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get image(){return this.model.image;}
	set image(value){
		this.model.image = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get mainEntityOfPage(){return this.model.mainEntityOfPage;}
	set mainEntityOfPage(value){
		this.model.mainEntityOfPage = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get name(){return this.model.name;}
	set name(value){
		this.model.name = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get potentialAction(){return this.model.potentialAction;}
	set potentialAction(value){
		this.model.potentialAction = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get sameAs(){return this.model.sameAs;}
	set sameAs(value){
		this.model.sameAs = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	get url(){return this.model.url;}
	set url(value){
		this.model.url = value
		this.setAttribute('value', JSON.stringify(this.value));
	}

	_updateEvent(){
		this.dispatchEvent(new CustomEvent(this.defaultEventName, {detail: {value: this.value}, bubbles:false}));
	}

	_updateRender(){
		if(this.connected && this.model){

			if(this.$baseSalary && this.model.baseSalary){ this.$baseSalary.innerText = this.model.baseSalary}
			//else if(!this.preview){ this.$baseSalaryContainer.hidden = true}

			if(this.$datePosted && this.model.datePosted){ this.$datePosted.innerText = this.model.datePosted}
			//else if(!this.preview){ this.$datePosted.hidden = true}

			//EDUCATION REQUIREMENTS
			if(this.$educationRequirements && this.model.educationRequirements.length){
				this.$educationRequirements.innerText = '';
				this.model.educationRequirements.forEach(requirement => {
					var p = document.createElement('p');
					p.innerText = `• ${requirement}`;
					p.style.paddingLeft = this.listOffset;
					p.style.margin = this.listOffset;
					this.$educationRequirements.appendChild(p);
				})
			}
			//else if(!this.preview){ this.$educationRequirementsContainer.hidden = true}


			if(this.$employmentType && this.model.employmentType){ this.$employmentType.innerText = this.model.employmentType}
			//else if(!this.preview){ this.$employmentType.hidden = true}

			if(this.$experienceRequirements && this.model.experienceRequirements.length){
				this.$experienceRequirements.innerText = '';
				this.model.experienceRequirements.forEach(requirement => {
					var p = document.createElement('p');
					p.innerText = `• ${requirement}`;
					p.style.paddingLeft = this.listOffset;
					p.style.margin = this.listOffset;
					this.$experienceRequirements.appendChild(p);
				})
			}
			//else if(!this.preview){ this.$experienceRequirementsContainer.hidden = true; }

			//ELEMENT SET VALUE
			if(this.$hiringOrganization && this.hiringOrganization){
				//this.$hiringOrganization.value = this.hiringOrganization;
				this.$hiringOrganization.setAttribute('value', JSON.stringify(this.hiringOrganization));
			}
			//CANT HIDE, CUSTOM ELEMENT NEEDS TO HANDLE HIDDEN ATTR
			//else if(!this.preview){ this.$hiringOrganization.hidden = true; }

			if(this.$incentiveCompensation && this.model.incentiveCompensation.length){
				this.$incentiveCompensation.innerText = '';
				this.model.incentiveCompensation.forEach(requirement => {
					var p = document.createElement('p');
					p.innerText = `• ${requirement}`;
					p.style.paddingLeft = this.listOffset;
					p.style.margin = this.listOffset;
					this.$incentiveCompensation.appendChild(p);
				})
			}
			//CANT HIDE, CUSTOM ELEMENT NEEDS TO HANDLE HIDDEN ATTR
			//else if(!this.preview){ this.$incentiveCompensationContainer.hidden = true; }

			if(this.$industry && this.model.industry){ this.$industry.innerText = this.model.industry}
			//else if(!this.preview){ this.$industry.hidden = true; }

			//JOB BENEFITS
			if(this.$jobBenefits && this.model.jobBenefits.length){
				this.$jobBenefits.innerText = '';
				this.model.jobBenefits.forEach(requirement => {
					var p = document.createElement('p');
					p.innerText = `• ${requirement}`;
					p.style.paddingLeft = this.listOffset;
					p.style.margin = this.listOffset;
					this.$jobBenefits.appendChild(p);
				})
			}
			//CANT HIDE, CUSTOM ELEMENT NEEDS TO HANDLE HIDDEN ATTR
			//else{ this.$jobBenefitsContainer.hidden = true; }

			if(this.$jobLocation && this.model.jobLocation){
				let city = this.model.jobLocation.addressLocality;
				let region = this.model.jobLocation.addressRegion;
				let country = this.model.jobLocation.addressCountry;
				this.$jobLocation.innerText =`${city}, ${region} ${country === 'United States' || !country ? '' : "("+country+")"}`
			}
			//if(!this.preview){ this.$jobLocation.hidden = true; }

			if(this.$occupationalCategory && this.model.occupationalCategory){ this.$occupationalCategory.innerText = this.model.occupationalCategory}
			//else if(!this.preview){ this.$occupationalCategory.hidden = true; }

			//QUALIFICATIONS
			if(this.$qualifications && this.model.qualifications.length){
				this.$qualifications.innerText = '';
				this.model.qualifications.forEach(requirement => {
					var p = document.createElement('p');
					p.innerText = `• ${requirement}`;
					p.style.paddingLeft = this.listOffset;
					p.style.margin = this.listOffset;
					this.$qualifications.appendChild(p);
				})
			}
			//CANT HIDE, CUSTOM ELEMENT NEEDS TO HANDLE HIDDEN ATTR
			//else{ this.$qualificationsContainer.hidden = true; }

			//RESPONSABILITIES
			if(this.$responsibilities && this.model.responsibilities.length){
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
			//CANT HIDE, CUSTOM ELEMENT NEEDS TO HANDLE HIDDEN ATTR
			//else{ this.$responsibilitiesContainer.hidden = true; }

			if(this.$salaryCurrency){ this.$salaryCurrency.innerText = this.model.salaryCurrency || 'USD'}
			//else if(!this.preview){ this.$salaryCurrency.hidden = true; }

			if(this.$skills && this.model.skills.length){
				this.$skills.innerText = '';
				this.model.skills.forEach((requirement,index) => {
					if(requirement && requirement !== ''){
						var p = document.createElement('p');
						p.innerText = `• ${requirement}`;
						p.style.paddingLeft = this.listOffset;
						p.style.margin = this.listOffset;
						this.$skills.appendChild(p);
					}
				})
			}
			//CANT HIDE, CUSTOM ELEMENT NEEDS TO HANDLE HIDDEN ATTR
			//else{ this.$skillsContainer.hidden = true; }

			if(this.$specialCommitments && this.model.specialCommitments){ this.$specialCommitments.innerText = this.model.specialCommitments}
			//if(!this.preview){ this.$specialCommitmentsContainer.hidden = true; }

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

	disconnectedCallback() {
		//console.log('disconnected');
	}
}

window.customElements.define('ui-job-posting', JobPostingViewController);
