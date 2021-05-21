import React ,{useState} from 'react';
import { useForm } from 'react-hook-form'
import './Form.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Transfer_conf from './transfer_conf' ;


const schema = yup.object().shape({
  date: yup.string().required(),
  amount: yup.number().positive().integer().required(),
});

export default function App(props){
    const { register, handleSubmit, watch, formState: { errors } } =  useForm({ resolver: yupResolver(schema)});
    const [data, setData] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const onSubmit = data => {
     setData(data);
     setSubmitted(true);
     console.log(data);
      // window.location.href = `/tranfser-confirmation?from=${data.from}&to=${data.to}&amount=${data.amount}&date=${data.date}&recurring=${data.recurring}&recurringType=${data.recurringType}`
    }
    const watchShowRecurring = watch("recurring", false); // you can supply default value as second argument
    
    const accountTo = [
      { value: 'A', name: 'A' },
      { value: 'B', name: 'B' }            
    ];

    const payeeList = [
      { value: 'Payee1', name: 'Payee 1' },
      { value: 'Payee 2', name: 'Payee 2' }            
    ];
    if (!submitted) {

    return(
        <div className='form-content-right'>

        <form  onSubmit={handleSubmit(onSubmit)} className='form'>
        <h1>
          Get started with us today! Transfer amount to another account.
        </h1>
        <transfer_conf form={register}/>

        <div className='form-inputs'>
        <label className='form-label'>From</label>
        <select className='form-input' name="from" {...register("from")}>
        {accountTo.map((e, key) => { return <option key={key} value={e.value}>{e.name}</option>; })}
        </select>
        {errors.from && <p>{'From is required'}</p>}
        </div>

        <div className='form-inputs'>
        <label className='form-label'>To (If Payee is not in the list, Please add payee)</label>
        <select className='form-input' name="to" {...register("to")}>
        {payeeList.map((e, key) => { return <option key={key} value={e.value}>{e.name}</option>; })}
        </select>
        {errors.to && <p>{'To is required'}</p>}
        </div>

        <div className='form-inputs'>
        <label className='form-label'>Amount</label>
        <input className='form-input' type="number" placeholder="amount" name="amount" {...register("amount", { required: true })}/>
        {errors.amount && <p>{'Amount is not valid'}</p>}
        </div>

        <div className='form-inputs'>
        <label className='form-label'>Date</label>
        <input className='form-input' type="Date" placeholder="date" name="date" {...register("date", { required: true })}/>
        {errors.date && <p>{'Date is required'}</p>}
        </div>

        <div className='form-inputs'>
          <input name="recurring" type="checkbox"  id="recurring" {...register("recurring")}/>
          <label for="recurring" className="form-label">Recurring</label>
        </div>

        {watchShowRecurring && (
          
        <div className='form-inputs'>
        <select className='form-input' name="recurringType" {...register("recurringType")}>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Monthly">Yearly</option>
          
        </select>
        </div>
        )}

        <button className='form-input-btn' type='submit'>
          Continue
        </button>
        </form>
        </div>
    )
}
else {
  return <Transfer_conf data={data} />;
}
}


