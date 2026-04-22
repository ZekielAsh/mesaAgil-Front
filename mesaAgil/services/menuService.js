import API_URL from "../constants/api";

export const getMenu = async () => {
  const response = await fetch(`${API_URL}/menu`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });

  console.log("STATUS:", response.status);

  if (!response.ok) {
    throw new Error("Error en la respuesta");
  }

  return await response.json();
};