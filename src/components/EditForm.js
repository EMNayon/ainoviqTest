import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";

function EditForm(props) {
  const [companyData, setcompanyData] = useState({});
  const [companyLogo, setcompanyLogo] = useState();
 
  const handleOnBlur = (e) => {
    setcompanyData({
      ...companyData,
      [e.target.name]: e.target.value
    })
  };

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
    <div className="">
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
          <CurrencyFormat
            thousandSeparator={true}
            prefix={'$'}
            decimalScale={'2'}
            type="text"
            placeholder="Revenue"
            name="revenue"
            onBlur={handleOnBlur}
            required=""
            className="form-control rounded-pill border-0 shadow-sm px-4 fs-5"
          />
        </div>
        <div className="form-group mb-3">
          <CurrencyFormat
            thousandSeparator={true}
            prefix={'$'}
            decimalScale={'2'}
            type="text"
            placeholder="Net Profit"
            name="netprofit"
            onBlur={handleOnBlur}
            required=""
            className="form-control rounded-pill border-0 shadow-sm px-4 fs-5"
          />
        </div>
        <div className="form-group mb-3">
          <CurrencyFormat
            thousandSeparator={true}
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
    </div>
  );
}

export default EditForm;