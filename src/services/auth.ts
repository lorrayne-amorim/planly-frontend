export function saveToken(token: string) {
    localStorage.setItem("token", token);
}

export function getToken(): string | null {
    return localStorage.getItem("token");
}

export function isLoggedIn(): boolean {
    return !!getToken();
}

export function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
}
