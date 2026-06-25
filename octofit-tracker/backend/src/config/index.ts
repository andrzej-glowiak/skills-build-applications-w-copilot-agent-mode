export const getMongoDBConnectionString = (): string => {
  const mongoHost = process.env.MONGODB_HOST || 'localhost';
  const mongoPort = process.env.MONGODB_PORT || '27017';
  const dbName = 'octofit_db';

  return `mongodb://${mongoHost}:${mongoPort}/${dbName}`;
};

export const getBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export const PORT = process.env.PORT || 8000;
