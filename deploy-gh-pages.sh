#!/bin/bash
# Gera o build e faz deploy do dist para a branch gh-pages

npm run build || exit 1

git checkout --orphan gh-pages
git reset --hard
rm -rf * .gitignore
cp -r dist/* .
git add .
git commit -m "Deploy para GitHub Pages"
git push origin gh-pages --force
git checkout main
