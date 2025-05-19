import requests
import time

pages = ["/a", "/", "/baked-goods", "/contact", "/checkout"]

def test(url):
    response = requests.get(url)
    if response.ok:
        print(f"{url} returned {response.status_code}")
    else:
        print(f"{url} failed with {response.status_code}")

time.sleep(45)

while True:
    for page in pages:
        test(f"https://lindsayssweettreats.com{page}")
    time.sleep(600)
