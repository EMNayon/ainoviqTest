import React, { useState } from "react";

function Home() {
  const [companyData, setcompanyData] = useState({});
  const [companyLogo, setcompanyLogo] = useState();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...companyData, companyLogo };
    newData[field] = value;
    setcompanyData(newData);
  };

  const onChangeHandler = (e) => {
    setcompanyLogo(URL.createObjectURL(e.target.files[0]));
  };
  
 console.log(companyLogo);
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:3001/data", {
      method: "POST",
      body: JSON.stringify(companyData),
      headers: { "content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
      })
      .catch(console.log);
  };
  return (
    <div className="m-5 p-5 bg-primary">
      <h1>Enter Company Data</h1>
      <form onSubmit={handleRegisterSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Company Name"
            name="company_name"
            onBlur={handleOnBlur}
            required=""
            autofocus=""
            className="form-control rounded-pill border-0 shadow-sm px-4"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Enter Nationality"
            name="nationality"
            onBlur={handleOnBlur}
            required=""
            autofocus=""
            className="form-control rounded-pill border-0 shadow-sm px-4"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Ownership"
            name="ownership"
            onBlur={handleOnBlur}
            required=""
            className="form-control rounded-pill border-0 shadow-sm px-4"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Revenue"
            name="revenue"
            onBlur={handleOnBlur}
            required=""
            className="form-control rounded-pill border-0 shadow-sm px-4"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Net Profit"
            name="netprofit"
            onBlur={handleOnBlur}
            required=""
            className="form-control rounded-pill border-0 shadow-sm px-4"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Employees Number"
            name="employees"
            onBlur={handleOnBlur}
            required=""
            className="form-control rounded-pill border-0 shadow-sm px-4"
          />
        </div>
        <div className="col-md-2">
          <label for="formFile" className="form-label">
            Upload Image
          </label>
          <input
            className="form-control"
            accepts="image/*"
            // multiple
            type="file"
            onChange={onChangeHandler}
            id="formFile"
          />
        </div>
        <input
          type="submit"
          value={"Submit"}
          className="btn btn-warning fw-bold btn-block text-uppercase mb-2 rounded-pill shadow-sm"
        />
      </form>

      <div className="h-100 w-100">
        <img className="h-100 w-100" src={companyLogo} alt="img" />
      </div>
    </div>
  );
}

export default Home;