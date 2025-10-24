#!/bin/bash

# --- Configuration ---
# Detect package manager
if [ -f "yarn.lock" ]; then
    PACKAGE_MANAGER="yarn"
elif [ -f "package-lock.json" ]; then
    PACKAGE_MANAGER="npm"
else
    echo "Error: Neither yarn.lock nor package-lock.json found. Please run this script in the root of a React Native project."
    exit 1
fi

echo "--- Starting React Native Clean Build Script ---"
echo "Detected package manager: $PACKAGE_MANAGER"
echo "------------------------------------------------"

# --- 1. Clean Caches ---
echo "=> 1/4: Clearing Watchman and Metro Bundler caches..."
watchman watch-del-all
# $PACKAGE_MANAGER start -- --reset-cache

# --- 2. Node Modules ---
echo "=> 2/4: Removing and reinstalling Node Modules..."
rm -rf node_modules package-lock.json
$PACKAGE_MANAGER install --legacy-peer-deps

# --- 3. iOS Cleanup (CocoaPods) ---
echo "=> 3/4: Cleaning iOS native dependencies (Pods) and Xcode DerivedData..."

# Clean iOS Pods
if [ -d "ios" ]; then
    cd ios
    echo "   -> Removing Pods directory and Podfile.lock..."
    rm -rf Pods
    rm -f Podfile.lock
    cd ..

    Reinstall Pods
    if command -v pod &> /dev/null; then
        echo "   -> Reinstalling Pods..."
        npx pod-install ios || (cd ios && pod install && cd ..)
    else
        echo "   -> Warning: 'pod' command not found. Skipping Pod reinstall. You may need to run 'npx pod-install' manually."
    fi
else
    echo "   -> iOS directory not found. Skipping iOS cleanup."
fi

# Clean Xcode Derived Data
echo "   -> Removing Xcode DerivedData (global cache for compiled projects)..."
rm -rf ~/Library/Developer/Xcode/DerivedData/*


# --- 4. Android Cleanup (Gradle) ---
echo "=> 4/4: Cleaning Android build cache (Gradle)..."
if [ -d "android" ]; then
    cd android
    echo "   -> Running 'gradlew clean'..."
    # Use ./gradlew for Linux/Mac and gradlew.bat for Windows (basic check)
    if [ -f "gradlew" ]; then
        ./gradlew clean
    elif [ -f "gradlew.bat" ]; then
        ./gradlew.bat clean
    else
        echo "   -> Warning: gradlew executable not found. Skipping Android clean."
    fi
    cd ..
else
    echo "   -> Android directory not found. Skipping Android cleanup."
fi

echo "------------------------------------------------"
echo "✨ React Native project is clean and ready for a fresh build on the new branch! ✨"
echo "You can now run '$PACKAGE_MANAGER run android' or '$PACKAGE_MANAGER run ios'."
