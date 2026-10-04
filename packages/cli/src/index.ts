#!/usr/bin/env node
import { ScaffoldEngine } from "./ScaffoldEngine";

const engine = new ScaffoldEngine();
engine.run(process.argv.slice(2)).catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
