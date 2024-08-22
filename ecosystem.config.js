module.exports = {
  apps: [
    {
      name: 'telegram-bot',
      script: 'main.ts',
      interpreter: 'ts-node', 
      instances: 1,
      autorestart: true,
      watch: false, // Pode habilitar watch para reiniciar automaticamente ao mudar arquivos
      max_memory_restart: '1G', // Reinicia se usar mais de 1GB de RAM
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
