export async function addAvailability(session, shift, date) {
    const user = session.user;
  try {
    const response = await fetch("http://localhost:5001/api/availability/add", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user,shift,date})
    });
    
    return response;
  } catch (err) {
    console.log(err);
  }
}
