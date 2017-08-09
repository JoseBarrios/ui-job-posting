'use strict'
let jobPostingDocument = document.currentScript.ownerDocument;

class JobPostingViewController extends HTMLElement{

  constructor(){
    super();
    const view = jobPostingDocument.querySelector('#ui-job-posting-view').content.cloneNode(true);
    this.appendChild(view);
  }

	///STANDARD
	connectedCallback() {
		//console.log('connected');
	}

	disconnectedCallback() {
		//console.log('disconnected');
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		//console.log('attributeChanged');
	}

	adoptedCallback(){
		//console.log('adoptedCallback');
	}
}

window.customElements.define('ui-job-posting', JobPostingViewController);
