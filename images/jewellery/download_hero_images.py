"""
GoldBazaar — Download Jewellery Hero Images
Run this once from the images/jewellery/ folder:
    cd C:\GoldBazaar\images\jewellery
    python download_hero_images.py

After running, commit everything:
    git add images/jewellery/
    git commit -m "feat: add local jewellery hero images"
    git push
"""

import urllib.request
import os
import sys

SLIDES = [
    ("https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&h=600&fit=crop&crop=center&q=90",  "hero-1.jpg"),
    ("https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&h=600&fit=crop&crop=center&q=90",  "hero-2.jpg"),
    ("https://images.unsplash.com/photo-1617191880362-aac615de3c26?w=1600&h=600&fit=crop&crop=center&q=90",  "hero-3.jpg"),
    ("https://images.unsplash.com/photo-1633934542430-0905ccb5f050?w=1600&h=600&fit=crop&crop=center&q=90",  "hero-4.jpg"),
    ("https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1600&h=600&fit=crop&crop=center&q=90",  "hero-5.jpg"),
    ("https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1600&h=600&fit=crop&crop=center&q=90",  "hero-6.jpg"),
    ("https://images.pexels.com/photos/32797479/pexels-photo-32797479.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop", "hero-7.jpg"),
    ("https://images.pexels.com/photos/28939437/pexels-photo-28939437.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop", "hero-8.jpg"),
]

out_dir = os.path.dirname(os.path.abspath(__file__))
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

print(f"Downloading to: {out_dir}\n")
ok = 0
for url, fname in SLIDES:
    dest = os.path.join(out_dir, fname)
    if os.path.exists(dest) and os.path.getsize(dest) > 10000:
        print(f"  skip  {fname}  (already exists)")
        ok += 1
        continue
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
        with open(dest, "wb") as f:
            f.write(data)
        print(f"  ✓  {fname}  ({len(data)//1024} KB)")
        ok += 1
    except Exception as e:
        print(f"  ✗  {fname}  FAILED: {e}")

print(f"\n{ok}/{len(SLIDES)} images downloaded.")
if ok == len(SLIDES):
    print("\nAll done! Now run:\n  git add images/jewellery/\n  git commit -m \"feat: add local jewellery hero images\"\n  git push")
else:
    print("\nSome images failed. Check your internet connection and try again.")
