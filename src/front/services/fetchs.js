const url_base = 'https://fluffy-guide-pjjvxpj95gqphxvj-3001.app.github.dev/' //process.env.BACKEND_URL

export const login = async ({ email, password, dispatch }) => {
  try {
    const resp = await fetch(`${url_base}api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await resp.json();

    if (resp.ok) {
      localStorage.setItem("token", data.token);
      dispatch({ type: "save_token", payload: data.token });
      return { ok: true, user: data.user }; // ✅ Devuelve algo
    } else {
      return { ok: false, message: data.message }; // ✅ También aquí
    }
  } catch (err) {
    console.error("Error en login:", err);
    return { ok: false, message: "Error inesperado" }; // ✅ Y también aquí
  }
};

export const Register_end = async (email, password) => {
  try {
    const response = await fetch(`${url_base}api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log(data);


//Este retorno es para que desde el componente sepamos si la respuesta estuvo correcta
    return {
      ok: true,
      data: data
    };


  } catch (error) {
    console.log("Error:", error);
    return {
      ok: false,
      data: { message: "Error en la solicitud" }
    };
  }
};


// ahora tenemos que implementar el fetch del profile
export const getProfile = async (token) => {
  try {
    const response = await fetch("https://fluffy-guide-pjjvxpj95gqphxvj-3001.app.github.dev/api/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    console.log("Respuesta del backend:", data);

    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    return null;
  }
};
