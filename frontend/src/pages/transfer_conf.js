import React  from 'react';
import './Form.css';

export default function transfer_conf({ data }) {
  console.log(data);
  const recurring = data.recurringType;

  return (
    <div className='form-content-right2'>
      <h1>Please confirm the details of transfer !</h1>
      <p></p>
      <p>From : {data.from}</p>
      <p>To : {data.to}</p>
      <p>Amount : {data.date}</p>
      {recurring ? (
      
       <p>Recurring Type : {data.recurringType}</p>
       ) : (
        <p>Not recurring</p>
      )}

      <div class="buttons">
        <button className='action_btn' type='submit'>
            Continue
          </button>
        <button className='action_btn' type='submit'>
            Cancel
        </button>
      </div>
    </div>
  );
}
