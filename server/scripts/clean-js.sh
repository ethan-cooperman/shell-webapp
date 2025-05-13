# scripts/clean-js.sh

#!/bin/bash

# Specify the folder to clean
TARGET_FOLDER="dist"

# Check if the folder exists
if [ -d "$TARGET_FOLDER" ]; then
  # Delete all contents inside the folder but keep the folder itself
  rm -rf "$TARGET_FOLDER"/*
  echo "Deleted all contents of $TARGET_FOLDER but kept the folder"
else
  echo "Folder $TARGET_FOLDER does not exist"
fi
