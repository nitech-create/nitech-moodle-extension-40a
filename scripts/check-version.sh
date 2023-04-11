manifest_version=`sh ./scripts/get-manifest-version.sh`
if [ "v$manifest_version" != "$1" ]; then
  echo "The version ($1) does not matchese to the one in manifest file ($manifest_version)."
  exit 1
fi
