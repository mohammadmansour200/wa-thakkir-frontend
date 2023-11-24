import TeachingsApi from "../services/TeachingsApi";
import TeachingList from "./TeachingList";

class TeachingForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal");
    this._teachingList = new TeachingList();
  }
  tagsArray() {
    const str = "فلسطين عقيدة سيرة رقائق قرآن المرأة فوائد";
    this.strArr = str.split(" ");
  }
  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem("username", this._form.elements.username.value);
    if (
      this._form.elements.username.value.split(" ").length >= 2 &&
      this._form.elements.text.value.split("").length > 0 &&
      this._form.elements.tag.value.split(" ").length > 0
    ) {
      this.btn.style.width = "40px";
      this.btn.style.color = "transparent";
      this.spinner.style.display = "block";
      const teaching = {
        text: this._form.elements.text.value,
        tag: this._form.elements.tag.value,
        username: this._form.elements.username.value,
      };
      const newTeaching = await TeachingsApi.createTeaching(teaching);
      this.btn.style.width = "70%";
      this.btn.style.color = "black";
      this.spinner.style.display = "none";

      this._teachingList.addTeachingToList(newTeaching.data.data);

      this._form.elements.text.value = "";
      this._form.elements.username.value = localStorage.getItem("username");

      document.dispatchEvent(new Event("closemodal"));
    } else if (this._form.elements.username.value.split(" ").length < 2) {
      this.inputEl.style.border = "2px solid #bb0728";
      this.danger1.style.opacity = "1";
    } else if (!this._form.elements.text.value) {
      this.textAreaEl.style.border = "2px solid #bb0728";
      this.danger2.style.opacity = "1";
    } else if (!this._form.elements.tag.value) {
      this.optionSelectEl.style.border = "2px solid #bb0728";
      this.danger3.style.opacity = "1";
    }
    if (this._form.elements.username.value.split(" ").length >= 2) {
      this.inputEl.style.border = "solid 2px rgba(82, 82, 82, 0.5)";
      this.danger1.style.opacity = "0";
    }
    if (this._form.elements.text.value.split("").length > 0) {
      this.textAreaEl.style.border = "solid 2px rgba(82, 82, 82, 0.5)";
      this.danger2.style.opacity = "0";
    }
  }

  render() {
    this.tagsArray();
    this._form = document.createElement("form");
    this._form.setAttribute("id", "teaching-form");
    this._formModal.appendChild(this._form);

    const formsDiv1 = document.createElement("div");
    formsDiv1.classList.add("form-controls");
    this._form.appendChild(formsDiv1);

    const labelEl1 = document.createElement("label");
    labelEl1.setAttribute("for", "teaching-text");
    labelEl1.textContent = "ما اسمك الثنائي؟";
    formsDiv1.appendChild(labelEl1);

    this.inputEl = document.createElement("input");
    this.inputEl.setAttribute("type", "text");
    this.inputEl.setAttribute("name", "username");
    this.inputEl.setAttribute("id", "username");
    this.inputEl.value = `${
      localStorage.getItem("username") ? localStorage.getItem("username") : ""
    }`;
    formsDiv1.appendChild(this.inputEl);

    this.danger1 = document.createElement("div");
    this.danger1.classList.add("danger-wrapper");
    this.danger1.innerHTML = `<svg viewBox="0 0 24 24" width='20' height='20' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.7605 15.92L15.3605 4.4C14.5005 2.85 13.3105 2 12.0005 2C10.6905 2 9.50047 2.85 8.64047 4.4L2.24047 15.92C1.43047 17.39 1.34047 18.8 1.99047 19.91C2.64047 21.02 3.92047 21.63 5.60047 21.63H18.4005C20.0805 21.63 21.3605 21.02 22.0105 19.91C22.6605 18.8 22.5705 17.38 21.7605 15.92ZM11.2505 9C11.2505 8.59 11.5905 8.25 12.0005 8.25C12.4105 8.25 12.7505 8.59 12.7505 9V14C12.7505 14.41 12.4105 14.75 12.0005 14.75C11.5905 14.75 11.2505 14.41 11.2505 14V9ZM12.7105 17.71C12.6605 17.75 12.6105 17.79 12.5605 17.83C12.5005 17.87 12.4405 17.9 12.3805 17.92C12.3205 17.95 12.2605 17.97 12.1905 17.98C12.1305 17.99 12.0605 18 12.0005 18C11.9405 18 11.8705 17.99 11.8005 17.98C11.7405 17.97 11.6805 17.95 11.6205 17.92C11.5605 17.9 11.5005 17.87 11.4405 17.83C11.3905 17.79 11.3405 17.75 11.2905 17.71C11.1105 17.52 11.0005 17.26 11.0005 17C11.0005 16.74 11.1105 16.48 11.2905 16.29C11.3405 16.25 11.3905 16.21 11.4405 16.17C11.5005 16.13 11.5605 16.1 11.6205 16.08C11.6805 16.05 11.7405 16.03 11.8005 16.02C11.9305 15.99 12.0705 15.99 12.1905 16.02C12.2605 16.03 12.3205 16.05 12.3805 16.08C12.4405 16.1 12.5005 16.13 12.5605 16.17C12.6105 16.21 12.6605 16.25 12.7105 16.29C12.8905 16.48 13.0005 16.74 13.0005 17C13.0005 17.26 12.8905 17.52 12.7105 17.71Z" fill="#bb0728"></path> </g></svg> ضع اسمك الثنائي`;
    formsDiv1.appendChild(this.danger1);

    const formsDiv2 = document.createElement("div");
    formsDiv2.classList.add("form-controls");
    this._form.appendChild(formsDiv2);

    const labelEl2 = document.createElement("label");
    labelEl2.setAttribute("for", "teaching-text");
    labelEl2.textContent = "ما الذي تريد كتابته؟";
    formsDiv2.appendChild(labelEl2);

    this.textAreaEl = document.createElement("textarea");
    this.textAreaEl.setAttribute("name", "text");
    this.textAreaEl.setAttribute("id", "teaching-text");
    formsDiv2.appendChild(this.textAreaEl);

    this.danger2 = document.createElement("div");
    this.danger2.classList.add("danger-wrapper");
    this.danger2.innerHTML = `<svg viewBox="0 0 24 24" width='20' height='20' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.7605 15.92L15.3605 4.4C14.5005 2.85 13.3105 2 12.0005 2C10.6905 2 9.50047 2.85 8.64047 4.4L2.24047 15.92C1.43047 17.39 1.34047 18.8 1.99047 19.91C2.64047 21.02 3.92047 21.63 5.60047 21.63H18.4005C20.0805 21.63 21.3605 21.02 22.0105 19.91C22.6605 18.8 22.5705 17.38 21.7605 15.92ZM11.2505 9C11.2505 8.59 11.5905 8.25 12.0005 8.25C12.4105 8.25 12.7505 8.59 12.7505 9V14C12.7505 14.41 12.4105 14.75 12.0005 14.75C11.5905 14.75 11.2505 14.41 11.2505 14V9ZM12.7105 17.71C12.6605 17.75 12.6105 17.79 12.5605 17.83C12.5005 17.87 12.4405 17.9 12.3805 17.92C12.3205 17.95 12.2605 17.97 12.1905 17.98C12.1305 17.99 12.0605 18 12.0005 18C11.9405 18 11.8705 17.99 11.8005 17.98C11.7405 17.97 11.6805 17.95 11.6205 17.92C11.5605 17.9 11.5005 17.87 11.4405 17.83C11.3905 17.79 11.3405 17.75 11.2905 17.71C11.1105 17.52 11.0005 17.26 11.0005 17C11.0005 16.74 11.1105 16.48 11.2905 16.29C11.3405 16.25 11.3905 16.21 11.4405 16.17C11.5005 16.13 11.5605 16.1 11.6205 16.08C11.6805 16.05 11.7405 16.03 11.8005 16.02C11.9305 15.99 12.0705 15.99 12.1905 16.02C12.2605 16.03 12.3205 16.05 12.3805 16.08C12.4405 16.1 12.5005 16.13 12.5605 16.17C12.6105 16.21 12.6605 16.25 12.7105 16.29C12.8905 16.48 13.0005 16.74 13.0005 17C13.0005 17.26 12.8905 17.52 12.7105 17.71Z" fill="#bb0728"></path> </g></svg> اكتب شيئا`;
    formsDiv2.appendChild(this.danger2);

    const formsDiv3 = document.createElement("div");
    formsDiv3.classList.add("form-controls");
    this._form.appendChild(formsDiv3);

    const labelEl3 = document.createElement("label");
    labelEl3.setAttribute("for", "tag");
    labelEl3.textContent = "ما الفئة؟";
    formsDiv3.appendChild(labelEl3);

    this.optionSelectEl = document.createElement("select");
    this.optionSelectEl.setAttribute("name", "tag");
    this.optionSelectEl.setAttribute("id", "tag");
    formsDiv3.appendChild(this.optionSelectEl);

    for (let i = 0; i < this.strArr.length; i++) {
      const OptionEl = document.createElement("option");
      OptionEl.value = this.strArr[i].toString();
      OptionEl.textContent = this.strArr[i].toString();
      this.optionSelectEl.appendChild(OptionEl);
    }

    this.danger3 = document.createElement("div");
    this.danger3.classList.add("danger-wrapper");
    this.danger3.innerHTML = `<svg viewBox="0 0 24 24" width='20' height='20' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.7605 15.92L15.3605 4.4C14.5005 2.85 13.3105 2 12.0005 2C10.6905 2 9.50047 2.85 8.64047 4.4L2.24047 15.92C1.43047 17.39 1.34047 18.8 1.99047 19.91C2.64047 21.02 3.92047 21.63 5.60047 21.63H18.4005C20.0805 21.63 21.3605 21.02 22.0105 19.91C22.6605 18.8 22.5705 17.38 21.7605 15.92ZM11.2505 9C11.2505 8.59 11.5905 8.25 12.0005 8.25C12.4105 8.25 12.7505 8.59 12.7505 9V14C12.7505 14.41 12.4105 14.75 12.0005 14.75C11.5905 14.75 11.2505 14.41 11.2505 14V9ZM12.7105 17.71C12.6605 17.75 12.6105 17.79 12.5605 17.83C12.5005 17.87 12.4405 17.9 12.3805 17.92C12.3205 17.95 12.2605 17.97 12.1905 17.98C12.1305 17.99 12.0605 18 12.0005 18C11.9405 18 11.8705 17.99 11.8005 17.98C11.7405 17.97 11.6805 17.95 11.6205 17.92C11.5605 17.9 11.5005 17.87 11.4405 17.83C11.3905 17.79 11.3405 17.75 11.2905 17.71C11.1105 17.52 11.0005 17.26 11.0005 17C11.0005 16.74 11.1105 16.48 11.2905 16.29C11.3405 16.25 11.3905 16.21 11.4405 16.17C11.5005 16.13 11.5605 16.1 11.6205 16.08C11.6805 16.05 11.7405 16.03 11.8005 16.02C11.9305 15.99 12.0705 15.99 12.1905 16.02C12.2605 16.03 12.3205 16.05 12.3805 16.08C12.4405 16.1 12.5005 16.13 12.5605 16.17C12.6105 16.21 12.6605 16.25 12.7105 16.29C12.8905 16.48 13.0005 16.74 13.0005 17C13.0005 17.26 12.8905 17.52 12.7105 17.71Z" fill="#bb0728"></path> </g></svg> ضع الفئة`;
    formsDiv3.appendChild(this.danger3);

    const submitBtnWrapper = document.createElement("div");
    submitBtnWrapper.classList.add("submitbtn-wrapper");
    this._form.appendChild(submitBtnWrapper);

    this.btn = document.createElement("button");
    this.btn.setAttribute("class", "btn");
    this.btn.setAttribute("type", "submit");
    this.btn.setAttribute("id", "submit");
    this.btn.textContent = "إرسال";
    submitBtnWrapper.appendChild(this.btn);

    this.spinner = document.createElement("div");
    this.spinner.classList.add("spinner-submit");
    submitBtnWrapper.appendChild(this.spinner);

    this.addEventListeners();
  }
}

export default TeachingForm;
