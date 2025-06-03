import subprocess
import os
import sys

def ascii_encrypt(text, key=2):
    return ''.join(chr((ord(char) + key) % 256) for char in text)

def ascii_decrypt(cipher, key=2):
    return ''.join(chr((ord(char) - key) % 256) for char in cipher)

pat = os.getenv("PAT")
if not pat:
    print("Error: PAT environment variable missing")
    sys.exit(1)

remote_url = f"https://{pat}@github.com/Rashmitha666/RITBuddy.git"

# Configure Git user
subprocess.run(["git", "config", "user.email", "rashmithamahesh666@gmail.com"], check=True)
subprocess.run(["git", "config", "user.name", "Rashmitha666"], check=True)

# Set remote URL with token for authentication
subprocess.run(["git", "remote", "set-url", "origin", remote_url], check=True)

try:
    # Get latest tag version number
    current_version = subprocess.check_output(
        ["git", "describe", "--tags", "--abbrev=0"], stderr=subprocess.DEVNULL
    ).decode().strip()
    current_version_int = int(current_version)
    print(f"Current version: {current_version}")

except subprocess.CalledProcessError:
    current_version_int = 0
    print("No tags found. Starting from version 0.")

# Delete all local tags
local_tags = subprocess.check_output(["git", "tag"]).decode().splitlines()
for tag in local_tags:
    subprocess.run(["git", "tag", "-d", tag], check=True)

# Optional: Delete remote tags (comment if you don't want this)
# for tag in local_tags:
#     subprocess.run(["git", "push", "origin", f":refs/tags/{tag}"], check=True)

# Increment version
new_version = str(current_version_int + 1)
print(f"New version: {new_version}")

# Create new tag
subprocess.run(["git", "tag", new_version], check=True)

# Push new tag
result = subprocess.run(["git", "push", "origin", new_version])
if result.returncode != 0:
    print("Failed to push the tag.")
    sys.exit(1)

print("Tag pushed successfully.")
