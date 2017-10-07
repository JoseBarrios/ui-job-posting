'use strict'
const uiJobPostingDocument = document._currentScript || document.currentScript;;
const uiJobPostingTemplate = uiJobPostingDocument.ownerDocument.querySelector('#ui-job-posting-view');

class JobPostingViewController extends HTMLElement{

	static get observedAttributes() {
		return ["value", "preview", "potential-action"];
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
		this.$responsibilitiesContainer = this.shadowRoot.querySelector('.responsibilities-container');
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
		this.$applyButton = this.shadowRoot.querySelector('#applyButton');
		this.$applyButton.addEventListener('click', e => { location.href=`${this.potentialAction}`; });
		this.$shareButtons = this.shadowRoot.querySelectorAll('ui-share-button')
		this.$shareButtons.forEach(button => button.setAttribute('url', this.model.url));

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
			case 'potential-action':
				this.potentialAction = newVal;
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
		this.model = new JobPosting(value);
		if(value.hiringOrganization){
			this.model.hiringOrganization = new Organization(value.hiringOrganization);
			if(value.hiringOrganization.address){
				this.model.hiringOrganization.address = new PostalAddress(this.model.hiringOrganization.address);
			}
		}
		//DO NOT UPDATE ATTRIBUTE HERE, OTHERWISE INFINITE LOOP HAPPENS
		this._updateRender();
		this._updateEvent();
	}

	get potentialAction(){return this.model.potentialAction;}
	set potentialAction(value){
		this.model.potentialAction = value
		this.setAttribute('value', JSON.stringify(this.value));
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

	get url(){return this.model.url;}
	set url(value){
		this.model.url = value
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

	humanizeDate(date){
		let posted = moment(date);
		let now = moment(Date.now());
		let datePostedInDays = now.diff(posted, 'days');
		let result = 'Posted Today';
		if(datePostedInDays == 1){
			result = `Posted ${datePostedInDays} day ago`;
		}else if(datePostedInDays > 1){
			result = `Posted ${datePostedInDays} days ago`;
		}
		return result;
	}

	_updateEvent(){
		this.dispatchEvent(new CustomEvent('update', {detail: this.value, bubbles:false}));
	}

	_updateRender(){
		if(this.connected && this.model){
			this.$shareButtons.forEach(button => button.setAttribute('url', this.model.url));

			//BASE SALARY
			if(this.$baseSalary && this.model.baseSalary){
				this.$baseSalary.innerText = this.model.baseSalary;
				this.$baseSalary.hidden = false;
			} else if(this.$baseSalary && !this.preview){ this.$baseSalary.hidden = true}

			//DATE POSTED
			if(this.$datePosted && this.model.datePosted){
				this.$datePosted.innerText = this.humanizeDate(this.model.datePosted);
				this.$datePosted.hidden = false;
			} else if(this.$datePosted && !this.preview){ this.$datePosted.hidden = true}

			//EDUCATION REQUIREMENTS
			if(this.$educationRequirements && this.model.educationRequirements){
				this.$educationRequirements.innerText = '';
				this.$educationRequirementsContainer.hidden = false;
				this.model.educationRequirements.split(';').forEach((requirement,index) => {
					var p = document.createElement('p');
					p.innerText = `• ${requirement}`;
					p.style.paddingLeft = this.listOffset;
					p.style.margin = this.listOffset;
					this.$educationRequirements.appendChild(p);
				})
			} else if(this.$educationRequirements && !this.preview){ this.$educationRequirementsContainer.hidden = true}


			//EMPLOYMENT TYPE
			if(this.$employmentType && this.model.employmentType){
				this.$employmentType.innerText = this.model.employmentType;
				this.$employmentType.hidden = false;
			} else if(this.$employmentType && !this.preview){ this.$employmentType.hidden = true}


			//EXPERIENCE REQUIREMENTS
			if(this.$experienceRequirements && this.model.experienceRequirements){
				this.$experienceRequirements.innerText = '';
				this.$experienceRequirementsContainer.hidden = false;
				this.model.experienceRequirements.split(';').forEach((requirement,index) => {
					var p = document.createElement('p');
					p.innerText = `• ${requirement}`;
					p.style.paddingLeft = this.listOffset;
					p.style.margin = this.listOffset;
					this.$experienceRequirements.appendChild(p);
				})
			} else if(this.$experienceRequirements && !this.preview){ this.$experienceRequirementsContainer.hidden = true; }

			//HIRING ORGANIZATION
			if(this.$hiringOrganization && this.hiringOrganization){
				//SAFARI FRIENDLY
				this.$hiringOrganization.setAttribute('value', JSON.stringify(this.hiringOrganization));
				this.$hiringOrganization.hidden = false;
			} else if(this.$hiringOrganization && !this.preview){ this.$hiringOrganization.hidden = true; }

			//INCENTIVE COMPENSATION
			if(this.$incentiveCompensation && this.model.incentiveCompensation){
				this.$incentiveCompensation.innerText = '';
				this.$incentiveCompensationContainer.hidden = false;
				this.model.incentiveCompensation.split(';').forEach((requirement,index) => {
					var p = document.createElement('p');
					p.innerText = `• ${requirement}`;
					p.style.paddingLeft = this.listOffset;
					p.style.margin = this.listOffset;
					this.$incentiveCompensation.appendChild(p);
				})
			} else if(this.$incentiveCompensation && !this.preview){ this.$incentiveCompensationContainer.hidden = true; }


			//INDUSTRY
			if(this.$industry && this.model.industry){
				this.$industry.innerText = this.model.industry;
				this.$industry.hidden = false;
			} else if(this.$industry && !this.preview){ this.$industry.hidden = true; }


			//JOB BENEFITS
			if(this.$jobBenefits && this.model.jobBenefits){
				this.$jobBenefits.innerText = '';
				this.$jobBenefitsContainer.hidden = false;
				this.model.jobBenefits.split(';').forEach((requirement,index) => {
					var p = document.createElement('p');
					p.innerText = `• ${requirement}`;
					p.style.paddingLeft = this.listOffset;
					p.style.margin = this.listOffset;
					this.$jobBenefits.appendChild(p);
				})
			} else if(this.$jobBenefits && !this.preview){ this.$jobBenefitsContainer.hidden = true; }

			//JOB LOCATION
			if(this.$jobLocation && this.model.jobLocation){
				let city = this.model.jobLocation.addressLocality;
				let region = this.model.jobLocation.addressRegion;
				let country = this.model.jobLocation.addressCountry;
				this.$jobLocation.innerText =`${city}, ${region} ${country === 'United States' || !country ? '' : "("+country+")"}`
				this.$jobLocation.hidden = false;
			}
			else if(this.$jobLocation && !this.preview){ this.$jobLocation.hidden = true; }

			//OCUPATIONAL CATEGORY
			if(this.$occupationalCategory && this.model.occupationalCategory){
				this.$occupationalCategory.innerText = this.model.occupationalCategory;
				this.$occupationalCategory.hidden = false;
			} else if(this.$occupationalCategory && !this.preview){ this.$occupationalCategory.hidden = true; }

			//QUALIFICATIONS
			if(this.$qualifications && this.model.qualifications){
				this.$qualifications.innerText = '';
				this.$qualificationsContainer.hidden = false;
				this.model.qualifications.split(';').forEach((requirement,index) => {
					var p = document.createElement('p');
					p.innerText = `• ${requirement}`;
					p.style.paddingLeft = this.listOffset;
					p.style.margin = this.listOffset;
					this.$qualifications.appendChild(p);
				})
			} else if(this.$qualifications && !this.preview){ this.$qualificationsContainer.hidden = true; }


			//RESPONSABILITIES
			if(this.$responsibilities && this.model.responsibilities){
				this.$responsibilities.innerText = '';
				this.$responsibilitiesContainer.hidden = false;
				this.model.responsibilities.split(';').forEach((requirement,index) => {
					if(requirement && requirement !== ''){
						var p = document.createElement('p');
						p.innerText = `• ${requirement}`;
						p.style.paddingLeft = this.listOffset;
						p.style.margin = this.listOffset;
						this.$responsibilities.appendChild(p);
					}
				})
			} else if(this.$responsibilitiesContainer && !this.preview){ this.$responsibilitiesContainer.hidden = true; }

			//SALARY CURRENCY
			if(this.$salaryCurrency && this.model.salaryCurrency){
				this.$salaryCurrency.innerText = this.model.salaryCurrency;
				this.$salaryCurrency.hidden = false;
			} else if(this.$salaryCurrency && !this.preview){ this.$salaryCurrency.hidden = true; }

			//SKILLS
			if(this.$skills && this.model.skills){
				this.$skills.innerText = '';
				this.$skillsContainer.hidden = false;
				this.model.skills.split(';').forEach((requirement,index) => {
					if(requirement && requirement !== ''){
						var p = document.createElement('p');
						p.innerText = `• ${requirement}`;
						p.style.paddingLeft = this.listOffset;
						p.style.margin = this.listOffset;
						this.$skills.appendChild(p);
					}
				})
			} else if(this.$skills && !this.preview){ this.$skillsContainer.hidden = true; }

			//SPECIAL COMMITMENTS
			if(this.$specialCommitments && this.model.specialCommitments){
				this.$specialCommitments.innerText = this.model.specialCommitments;
				this.$specialCommitmentsContainer.hidden = false;
			} else if(this.$specialCommitments && !this.preview){ this.$specialCommitmentsContainer.hidden = true; }

			//TITLE
			if(this.$title && this.model.title){
				this.$title.innerText = this.model.title;
				this.$title.hidden = false;
			} else if (this.$title && !this.model.title && !this.preview){ this.$title.hidden = true; }

			//VALID THROUGH
			if(this.$validThrough && this.model.validThrough){
				this.$validThrough.innerText = this.model.validThrough;
				this.$validThrough.hidden = false;
			} else if (this.$validThrough && !this.preview){ this.$validThrough.hidden = true; }

			//WORK HOURS
			if(this.$workHours && this.model.workHours){
				this.$workHours.innerText = this.model.workHours;
				this.$workHours.hidden = false;
			} else if (this.$workHours && !this.preview){ this.$workHours.hidden = true; }

			//DESCRIPTION
			if(this.$description && this.model.description){
				this.$description.innerText = this.model.description;
				this.$descriptionContainer.hidden = false;
			} else if (this.$description && !this.preview){ this.$descriptionContainer.hidden = true; }


			if(this.$image && this.model.image){
				this.$image.src = this.model.image
				this.$image.style.display = "block";
			}
			//else if (this.$image && !this.preview){ this.$image.style.display = "none"; }
		}
	}

	disconnectedCallback() {
		//console.log('disconnected');
	}
}

window.customElements.define('ui-job-posting', JobPostingViewController);
