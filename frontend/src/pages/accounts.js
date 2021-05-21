import * as React from 'react';
import * as ReactBootStrap from "react-bootstrap";



const Accounts = () => {
    const accs = [
        {acc_no: "2323",acc_type: "FD",acc_status:"Open",acc_balance: "524362"},
        {acc_no: "232",acc_type: "FD",acc_status:"Open",acc_balance: "23232"},
        {acc_no: "232",acc_type: "FD",acc_status:"Open",acc_balance: "22323"},
        {acc_no: "232",acc_type: "FD",acc_status:"Open",acc_balance: "23232"},
    ]
    const [list, setList] = React.useState(accs);
    function onDelete (acc_no) {
         {/*this.state.accs.filter(accs => accs.acc_no !== acc.acc_no);*/}

         const newList = list.filter((accs) => accs.acc_no !== acc_no);
         setList(newList);
       {/* this.setState({ accs: accs }); */}
      }

       

    const render_acc = (acc,index) => {
        return(
            <tr key={index}>
                <td className="align-items-center">{acc.acc_no}</td>
                <td>{acc.acc_type}</td>
                <td>{acc.acc_status}</td>
                <td>{acc.acc_balance}</td>
                <button
                  onClick={() => onDelete(acc.acc_no)}

                  className="form-input-btn2"
                 >
                      Delete
                </button>
              {/* <td><button type='submit'>Close</button></td> ref https://vegibit.com/how-to-delete-an-item-from-an-array-in-react/*/}
            </tr>
        )
    }

    return (
    <div className='form-content-right2'>
        <ReactBootStrap.Table striped bordered hover>
            <thead>
                <tr>
                <th>Account No</th>
                <th>Account Type</th>
                <th>Account Status</th>
                <th>Account Balance</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
               {list.map(render_acc)}
            </tbody>
        </ReactBootStrap.Table> 
        <button className='form-input-btn2'  type='submit'>
          Add account
        </button>   
    </div>
    )
}

export default Accounts