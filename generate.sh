#!/bin/bash

# Setup
# https://github.com/google/libphonenumber/tree/master/javascript

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

function printMsg {
    msg=$1
    color=$2

    echo -e "${color}${msg}${NC}"
}

printMsg "Setup according to https://github.com/google/libphonenumber/tree/master/javascript" $BLUE

closure_compiler_jar="closure-compiler-v20210302.jar"
repos=(libphonenumber closure-library closure-linter.git python-gflags.git)
api_commit=$(git rev-parse HEAD 2>/dev/null)

mkdir -p build
cd build

for repo in "${repos[@]}"; do
    dir_name=${repo%.*}
    if [ ! -d "$dir_name" ]; then
        git clone "https://github.com/google/${repo}"
    fi
done

if [ ! -f $closure_compiler_jar ]; then
    printMsg "Downloading closure compiler v20210302" $BLUE
    curl -OJ "https://repo1.maven.org/maven2/com/google/javascript/closure-compiler/v20210302/${closure_compiler_jar}"
fi

cd closure-library
printMsg "Checking out closure library v20201006" $BLUE
git checkout 2a3799144c3e6c83678018d29e1b80071f5c07b4
cd ..

printMsg "Replacing libphonenumber/javascript/i18n/phonenumbers/demo.js with our library - api.js" $BLUE
cp ../api.js libphonenumber/javascript/i18n/phonenumbers/demo.js
cd libphonenumber
printMsg "Pulling latest changes in libphonenumber" $BLUE
git pull
libphone_commit=$(git rev-parse HEAD)

should_tweak=$(grep "compiler_unshaded_deploy.jar" javascript/build.xml)
if [ -n "$should_tweak" ]; then
    printMsg "Tweaking libphonenumber/javascript/build.xml" $BLUE
    sed -i '' '/name="closure-compiler.dir"/,+3 d' javascript/build.xml
    sed -i '' 's/ADVANCED_OPTIMIZATIONS/SIMPLE_OPTIMIZATIONS/' javascript/build.xml
    awk 'NR==4{print "<property name=\"closure-compiler.jar\"\n\tvalue=\"${basedir}/../../closure-compiler-v20210302.jar\"/>"}1' javascript/build.xml > build-tmp && mv build-tmp javascript/build.xml
fi

printMsg "Compiling..." $BLUE
res=$(ant -f javascript/build.xml compile-demo)
success=$(echo "$res" | grep -i "BUILD SUCCESSFUL")
if [ -n "$success" ]; then 
    cp javascript/i18n/phonenumbers/demo-compiled.js ../libphonenumber.js

    awk -vlibphone_com="$libphone_commit" -vapi_com="$api_commit" \
    'NR==2{print "libphonenumber commit: "libphone_com"\napi.js commit: "api_com}1' \
     ../libphonenumber.js > ../.out-tmp && mv ../.out-tmp ../libphonenumber.js

    printMsg "Success! Produced build/libphonenumber.js." $GREEN
else 
    printMsg "Error" $RED
    echo "$res"
fi

cd ../..