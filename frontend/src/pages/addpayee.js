import * as React from 'react';
import { useForm } from 'react-hook-form'

import './Form.css';



const AddPayee = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const watchShowRecurring = watch("recurring", false); // you can supply default value as second argument
    const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
    const watchFields = watch(["recurring", "recurringType"]); // you can also target specific fields by their names

    return(
        <div className='form-content-right'>

        <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <h1>
          Add Payee details for secure transfer
        </h1>
        
        <div className='form-inputs'>
        <label className='form-label'>Payee Name</label>
        <input className='form-input' type="text" placeholder="Payee Name" name="pname" {...register("pname", { required: true })}/>
        {errors.pname && <p>{'Payee Namenis required'}</p>}
        </div>

        <div className='form-inputs'>
        <label className='form-label'>Payee Account Number</label>
        <input className='form-input' type="text" placeholder="Payee Account Number" name="pacc" {...register("pacc", { required: true })}/>
        {errors.pacc && <p>{'Payee Account Number is required'}</p>}
        </div>

        <div className='form-inputs'>
        <label className='form-label'>Payee Account Type</label>
        <input className='form-input' type="text" placeholder="Payee Account Type" name="pacctype" {...register("pacctype", { required: true })}/>
        {errors.pacctype && <p>{'Payee accounis required'}</p>}
        </div>
      
        )

        <button className='form-input-btn' type='submit'>
          Continue
        </button>
        </form>
        </div>
    )
}

export default AddPayee