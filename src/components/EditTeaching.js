import TeachingsApi from "../services/TeachingsApi";

class EditTeaching {
  constructor() {
    this._formModal = document.querySelector("#edit-form");
    this._id = this._formModal.getAttribute("edit-id");
    this._editedCard = document.querySelector(`[data-id="${this._id}"]`);
  }
  tagsArray() {
    const str = "فلسطين عقيدة سيرة رقائق قرآن المرأة فوائد";
    this.strArr = str.split(" ");
  }
  addEventListeners() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.form.elements.text.value.split("").length > 0) {
      this.btn.style.width = "35px";
      this.btn.style.color = "transparent";
      this.spinner.style.display = "block";
      const teaching = {
        username: localStorage.getItem("username"),
        text: this.form.elements.text.value,
        tag: this.form.elements.tag.value,
      };
      const editTeaching = await TeachingsApi.updateTeaching(this.id, teaching);
      this.btn.style.width = "70%";
      this.btn.style.color = "black";
      this.spinner.style.display = "none";

      this._editedCard.children[3].textContent = teaching.text;
      this._editedCard.children[4].textContent = teaching.tag;

      this.form.elements.text.value = "";

      document.dispatchEvent(new Event("closemodal"));
    } else {
      this.textAreaEl.style.border = "2px solid #bb0728";
      this.danger1.style.opacity = "1";
    }
  }

  render() {
    this.tagsArray();
    this.form = document.createElement("form");
    this.form.setAttribute("id", "teaching-form");
    this._formModal.appendChild(this.form);

    const formsDiv1 = document.createElement("div");
    formsDiv1.classList.add("form-controls");
    this.form.appendChild(formsDiv1);

    const labelEl1 = document.createElement("label");
    labelEl1.setAttribute("for", "teaching-text");
    labelEl1.textContent = "ما الذي تريد كتابته؟";
    formsDiv1.appendChild(labelEl1);

    this.textAreaEl = document.createElement("textarea");
    this.textAreaEl.setAttribute("name", "text");
    this.textAreaEl.setAttribute("id", "teaching-text");
    this.textAreaEl.setAttribute("class", "edit-textarea");
    this.textAreaEl.value = this.editedCard.children[3].textContent;
    formsDiv1.appendChild(this.textAreaEl);

    this.danger1 = document.createElement("div");
    this.danger1.classList.add("danger-wrapper");
    this.danger1.innerHTML = `<svg viewBox="0 0 24 24" width='20' height='20' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.7605 15.92L15.3605 4.4C14.5005 2.85 13.3105 2 12.0005 2C10.6905 2 9.50047 2.85 8.64047 4.4L2.24047 15.92C1.43047 17.39 1.34047 18.8 1.99047 19.91C2.64047 21.02 3.92047 21.63 5.60047 21.63H18.4005C20.0805 21.63 21.3605 21.02 22.0105 19.91C22.6605 18.8 22.5705 17.38 21.7605 15.92ZM11.2505 9C11.2505 8.59 11.5905 8.25 12.0005 8.25C12.4105 8.25 12.7505 8.59 12.7505 9V14C12.7505 14.41 12.4105 14.75 12.0005 14.75C11.5905 14.75 11.2505 14.41 11.2505 14V9ZM12.7105 17.71C12.6605 17.75 12.6105 17.79 12.5605 17.83C12.5005 17.87 12.4405 17.9 12.3805 17.92C12.3205 17.95 12.2605 17.97 12.1905 17.98C12.1305 17.99 12.0605 18 12.0005 18C11.9405 18 11.8705 17.99 11.8005 17.98C11.7405 17.97 11.6805 17.95 11.6205 17.92C11.5605 17.9 11.5005 17.87 11.4405 17.83C11.3905 17.79 11.3405 17.75 11.2905 17.71C11.1105 17.52 11.0005 17.26 11.0005 17C11.0005 16.74 11.1105 16.48 11.2905 16.29C11.3405 16.25 11.3905 16.21 11.4405 16.17C11.5005 16.13 11.5605 16.1 11.6205 16.08C11.6805 16.05 11.7405 16.03 11.8005 16.02C11.9305 15.99 12.0705 15.99 12.1905 16.02C12.2605 16.03 12.3205 16.05 12.3805 16.08C12.4405 16.1 12.5005 16.13 12.5605 16.17C12.6105 16.21 12.6605 16.25 12.7105 16.29C12.8905 16.48 13.0005 16.74 13.0005 17C13.0005 17.26 12.8905 17.52 12.7105 17.71Z" fill="#bb0728"></path> </g></svg> اكتب شيئا`;
    formsDiv1.appendChild(this.danger1);

    const formsDiv2 = document.createElement("div");
    formsDiv2.classList.add("form-controls");
    this.form.appendChild(formsDiv2);

    const labelEl2 = document.createElement("label");
    labelEl2.setAttribute("for", "tag");
    labelEl2.textContent = "ما الفئة؟";
    formsDiv2.appendChild(labelEl2);

    const optionSelectEl = document.createElement("select");
    optionSelectEl.setAttribute("name", "tag");
    optionSelectEl.setAttribute("id", "tag");
    optionSelectEl.setAttribute("class", "edit-tag");
    optionSelectEl.value = "hello";
    formsDiv2.appendChild(optionSelectEl);

    for (let i = 0; i < this.strArr.length; i++) {
      const OptionEl = document.createElement("option");
      OptionEl.value = this.strArr[i].toString();
      OptionEl.textContent = this.strArr[i].toString();
      optionSelectEl.appendChild(OptionEl);
    }

    const submitBtnWrapper = document.createElement("div");
    submitBtnWrapper.classList.add("submitbtn-wrapper");
    this.form.appendChild(submitBtnWrapper);

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

export default EditTeaching;
