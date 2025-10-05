import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getImages = async (token) => {
  return axios.get(`${API_BASE_URL}/images`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export async function deleteImage(id, token) {
  return await fetch(`${API_BASE_URL}/delete-logo/?id=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function uploadLogo(formData, token) {
  return fetch(`${API_BASE_URL}/add-logo/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });
}

export async function createAdmin(email, password, token) {
  return fetch(`${API_BASE_URL}/admin/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ email, password })
  });
}

export async function deleteAdmin(uid, token) {
  return fetch(`${API_BASE_URL}/admin/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ uid })
  });
}

// Exemplo de função fetchAdmins no api.js
export async function fetchAdmins(token) {
  const res = await fetch(`${API_BASE_URL}/admin/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao buscar administradores");
  return await res.json();
}

export async function fetchMarcas(adminUid, token) {
  const res = await fetch(`${API_BASE_URL}/api/marcas?adminUid=${adminUid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao buscar marcas");
  return await res.json();
}