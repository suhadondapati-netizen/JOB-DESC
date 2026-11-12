@echo off
echo ==========================================================
echo Pushing AI-Based Job Recommendation System to GitHub...
echo Target Repo: https://github.com/suhadondapati-netizen/JOB.git
echo ==========================================================

git remote set-url origin https://github.com/suhadondapati-netizen/JOB.git
git branch -M main

echo Running: git push -u origin main
echo (If prompted, sign in via browser or paste your Personal Access Token)
git push -u origin main

echo.
echo Done! Check your repository at: https://github.com/suhadondapati-netizen/JOB
pause
