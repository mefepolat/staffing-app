import * as yup from 'yup';

export async function updateEmployee(id, phoneNumber, email){
    const updateEmployeeSchema = yup.object().shape({
        phoneNumber: yup.string().matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/gm).required('Phone Number is required'),
        email: yup.string().email().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gmi).required('Email is required')
      })
      try {
        await updateEmployeeSchema.validate({phoneNumber: phoneNumber, email: email})
    } catch(error) {
        console.log(error.message)
        return;
    }
    try{
        const response = await fetch('http://localhost:5001/api/employees/update', {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({id,phoneNumber, email})
        })

        return response;
    } catch (err) {
        console.log(err);
    }
}