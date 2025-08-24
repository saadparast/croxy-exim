module.exports = {
  apps: [
    {
      name: 'croxy-frontend',
      script: 'npx',
      args: 'vite --host 0.0.0.0 --port 5173',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'development'
      },
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 1000
    },
    {
      name: 'croxy-backend',
      script: 'server.js',
      cwd: '/home/user/webapp/backend',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 1000
    }
  ]
};