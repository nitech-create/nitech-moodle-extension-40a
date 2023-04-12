# Check if the version set in manifest.json5 matches the one of the CLI argument
# useage: bash check-version.sh v1.0.0

manifest_version=$(sh $(dirname $0)/get-manifest-version.sh)
if [ "$manifest_version" != $(echo "$1" | sed -E 's/^v?//') ]; then
  echo "The version ($1) does not matchese to the one in manifest file ($manifest_version)." 1>&2
  exit 1
fi
