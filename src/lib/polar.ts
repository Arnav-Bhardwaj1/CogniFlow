import { Polar } from "@polar-sh/sdk";

let polarInstance: Polar | null = null;

const getPolarClient = () => {
  if (!polarInstance) {
    polarInstance = new Polar({
      accessToken: process.env.POLAR_ACCESS_TOKEN,
      server: "sandbox"
    });
  }
  return polarInstance;
};

export const polarClient = new Proxy({} as Polar, {
  get: (target, prop) => {
    const instance = getPolarClient();
    const value = instance[prop as keyof Polar];
    return typeof value === 'function' ? value.bind(instance) : value;
  }
});