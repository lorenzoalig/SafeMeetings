import { useState } from "react";

export type Place = {
  id: string;
  description: string;
  acessLevel: string;
};

export type PlaceNoId = Omit<Place, "id">;

const BASE_URL = "http://localhost:3000";

const usePlaceAPI = () => {
  const [error, setError] = useState<string | null>(null);

  const getPlaces = async () => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/places`, {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoibG9yZW56by5nb25jYWx2ZXNAZWR1LnB1Y3JzLmJyIiwiaWF0IjoxNzYxMjE2NTc4LCJleHAiOjE3NjEyMjAxNzh9.VhcFGhUkhCsJz1_vZJ73qe6K-C6nFy3yvakEUOJSs4A",
        }});

      if (!response.ok) {
        throw new Error("Erro ao buscar locais");
      }

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const createPlace = async (place: PlaceNoId) => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/places`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar local");
      }

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const editPlace = async (place: Place) => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/places/${place.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar local");
      }

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const deletePlace = async (id: string) => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/places/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar local");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };

  return {
    error,
    getPlaces,
    createPlace,
    editPlace,
    deletePlace,
  };
};

export default usePlaceAPI;
