import { graphConfig } from "./authconfig";

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 */
export const callMsGraph = async (accessToken) => {
    try {
      const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.error.message || 'Unknown error occurred'}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error calling Microsoft Graph:', error);
      throw error;
    }
  };
  