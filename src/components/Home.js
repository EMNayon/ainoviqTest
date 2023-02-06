
import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import DataRender from "./DataRender";
// import axios from "axios";

function Home() {
  const [companyData, setcompanyData] = useState({});
  const [companyLogo, setcompanyLogo] = useState();
 
  const handleOnBlur = (e) => {
    setcompanyData({
      ...companyData,
      [e.target.name]: e.target.value
    })
  };

 

  // const onChangeHandler = async (e) => {
  //   const data = e.target.files[0];
  //   const currentDate = new Date();
  //   const fileName = `IMAGE_${currentDate.getDate()}${currentDate.getMonth() + 1}${currentDate.getFullYear()}_${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}.jpg`

  //   // setcompanyLogo(data.name);
  //   // console.log(companyLogo);
  //   const formData = new FormData();
  //   formData.append('image',fileName);
  //   await axios.post('/src/upload',formData);
  //   // setcompanyLogo({...companyData,fileName});
  //   // console.log(formData.name);
  //   // console.log(companyLogo);
  // }

  // //  if(companyLogo){
  // //       const currentDate = new Date();
  // //       const fileName = `IMAGE_${currentDate.getDate()}${currentDate.getMonth() + 1}${currentDate.getFullYear()}_${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}.jpg`
  // //       const formData = new FormData();
  // //       formData.append('image',companyLogo,fileName);
  // //       try{
  // //           await axios.post('/src/upload',formData);
  // //       }catch(error){
  // //           console.error(error);
  // //       }
  // //   }

  // }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const uploadcompanyData = {...companyData};

    let reader = new FileReader();
    reader.readAsDataURL(companyLogo);
    reader.onload = function(){
      let content = reader.result
      let content1 = content.split("base64,")[0];
      let content2 = content.split("base64,")[1];
      const companyData = {
        ...uploadcompanyData,
        c1: content1,
        c2: content2
      }
    fetch("http://127.0.0.1:3001/data",{
      method: "POST",
      headers: { "content-type": "application/json"},
      body: JSON.stringify(companyData)
    })
      // .then((res) => res.json())

      .then((data) => {
        console.log(data);
        // this.setState({ tdata: data });
      })
    }
    reader.onerror = function() {
      console.log(reader.error);
    }
      // .catch(console.log);
    // console.log(companyData);
  };
  const onChangeHandler = (e) => {
    console.log(e.target.files);
    setcompanyLogo(e.target.files[0]);
  };

  return (
    <div className="ms-5 me-5 p-5">
      <h1 className="text-info shadow p-3 mb-3 bg-body-tertiary rounded">Enter Company Data</h1>
      <form onSubmit={handleRegisterSubmit} className="bg-info p-5 shadow p-3 mb-3 bg-body-tertiary rounded">
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
            className="form-control image fs-5"
            accepts="image/*"
            multiple
            type="file"
            name="file"
            onChange={onChangeHandler}
            id="formFile"
          />
        </div>
        
          <input
            type="submit"
            value={"Submit"}
            className="btn btn-outline-primary text-white border-white fw-bold btn-block text-uppercase fs-5"
          />
    
        
      </form>

    <br/><br/>
        <h1 className="text-info shadow p-3 mb-3 bg-body-tertiary rounded">All Company Info</h1><br/>
      <DataRender></DataRender>
     

    </div>
  );
}

export default Home;