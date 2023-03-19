export async function getAvailability(session){
    
    const user = session.user;
    
    try{
        const response = await fetch('http://localhost:5001/api/availability/get', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({user})
            
        })
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}