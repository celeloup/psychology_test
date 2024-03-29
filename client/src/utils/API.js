import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};

const API = {
  login_admin(user, password) {
    if (user === "admin" && password === "sherlocked") {
      console.log("admin logged");
      sessionStorage.setItem("token", "admin_token");
      return ("test");
    }
  },
  isAuth: function() {
    return sessionStorage.getItem("token") === "admin_token";
  },
  logout: function() {
    localStorage.clear();
  },
  get_users: function() {
    return axios.get(`/api/users`, {}, { headers: headers })
  },
  create_new_user: function(email, sexe, age, etude, pro, langue, langue_sec) {
    return axios.post(
      `/api/users`,
      {
        email,
        sexe,
        age,
        etude,
        pro,
        langue,
        langue_sec
      },
      {
        headers:headers
      }
    );
  },
  update_dilemme: function(email, emotion_prog_a, emotion_prog_b, programme) {
    return axios.put(
      `/api/user/dilemme`,
      {
        email,
        emotion_prog_a,
        emotion_prog_b,
        programme
      },
      {
        headers:headers
      }
    )
  },
  update_annexe: function(email, connais_dilemme, preoccupation_epidemie,
    frequence_infos, frequence_science, exactitude_connaissance, respect_directives_sanitaires, raisons_respect) {
    return axios.put(
      `/api/user/annexe`,
      {
        email,
        connais_dilemme,
        preoccupation_epidemie,
        frequence_infos,
        frequence_science,
        exactitude_connaissance,
        respect_directives_sanitaires,
        raisons_respect
      },
      {
        headers:headers
      }
    )
  },
  update_mbti: function (email, reponses, i, e, n, s, t, f, j, p, type) {
    return axios.put(
      `/api/user/mbti`,
      {
        email, reponses, i, e, n, s, t, f, j, p, type
      },
      { headers: headers }
    )
  },
  login: function(email_user) {
    return axios.get(
      `/api/user/${email_user}`, {
        params: {
          email: email_user
        }
      },
      { headers: headers }
    );
  }
};

export default API;