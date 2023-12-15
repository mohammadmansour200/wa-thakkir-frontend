import axios from "axios";

class TeachingsApi {
  constructor() {
    this._apiUrl = "https://teachings-api.onrender.com/api/teachings";
  }
  getTeachings() {
    return axios.get(this._apiUrl);
  }

  createTeaching(data) {
    return axios.post(this._apiUrl, data);
  }

  deleteTeaching(id) {
    const username = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "";
    return axios.delete(`${this._apiUrl}/${id}`, {
      data: {
        username,
      },
    });
  }

  editTeaching(id, data) {
    return axios.put(`${this._apiUrl}/${id}`, data);
  }
}

export default new TeachingsApi();
