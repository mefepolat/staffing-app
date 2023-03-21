export async function getEmployees(){
    try {
        const response = await fetch('http://localhost:5001/api/employees/get', {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        const data = await response.json();
       
        return data.employees;
    } catch (err) {
        console.log(err);
    }
}