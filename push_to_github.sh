#!/bin/bash
# 1-Click Push script to GitHub
echo "=========================================================="
echo "Pushing to https://github.com/suhadondapati-netizen/JOB.git ..."
echo "=========================================================="

git remote set-url origin https://github.com/suhadondapati-netizen/JOB.git
git branch -M main

echo "Running: git push -u origin main"
git push -u origin main

echo "Done! Check your repository at: https://github.com/suhadondapati-netizen/JOB"
