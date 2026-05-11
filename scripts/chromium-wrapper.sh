#!/usr/bin/env bash
# Wrapper that lets Playwright's bundled Chromium load .so files from the
# project's pixi environment (no system sudo / apt required).
#
# Usage: pass --executable-path <this script> to Playwright (or its MCP).
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PIXI_LIB="${PROJECT_ROOT}/.pixi/envs/default/lib"

if [[ ! -d "${PIXI_LIB}" ]]; then
  echo "chromium-wrapper: pixi env not found at ${PIXI_LIB}" >&2
  echo "Run \`pixi install\` in ${PROJECT_ROOT} first." >&2
  exit 1
fi

# Resolve Playwright Chromium binary. Allow override via env.
CHROMIUM_BIN="${PLAYWRIGHT_CHROMIUM_BIN:-}"
if [[ -z "${CHROMIUM_BIN}" ]]; then
  # Pick the highest-numbered chromium-* under ms-playwright cache.
  CACHE="${HOME}/.cache/ms-playwright"
  CHROMIUM_BIN="$(ls -1d "${CACHE}"/chromium-*/chrome-linux64/chrome 2>/dev/null \
    | sort -V | tail -n1 || true)"
fi

if [[ -z "${CHROMIUM_BIN}" || ! -x "${CHROMIUM_BIN}" ]]; then
  echo "chromium-wrapper: no Playwright Chromium found." >&2
  echo "Run \`npx playwright install chromium\` first," >&2
  echo "or set PLAYWRIGHT_CHROMIUM_BIN to an absolute path." >&2
  exit 1
fi

export LD_LIBRARY_PATH="${PIXI_LIB}${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}"
exec "${CHROMIUM_BIN}" "$@"
