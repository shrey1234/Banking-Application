import * as React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import { useHistory } from "react-router-dom";
// eslint-disable-next-line
import AddPayee from './addpayee' ;
import Navbar from 'react-bootstrap/Navbar'

const Payee = () => {
    const payeelist = [
        {payee_name: "Shreya",acc_type: "Savings",acc_no: "2342"},
        {payee_name: "Teepika",acc_type: "Currents",acc_no: "2312"},
        {payee_name: "Duncan",acc_type: "Savings",acc_no: "2352"},
    
    ]

    const [list, setList] = React.useState(payeelist);
    function onDelete (acc_no) {
         const newList = list.filter((payeelist) => payeelist.acc_no !== acc_no);
         setList(newList);
      }
    
    const history = useHistory();
    const navigateTo = () => history.push('/addpayee');


    const render_payee = (payeelist,index) => {
        return(
            <tr key={index}>
                <td className="align-items-center">{payeelist.payee_name}</td>
                <td>{payeelist.acc_type}</td>
                <td>{payeelist.acc_no}</td>
                <button
                  onClick={() => onDelete(payeelist.acc_no)}

                  className="form-input-btn2"
                 >
                      Delete
                </button>
            </tr>
        )
    }

    return (
    <div className='form-content-right2'>
        <Navbar bg="primary" variant="dark"> Payee List </Navbar>
        <ReactBootStrap.Table striped bordered hover>
            <thead>
                <tr>
                <th>Payee Name</th>
                <th>Payee Acccount Number</th>
                <th>Payee Acccount Type</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {list.map(render_payee)}
            </tbody>
        </ReactBootStrap.Table> 
       

          <form>
            <button  className='form-input-btn2' variant="btn btn-success" onClick={navigateTo}>Add Payee</button>
          </form>
         
    </div>
    )
}

export default Payee