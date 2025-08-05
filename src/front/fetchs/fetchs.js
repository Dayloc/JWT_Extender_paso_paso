const url_base = 'https://fluffy-guide-pjjvxpj95gqphxvj-3001.app.github.dev/' //process.env.BACKEND_URL

export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${url_base}api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log(data);
    
    localStorage.setItem('token', data.token);

  } catch (error) {
    console.log("Error al obtener el token", error);
  }
}
