@echo off
echo ========================================
echo Frenchkiss Boutique - GitHub Setup
echo ========================================
echo.

echo Initializing Git repository...
git init

echo.
echo Adding all files to Git...
git add .

echo.
echo Creating initial commit...
git commit -m "Initial commit: Frenchkiss Boutique luxury fashion website"

echo.
echo Adding GitHub remote...
git remote add origin https://github.com/fabber04/frenchkiss-boutique.git

echo.
echo Setting main branch...
git branch -M main

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Create repository on GitHub.com named "frenchkiss-boutique"
echo 2. Run: git push -u origin main
echo 3. Go to repository Settings ^> Pages
echo 4. Select "Deploy from a branch" ^> "main" ^> "/ (root)"
echo 5. Your site will be live at: https://fabber04.github.io/frenchkiss-boutique
echo.
echo Press any key to continue...
pause > nul
