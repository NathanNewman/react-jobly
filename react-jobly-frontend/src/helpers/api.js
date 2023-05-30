import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    const token = localStorage.getItem("Authenticated");
    

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    
    const headers = { Authorization: `Bearer ${token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  static async fetchCompanies() {
    try {
      const res = await this.request("companies/");
      return res.companies;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async fetchJobs() {
    try {
      const res = await this.request("jobs/");
      return res.jobs;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async fetchApplications() {
    try {
      const res = await this.request("applications/");
      return res.applications;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async createUser(user) {
    let res = await this.request("auth/register", user, "post");
    return res.token;
  }

  static async login(username, password) {
    try {
      const response = await this.request('auth/token', {
        username: username,
        password: password
      }, 'post');
  
      // Handle the response
      return response.token;
      // Do something with the token
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
