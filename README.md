## Initalized Repo

## SETTING UP GITHUB

## Get SSH Key

1.) Generate SSH Key
* ssh-keygen -t ed25519 -C "your_email@example.com"

2.) Copy SSH Key to clipboard
*  clip < ~/.ssh/id_ed25519.pub

3.) Go to GitHub.com -> Your profile -> SSH and GPG keys -> Create new SSH key -> Give key any name -> Copy and paste

## Setting Up Local Repository

1.) Create a directory (folder) you want to work in

2.) Open that folder in your code editor (e.g Microsoft Visual Studio Code)

3.) Create new terminal & navigate to that directory
* cd path/to/your/director

4.) Then paste this command in your terminal
* git clone {INSERT SSH KEY}
* You should see a new folder appear in your workspace titled "teamup-repo"

5.) Change directories into that repository
* cd teamup-repo

## Create Virtual environment

Paste these commands into your terminal
1.) python3 -m venv env 

2.) source env/bin/activate

## Download packages from requirements.txt

1.) pip install -r requirements.txt

## Try running Django

1.) Make migrations
* python manage.py makemigrations

2.) Migrate migrations
* python manage.py migrate

* It should output migrations in terminal

## Download neccessary packages for react

1.) Navigate to frontend directory
* cd frontend

2.) Install packages in package.json by
* npm install


