const BASE_URL:any = import.meta.env.VITE_APP_BASE_API_URL
const TIMEOUT: any = import.meta.env.VITE_APP_API_REQUEST_TIMEOUT
const config = {
    api: {
        baseUrl: BASE_URL,
    },
    request: {
        timeout: TIMEOUT
    }
}

export default config