export async function addAvailability(user, shift, date) {

  try {
    const response = await fetch("http://localhost:5001/api/availability/add", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Policy": "application/json",
      },
      body: JSON.stringify({user, shift, date})
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}
