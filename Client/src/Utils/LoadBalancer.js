/**
 * A simple load balancer simulation for frontend
 */
class LoadBalancer {
  constructor(serverCount = 3, failureRate = 0.2) {
    this.servers = Array(serverCount)
      .fill()
      .map((_, i) => ({
        id: `server-${i + 1}`,
        healthy: true,
        load: 0,
        maxLoad: 10,
      }));
    this.failureRate = failureRate;
    this.requestCounter = 0;
  }

  // Get the server with the least load
  getOptimalServer() {
    const healthyServers = this.servers.filter(
      (server) => server.healthy && server.load < server.maxLoad
    );

    if (healthyServers.length === 0) {
      // All servers are either unhealthy or at max capacity
      // Reset loads to simulate recovery
      this.servers.forEach((server) => {
        server.healthy = true;
        server.load = 0;
      });
      return this.servers[0];
    }

    return healthyServers.reduce(
      (min, server) => (server.load < min.load ? server : min),
      healthyServers[0]
    );
  }

  // Simulate a request to the load balancer
  async makeRequest(requestData, retries = 3) {
    this.requestCounter++;

    return new Promise((resolve, reject) => {
      const server = this.getOptimalServer();
      server.load++;

      // Simulate server processing time
      setTimeout(() => {
        // Simulate random failures
        const failed = Math.random() < this.failureRate;

        if (failed) {
          server.healthy = false;

          if (retries > 0) {
            // Retry with a different server
            console.log(`Request failed on ${server.id}, retrying...`);
            this.makeRequest(requestData, retries - 1)
              .then(resolve)
              .catch(reject);
          } else {
            reject(new Error("All servers failed to process the request"));
          }
        } else {
          // Simulate successful response
          server.load = Math.max(0, server.load - 1);
          resolve({
            success: true,
            serverId: server.id,
            requestId: `req-${this.requestCounter}`,
            data: requestData,
          });
        }
      }, 500 + Math.random() * 1000); // Random processing time between 500-1500ms
    });
  }

  // Get current server status
  getStatus() {
    return {
      servers: this.servers.map((server) => ({
        id: server.id,
        healthy: server.healthy,
        load: server.load,
        loadPercentage: (server.load / server.maxLoad) * 100,
      })),
      totalRequests: this.requestCounter,
    };
  }
}

// Create a singleton instance
const loadBalancer = new LoadBalancer();

export default loadBalancer;
