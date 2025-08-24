module.exports = {
  apps: [{
    name: 'indian-export-website',
    script: 'node',
    args: './server.js',
    cwd: '/home/user/webapp',
    interpreter: 'node',
    env: {
      NODE_ENV: 'development',
      HOST: '0.0.0.0',
      PORT: 5173
    },
    watch: false,
    instances: 1,
    exec_mode: 'fork',
    max_restarts: 10,
    min_uptime: '10s',
    error_file: '/home/user/webapp/logs/error.log',
    out_file: '/home/user/webapp/logs/out.log',
    log_file: '/home/user/webapp/logs/combined.log',
    time: true
  }]
};