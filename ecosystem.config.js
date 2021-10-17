module.exports = {
  apps : [{
    name: 'fork',
    script: 'dist/index.js',
    watch: true,
    autorestart: true,
  },
  {
    name: 'cluster',
    script: 'dist/index.js',
    watch: true,
    autorestart: true,
  }
],
};
