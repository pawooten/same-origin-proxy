export const defaultOptions = {
    https: {
        key: 'path/to/your/server.key',
        cert: 'path/to/your/server.crt'
    },
    port: 3001,
    secure: true,
    changeOrigin: true,
    target: {
        match: '/PatientWindowDev',
        url: 'http://hyl-cpql6j3'
    },
    emrUrl: 'https://localhost:4000',
};
