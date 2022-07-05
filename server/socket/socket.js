let io;

module.exports = {
  init: (httpServer) => {
    return (io = require('socket.io')(httpServer, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
      },
    }));
  },

  getIO: () => {
    if (!io) {
      throw new Error('Socket.io is not initialized');
    }
    return io;
  },
};
