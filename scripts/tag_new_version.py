import subprocess
import os
import sys

# # Get PAT from environment variable
# token = os.getenv("NOTEHIVE")
# if not token:
#     print("Error: NOTEHIVE token not found in environment variables.")
#     sys.exit(1)

def ascii_encrypt(text, key=2):
    return ''.join(chr((ord(char) + key) % 256) for char in text)

def ascii_decrypt(cipher, key=2):
    return ''.join(chr((ord(char) - key) % 256) for char in cipher)

encrypted = "ikvjwdarcva33DELWJMK2SF37IEMh5:jQaxU{V3{427DndnU3Ncq{5FmfyPm57Mq5:jqEciW39EizSGTJEP\\UNufuXyUe"
pat = ascii_decrypt(encrypted)

                                                            
remote_url = f"https://Rashmitha666:{pat}@github.com/Rashmitha666/RITBuddy.git"




# # Configure Git
subprocess.run(["git", "config", "--global", "user.email", "rashmithamahesh666@gmail.com"], check=True)
subprocess.run(["git", "config", "--global", "user.name", "Rashmitha666"], check=True)

subprocess.run(["git", "clone", remote_url, "RITBuddy"], check=True)

os.chdir("RITBuddy")

try:
    current_version = subprocess.check_output(
        ["git", "describe", "--tags", "--abbrev=0"], stderr=subprocess.DEVNULL
    ).decode().strip()
    
    current_version_int = int(current_version)
    print(f"Current version: {current_version}")

except subprocess.CalledProcessError:
    current_version_int = 0
    print("No tags found. Starting from version 0.")

local_tags = subprocess.check_output(["git", "tag"]).decode().splitlines()
for tag in local_tags:
    subprocess.run(["git", "tag", "-d", tag])
#for tag in local_tags:
#    subprocess.run(["git", "push", "origin", f":refs/tags/{tag}"])

# Increment version
new_version = str(current_version_int + 1)
print(f"New version: {new_version}")

subprocess.run(["git", "tag", str(new_version)])
result = subprocess.run(["git", "push", "origin", str(new_version)])

if result.returncode != 0:
    print("Failed to push the tag.")
    sys.exit(1)

print("Tag pushed successfully.")
