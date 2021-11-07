module.exports = {
  apps : [{
    name: 'fork',
    script: 'dist/index.js',
    watch: true,
    autorestart: true,
    args: '--puerto=8081',
    },
  {
    name: 'cluster',
    script: 'dist/index.js',
    watch: true,
    autorestart: true,
    args: '--puerto=8082'

  }
],
};
