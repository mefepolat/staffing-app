export async function updateAvailability(session, shift, eventId) {
  const user = session.user;
  try {
    const response = await fetch(
      "http://localhost:5001/api/availability/update",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, shift, eventId }),
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}
