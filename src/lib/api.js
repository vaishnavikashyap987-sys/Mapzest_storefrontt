import { getAuth } from 'firebase/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Generic fetch wrapper with Firebase Auth Token
 */
const authenticatedFetch = async (endpoint, options = {}) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        throw new Error('User not authenticated');
    }

    const token = await user.getIdToken();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'API Request Failed');
    }

    return response.json();
};

export const api = {
    // Get Usage Stats & Quota Limits
    getUsage: () => authenticatedFetch('/data/usage'),

    // Get List of User Files
    getFiles: () => authenticatedFetch('/data/files'),

    // Upload File (Multipart)
    uploadFile: async (file) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');
        const token = await user.getIdToken();

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/data/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                // No Content-Type header; fetch sets it for FormData
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Upload Failed');
        }
        return response.json();
    },

    // Delete File
    deleteFile: (id) => authenticatedFetch(`/data/${id}`, { method: 'DELETE' }),

    // Download File
    downloadFile: async (id, filename) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');
        const token = await user.getIdToken();

        const response = await fetch(`${API_BASE_URL}/data/${id}/download`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Download Failed');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename; // Suggest filename
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    }
};
