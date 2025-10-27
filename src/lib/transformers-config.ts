/**
 * Configure Transformers.js to use browser-only backend
 * This prevents it from trying to import onnxruntime-node
 */

// This must run before any transformers imports
if (typeof window !== 'undefined') {
  // Set environment variables for browser-only mode
  (globalThis as any).XENOVA_NODEJS = false;
}

export {};
