import math
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 假设你有一组数据如下（这里只示例一部分数据）：
data = [
    {
        "_id": "653f67db3f217091fa001482",
        "openid": "oE5Vi6OB5SEpsJmMbl3Ty0GGK4cA",
        "nickname": "凉城以北",
        "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLrHzzevFf9icDJRWusVlUibRH085C9Jj8z5xvgrl3RdicOggSI0dlndmiarKqVg25BmC0BkhJj2sSrHg/132",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/118.0",
        "ip": "111.74.53.106",
        "create_at": 1698654171
    },
    {
        "_id": "653f67db3f217091fa001482",
        "openid": "oE5Vi6OB5SEpsJmMbl3Ty0GGK4cA",
        "nickname": "凉城以北",
        "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLrHzzevFf9icDJRWusVlUibRH085C9Jj8z5xvgrl3RdicOggSI0dlndmiarKqVg25BmC0BkhJj2sSrHg/132",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/118.0",
        "ip": "111.74.53.106",
        "create_at": 1698654172
    },
    # 添加更多数据...
]

# 计算文本相似性
text_data = [item["nickname"] for item in data]  # 提取所有的nickname
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(text_data)
cosine_similarities = cosine_similarity(tfidf_matrix, tfidf_matrix)

# 计算数值字段相似性
numeric_data = [item["create_at"] for item in data]  # 提取所有的create_at
max_numeric_value = max(numeric_data)
min_numeric_value = min(numeric_data)
numeric_similarities = [1 - (abs(x - y) / (max_numeric_value - min_numeric_value)) for x in numeric_data for y in numeric_data]

# 组合相似性
combined_similarities = []
for i in range(len(data)):
    combined_similarity = cosine_similarities[i] + numeric_similarities[i]
    combined_similarities.append(combined_similarity)

# 找出相似的记录
threshold = 1.5  # 设置相似性阈值，根据具体需求调整
similar_records = []
for i in range(len(data)):
    for j in range(i + 1, len(data)):
        print(combined_similarities[i])
        print(combined_similarities[j])
        if combined_similarities[i] + combined_similarities[j] > threshold:
            similar_records.append((data[i], data[j]))

# 输出相似的记录
for record1, record2 in similar_records:
    print("Similar Records:")
    print(record1)
    print(record2)
    print()