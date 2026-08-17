const API_BASE = "/api/v1";

async function fetchCustom(endpoint, options = {}, noRefresh=false) {
  const accessToken = localStorage.getItem("accessToken");
  
  //* Inseriamo headers Content Type e Bearer se abbiamo accessToken
  const config = {
    ...options,
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  };

  //* Fetch iniziale a /endpoint
  let resIniziale = await fetch(`${API_BASE}${endpoint}`, config);

  //* Gestione refreshToken
  if (resIniziale.status == 401 && !noRefresh) {
    try {
      const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
        method: "POST",
        credentials: "include", //includere cookie refreshToken
      });
    
      //* Se refresh va in errore... slogga utente
      const refreshData = await refreshRes.json();
      if (!refreshRes.ok)
        throw new Error(refreshData.message || "Refresh dell'accessToken non riuscito.");
      
      //* Se refresh tutto ok... set localStore nuovo accessToken
      const newAccessToken = refreshData.accessToken;
      localStorage.setItem("accessToken", newAccessToken);

      //* Riprova richiesta iniziale con nuovo accessToken
      config.headers.Authorization = `Bearer ${newAccessToken}`
      resIniziale = await fetch(`${API_BASE}${endpoint}`, config);

    } catch (refreshErr) {
        localStorage.removeItem("accessToken")
        window.location.reload()
        throw refreshErr;
    }
  }

  //* Gestione altri errori della richiesta iniziale
  const data = await resIniziale.json();
  if (!resIniziale.ok) throw new Error(data.message || "Errore del server");
  return data;
}

export async function loginAPI(email, password){
    return fetchCustom("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email, password
        })
    }, true)
}

export async function registerAPI(username, email, password){
    return fetchCustom("/auth/register", {
        method: "POST",
        body: JSON.stringify({
            username, email, password
        })
    }, true)
}

export async function logoutAPI(){
    return fetchCustom("/auth/logout", {
        method: "POST"
    })
}

export async function updateProfileAPI(username, email, password){
  return fetchCustom("/auth/profile", {
    method: "PUT",
    body: JSON.stringify({username:username, email:email, password:password})
  })
}

export async function createLobbyAPI(){
  return fetchCustom('/lobbies', {
    method: "POST"
  })
}

export async function getPublicLobbiesAPI(){
  return fetchCustom('/lobbies/public', {
    method: "GET",
  })
}
