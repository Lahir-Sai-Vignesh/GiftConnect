const urlConfig = {
    backend_url : process.env.REACT_APP_BACKEND_URL
}
console.log(`React Backend Url: ${urlConfig.backend_url}`);
export default urlConfig;

// Create React App (CRA) has built-in support for loading environment variables from .env files,
// but they must be prefixed with REACT_APP_ to be accessible within your application.