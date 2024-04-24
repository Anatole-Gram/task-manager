
export const useApiUrl = () => process.client ? 'http://project-lucy.ru/api/' : 'http://localhost:3000/api/'
export const useUrl = () => process.client ? `http://project-lucy.ru/` : `http://localhost:3000/`