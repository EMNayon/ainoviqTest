import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import db from "../../public/db.json";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditForm from "./EditForm";
// import "../style.css"

function DataRender() {
  const [companyDatas, setcompanyDatas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/data")
      .then((res) => res.json())
      .then((data) => {
        setcompanyDatas(data)
      });
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:3001/data/${id}`, {
      method: "DELETE",
    });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
        
      <Row xs={1} md={3} className="g-4">
        {/* <img src={companyLogo} alt="img"/> */}
      {companyDatas.map((companyData ,index) => {
        // console.log(companyData);
        return (
          <Col className="hover_card" key={index}>
            <Card className="bg-color border-info shadow p-3 mb-3 bg-body-tertiary rounded">
              <Card.Img variant="top" src={companyData.c1 + "base64," + companyData.c2} className="logo" />
              <Card.Body>
                <Card.Title>{companyData.company_name}</Card.Title>
                <Card.Text>
                  {companyData.revenue}
                  <br></br>
                  
                  {companyData.netprofit}
                </Card.Text>
                <Button className="me-5" variant="outline-danger" onClick={() => handleDelete(companyData?.id)}>
                  Delete
                </Button>
                <Button variant="outline-primary" onClick={handleShow}>
                  Edit
                </Button>

                <div className="modal-dialog modal-dialog-centered">
                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Company Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditForm id={companyData.id}></EditForm>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                    
                    </Modal.Footer>
                    </Modal>
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default DataRender;