import next from "eslint-config-next/core-web-vitals";

const config = [
  { ignores: [".next/**", "node_modules/**"] },
  ...next,
  {
    rules: {
      // Client-only mount detection, data fetching on mount, and form-state
      // sync are intentional patterns in this app; keep them visible but
      // non-blocking.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default config;
