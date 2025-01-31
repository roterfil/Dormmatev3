// src/lib/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Content_Type': 'multi-part'
  },
});

// --- Authentication ---
export const login = async (username, password) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};

// --- User ---
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const getUserByUsername = async (username) => {
  const response = await api.get(`/users/byUsername/${username}`);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};
export const createUser = async (userData, unitId) => {
    const response = await api.post(`/users?unitId=${unitId}`, userData);
    return response.data;
}

// --- Unit ---
export const getUnits = async () => {
  const response = await api.get('/units');
  return response.data;
};

export const getUnitById = async (unitId) => {
  const response = await api.get(`/units/${unitId}`);
  return response.data;
};

export const createUnit = async (unitData) => {
  const response = await api.post('/units', unitData);
  return response.data;
};

export const updateUnit = async (unitId, unitData) => {
  const response = await api.put(`/units/${unitId}`, unitData);
  return response.data;
};

export const deleteUnit = async (unitId) => {
  const response = await api.delete(`/units/${unitId}`);
  return response.data;
};

// --- Payment ---
export const getPayments = async () => {
  const response = await api.get('/payments');
  return response.data;
};

export const getPaymentById = async (paymentId) => {
  const response = await api.get(`/payments/${paymentId}`);
  return response.data;
};

export const createPayment = async (paymentData, tenantId) => {
    const response = await api.post(`/payments?tenantId=${tenantId}`, paymentData);
    return response.data;
};
export const updatePayment = async (paymentId, paymentData) => {
  const response = await api.put(`/payments/${paymentId}`, paymentData);
  return response.data;
};
export const deletePayment = async (paymentId) => {
  const response = await api.delete(`/payments/${paymentId}`);
  return response.data;
};
export const getPaymentsByTenantId = async (tenantId) => {
    const response = await api.get(`/payments/tenant/${tenantId}`);
    return response.data;
};

export async function uploadPaymentProof(formData, tenantId, paymentDetails) {
  formData.append('tenantId', tenantId);
  formData.append('amount', paymentDetails.amount);
  formData.append('paymentDate', paymentDetails.paymentDate);
  formData.append('dueDate', paymentDetails.dueDate);

  const response = await fetch('http://localhost:8080/api/payments/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload payment proof');
  }

  return response.json();
}

export async function uploadMaintenanceProof(formData, userId, maintenanceDetails) {
  try {
    // Format the date to match what the backend expects
    const formattedDate = maintenanceDetails.requestDate.substring(0, 19); // Remove the milliseconds and timezone
    
    formData.append('tenantId', userId);
    formData.append('unitId', maintenanceDetails.unitId);
    formData.append('description', maintenanceDetails.description);
    formData.append('requestDate', formattedDate);
    
    // Rename the file field from 'proofOfDamage' to 'image'
    const imageFile = formData.get('proofOfDamage');
    formData.delete('proofOfDamage');
    formData.append('image', imageFile);

    const response = await fetch('http://localhost:8080/api/maintenance-requests/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to upload maintenance request');
    }

    return response.json();
  } catch (error) {
    console.error('Error uploading maintenance request:', error);
    throw error;
  }
}

export async function getTenantPayments(tenantId) {
  const response = await fetch(`http://localhost:8080/api/payments/tenant/${tenantId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch payments');
  }
  return response.json();
}

// --- Announcement ---
export const getAnnouncements = async () => {
  const response = await api.get('/announcements');
  return response.data;
};

export const getAnnouncementById = async (announcementId) => {
  const response = await api.get(`/announcements/${announcementId}`);
  return response.data;
};

export const createAnnouncement = async (announcementData, userId) => {
    const response = await api.post(`/announcements?userId=${userId}`, announcementData);
    return response.data;
};

export const updateAnnouncement = async (announcementId, announcementData) => {
  const response = await api.put(`/announcements/${announcementId}`, announcementData);
  return response.data;
};

export const deleteAnnouncement = async (announcementId) => {
  const response = await api.delete(`/announcements/${announcementId}`);
  return response.data;
};

// --- MaintenanceRequest ---
export const getMaintenanceRequests = async () => {
  const response = await api.get('/maintenance-requests');
  return response.data;
};

export const getMaintenanceRequestById = async (requestId) => {
  const response = await api.get(`/maintenance-requests/${requestId}`);
  return response.data;
};

export const createMaintenanceRequest = async (requestData, tenantId, unitId) => {
    const response = await api.post(`/maintenance-requests?tenantId=${tenantId}&unitId=${unitId}`, requestData);
    return response.data;
};

export const updateMaintenanceRequest = async (requestId, requestData) => {
  const response = await api.put(`/maintenance-requests/${requestId}`, requestData);
  return response.data;
};
export const deleteMaintenanceRequest = async (requestId) => {
  const response = await api.delete(`/maintenance-requests/${requestId}`);
  return response.data;
};
export default api;