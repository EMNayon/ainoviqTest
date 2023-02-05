import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import DataRender from "./DataRender";
import axios from "axios";

function Home() {
  const [companyData, setcompanyData] = useState({});
  const [companyLogo, setcompanyLogo] = useState(null);

  
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...companyData, companyLogo };
    newData[field] = value;
    setcompanyData(newData);

    // console.log(newData);
  };

  const onChangeHandler = async (e) => {
    const data = e.target.files[0];
    // const currentDate = new Date();
    // const fileName = `IMAGE_${currentDate.getDate()}${currentDate.getMonth() + 1}${currentDate.getFullYear()}_${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}.jpg`

    setcompanyLogo(data.name);
    // console.log(companyLogo);
    // const formData = new FormData();
    // formData.append('logo',data);
    // setcompanyData({...companyData,formData});
    // console.log(formData.name);
    console.log(companyLogo);
  

   if(companyLogo){
        const currentDate = new Date();
        const fileName = `IMAGE_${currentDate.getDate()}${currentDate.getMonth() + 1}${currentDate.getFullYear()}_${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}.jpg`
        const formData = new FormData();
        formData.append('image',companyLogo,fileName);
        try{
            await axios.post('/src/upload',formData);
        }catch(error){
            console.error(error);
        }
    }

  }
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
        // this.setState({ tdata: data });
      })
      .catch(console.log);
    // console.log(companyData);
  };
  return (
    <div className="ms-5 me-5 p-5">
      <h1 className="text-info">Enter Company Data</h1>
      <form onSubmit={handleRegisterSubmit} className="bg-info p-5">
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Company Name"
            name="company_name"
            onBlur={handleOnBlur}
            required=""
            autofocus=""
            className="form-control rounded-pill border-0 shadow-sm px-4 fs-5"
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
            className="form-control rounded-pill border-0 shadow-sm px-4 fs-5"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Ownership"
            name="ownership"
            onBlur={handleOnBlur}
            required=""
            className="form-control rounded-pill border-0 shadow-sm px-4 fs-5"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Revenue"
            name="revenue"
            onBlur={handleOnBlur}
            required=""
            className="form-control rounded-pill border-0 shadow-sm px-4 fs-5"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Net Profit"
            name="netprofit"
            onBlur={handleOnBlur}
            required=""
            className="form-control rounded-pill border-0 shadow-sm px-4 fs-5"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Employees Number"
            name="employees"
            onBlur={handleOnBlur}
            required=""
            className="form-control rounded-pill border-0 shadow-sm px-4 fs-5"
          />
        </div>
        <div className="col-md-4">
          <label for="formFile" className="form-label ms-0 fs-4">
            Upload Image
          </label>
          <input
            className="form-control fs-5"
            // accept="image/*"
            // multiple
            type="file"
            onChange={onChangeHandler}
            id="formFile"
          />
        </div>
        <input
          type="submit"
          value={"Submit"}
          className="btn btn-warning fw-bold btn-block text-uppercase rounded-pill shadow-sm fs-5"
        />
        
      </form>
    <br/><br/>
        <h1 className="text-info">All Company Info</h1><br/>
      <DataRender></DataRender>
    </div>
  );
}

export default Home;