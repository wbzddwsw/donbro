import json
import os
import requests

# 加载 JSON 文件
with open("emojis.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# 从中提取 emoji 列表
emoji_list = data.get("emojis", [])

# 筛选 category 为 "catmeme"
target_emojis = [e for e in emoji_list if e.get("category") == "catmeme"]

# 准备保存路径
SAVE_DIR = "emojis"
os.makedirs(SAVE_DIR, exist_ok=True)

# 下载表情包
for emoji in target_emojis:
    name = emoji["name"]
    url = emoji["url"]
    ext = os.path.splitext(url)[-1] or ".png"
    filename = f"{name}{ext}"

    try:
        print(f"Downloading {name}...")
        response = requests.get(url)
        response.raise_for_status()
        with open(os.path.join(SAVE_DIR, filename), "wb") as f:
            f.write(response.content)
    except Exception as e:
        print(f"❌ Failed to download {name}: {e}")

print(f"\n✅ 共下载 {len(target_emojis)} 个表情包，保存在 '{SAVE_DIR}/'")
