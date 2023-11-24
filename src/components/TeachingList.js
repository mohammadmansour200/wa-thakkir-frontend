import TeachingsApi from "../services/TeachingsApi";

class TeachingList {
  constructor() {
    this._teachingListEl = document.querySelector("#teaching-list");
    this._modal = document.querySelector("#edit-modal");

    this._teachings = [];
    this._encodedTag = window.location.search.split("=")[1];
    this._decodedTag = decodeURIComponent(this._encodedTag);

    this.getTeachings();

    this._validTags = new Set();
    this._validTags.add("عقيدة");
    this._validTags.add("فلسطين");
    this._validTags.add("سيرة");
    this._validTags.add("رقائق");
    this._validTags.add("قرآن");
    this._validTags.add("المرأة");
    this._validTags.add("فوائد");
  }
  tagsArray() {
    const str = "فلسطين عقيدة سيرة رقائق قرآن المرأة فوائد";
    this.strArr = str.split(" ");
  }
  filterBtn() {
    this.tagsArray();
    const filterBtnWrapper = document.querySelector(".filter-wrapper");
    for (let i = 0; i <= this.strArr.length; i++) {
      if (filterBtnWrapper.children[i].textContent === this._decodedTag) {
        filterBtnWrapper.children[i].style.backgroundColor = "white";
        filterBtnWrapper.children[i].style.color = "black";
      } else if (this._decodedTag === "undefined") {
        filterBtnWrapper.children[0].style.backgroundColor = "white";
        filterBtnWrapper.children[0].style.color = "black";
      }
    }
  }
  filter() {
    this._matchedArrays = this._teachings.filter((array) => {
      if (this._decodedTag === "undefined") {
        document.title = "وذكر";
        return array.tag === array.tag;
      } else {
        document.title = `وذكر - ${this._decodedTag}`;
        return array.tag === this._decodedTag;
      }
    });
  }
  addEventListeners() {
    this._teachingListEl.addEventListener("click", (e) => {
      const teachingId = e.target.parentElement.dataset.id;
      if (e.target.classList.contains("delete")) {
        e.stopImmediatePropagation();
        this.deleteTeaching(teachingId);
        this.addSpinnerOnDelete(teachingId);
      } else if (e.target.classList.contains("edit-btn")) {
        const editForm = document.querySelector("#edit-form");
        editForm.setAttribute("edit-id", teachingId);
        this._modal.style.display = "block";
      }
    });
  }
  async getTeachings() {
    const pageSpinner = document.querySelector(".page-spinner");
    try {
      pageSpinner.style.display = "block";
      const res = await TeachingsApi.getTeachings();
      pageSpinner.style.display = "none";
      this._teachings = res.data.data;
      this.render();
      this.filter();
    } catch (error) {
      pageSpinner.style.display = "none";
      this._teachingListEl.innerHTML = `<h3 class="no-content"> حدث خطأ ما... يا شباب هدوا على الموقع :)</3>`;
    }
  }
  async deleteTeaching(teachingId) {
    const res = await TeachingsApi.deleteTeaching(teachingId);
    this._teachings.filter((teaching) => teaching._id !== teachingId);
    this.getTeachings();
  }
  addSpinnerOnDelete(teachingId) {
    const cardEl = document.querySelector(`[data-id="${teachingId}"]`);
    const spinner = cardEl.children[1];
    spinner.style.display = "block";
    const deleteBtn = cardEl.children[2];
    deleteBtn.style.display = "none";
  }
  addTeachingToList(teaching) {
    this._teachings.push(teaching);
    this.render();
  }
  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = `${tag}`;
    return tagClass;
  }
  render() {
    this.filter();
    if (this._matchedArrays.length > 0) {
      this._teachingListEl.innerHTML = this._matchedArrays
        .map((teaching) => {
          const year = teaching.date.slice(0, 4);
          const day = teaching.date.slice(8, 10);

          const date = new Date(teaching.date);
          const monthName = date.toLocaleString("ar", { month: "short" });

          const tagClass = this.getTagClass(teaching.tag);
          const deleteBtn =
            teaching.username === localStorage.getItem("username")
              ? `
            <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class='delete' aria-label="امسح التذكير">
            <path d="M13.06 12L17.48 7.57996C17.5537 7.5113 17.6128 7.4285 17.6538 7.3365C17.6948 7.2445 17.7168 7.14518 17.7186 7.04448C17.7204 6.94378 17.7018 6.84375 17.6641 6.75036C17.6264 6.65697 17.5703 6.57214 17.499 6.50092C17.4278 6.4297 17.343 6.37356 17.2496 6.33584C17.1562 6.29811 17.0562 6.27959 16.9555 6.28137C16.8548 6.28314 16.7555 6.30519 16.6635 6.34618C16.5715 6.38717 16.4887 6.44627 16.42 6.51996L12 10.94L7.58 6.51996C7.43782 6.38748 7.24978 6.31535 7.05548 6.31878C6.86118 6.32221 6.67579 6.40092 6.53838 6.53834C6.40096 6.67575 6.32225 6.86113 6.31882 7.05544C6.3154 7.24974 6.38752 7.43778 6.52 7.57996L10.94 12L6.52 16.42C6.37955 16.5606 6.30066 16.7512 6.30066 16.95C6.30066 17.1487 6.37955 17.3393 6.52 17.48C6.66062 17.6204 6.85125 17.6993 7.05 17.6993C7.24875 17.6993 7.43937 17.6204 7.58 17.48L12 13.06L16.42 17.48C16.5606 17.6204 16.7512 17.6993 16.95 17.6993C17.1488 17.6993 17.3394 17.6204 17.48 17.48C17.6204 17.3393 17.6993 17.1487 17.6993 16.95C17.6993 16.7512 17.6204 16.5606 17.48 16.42L13.06 12Z" fill="white"/>
            </svg>`
              : "";
          const editBtn =
            teaching.username === localStorage.getItem("username")
              ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class='edit-btn' xmlns="http://www.w3.org/2000/svg" aria-label='عدل التذكير'>
          <path d="M15.4998 5.49994L18.3282 8.32837M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`
              : "";
          return `<div class="card" data-id='${teaching._id}'>
  ${editBtn}
          <div class="spinner"></div>
          ${deleteBtn}
          <h3 class='teaching-text'>
         ${teaching.text}
          </h3>
          <p class="tag ${tagClass}">${teaching.tag}</p>
          <p>
            نُشر في <span class="date">${monthName} ${day}, ${year}</span> بواسطة
            <span class="author">${teaching.username}</span>
          </p>
        </div>`;
        })
        .join("");
    } else {
      this._teachingListEl.innerHTML = `<h3 class="no-content">لا يوجد محتوى...</3>`;
    }

    this.addEventListeners();
  }
}

export default TeachingList;
