import img from "./image/logo.webp";
import Modal from "./components/Modal";
import TeachingForm from "./components/TeachingForm";
import TeachingList from "./components/TeachingList";
import "./css/style.css";

new Modal();

const teachingForm = new TeachingForm();
teachingForm.render();

const teachingList = new TeachingList();
teachingList.filterBtn();
