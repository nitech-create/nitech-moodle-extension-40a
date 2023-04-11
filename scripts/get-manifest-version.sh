cat src/manifest.json5 | grep -P 'version\s*:\s*"\d+\.\d+\.\d+[^"]*"' | sed -E 's/^\s*version\s*:\s*"//' | sed -E 's/",?\s*$//'
