manifest_version="$(sh $(dirname $0)/get-manifest-version.sh)"

api_endpoint="https://api.github.com/repos/nitech-create/nitech-moodle-extension-40a/releases/latest"
release_version=$(curl -sSL -H "Accept: application/vnd.github+json" $api_endpoint \
    | jq ".tag_name" | sed -E 's/^"v?//' | sed -E 's/"$//')

# semver
semver_tempfile=$(mktemp)
curl -sSL "https://raw.githubusercontent.com/parleer/semver-bash/master/semver" > $semver_tempfile
source $semver_tempfile

if $(semverGT "$manifest_version" "$release_version"); then
    exit 0
else
    echo "The version in manifest file ($manifest_version) is less or equals to latest release ($release_version)"
    exit 1
fi
