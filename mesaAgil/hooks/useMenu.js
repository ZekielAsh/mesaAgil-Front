import { useEffect, useState } from "react";
import { getMenu } from "../services/menuService";

export const useMenu = () => {
  const [menu, setMenu] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenu = async () => {
    try {
      console.log("🔵 Iniciando fetch...");

      setLoading(true);
      setError(null);

      const data = await getMenu();

      console.log("🟢 Respuesta recibida:", data);

      if (data.message) {
        setMessage(data.message);
        setMenu([]);
      } else {
        setMenu(data.items || []);
        setMessage(null);
      }

    } catch (err) {
      console.log("🔴 Error en fetch:", err);
      setError("Error al cargar el menú");
    } finally {
      console.log("🟡 Finalizando fetch");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return {
    menu,
    message,
    loading,
    error,
    refetch: fetchMenu,
  };
};