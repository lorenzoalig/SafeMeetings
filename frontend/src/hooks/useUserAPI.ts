import { useState } from "react";
import { NewUser, User } from "../pages/UserList/UserList";

export interface LoginRequestBody {
  email: string;
  password: string;
}

const BASE_URL = "http://localhost:3000";

const useUserAPI = () => {
  console.log("useUserAPI");
  const [error, setError] = useState<string | null>(null);

  const postLogin = async (body: LoginRequestBody) => {
    setError(null);
    
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      
      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      const data = await response.json();
      return data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const createUser = async (body: NewUser) => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar usuário");
      }

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const editUser = async (body: User) => {
    setError(null);
    // create new body without id;
    const { id, ...newBody } = body;

    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token") || ""
        },
        body: JSON.stringify(newBody),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar usuário");
      }

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const getUsers = async () => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/users`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token") || ""
        }
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const deleteUser = async (id: string | number) => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar usuário");
      }

      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const getUsersPDF = async () => {
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/pdf-report`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token") || ""
        }
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar o relatório");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `users_report.pdf`);
      document.body.appendChild(link);
      link.click();

      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }

      // Liberar URL para evitar vazamento de memória
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      // Asserção de tipo para garantir que error tem a propriedade message
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error");
      }
      return null;
    }
  };

  const getBadgeByUserId = async (id: string) => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/badge/${id}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token") || ""
        }
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar badge");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `badge_user_${id}.pdf`);
      document.body.appendChild(link);
      link.click();

      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }

      // Liberar URL para evitar vazamento de memória
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      // Asserção de tipo para garantir que error tem a propriedade message
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error");
      }
      return null;
    }
  };

  const getUserById = async (id: string) => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/users/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar usuário");
      }

      const data = await response.json();     // response.blob();?????
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  return {
    postLogin,
    error,
    getUsers,
    createUser,
    editUser,
    deleteUser,
    getUsersPDF,
    getBadgeByUserId,
    getUserById,
  };
};

export default useUserAPI;
