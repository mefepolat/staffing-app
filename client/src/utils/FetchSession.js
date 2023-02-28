export async function fetchSession() {
    const response = await fetch("http://localhost:5001/api/session", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data)
    return data.user;
  }