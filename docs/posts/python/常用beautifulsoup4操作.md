---
layout: posts
title: 常用beautifulsoup4操作
date: 2024-01-022 21:52:49
tags:
 - python
categories:
 - python
---

beautifulsoup4是一个轻量级的python库，能够解析html代码，以下是基本使用方法

<!-- more -->

## 基本使用
```python
import requests
from bs4 import BeautifulSoup

url = 'https://a'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
}

response = requests.get(url, headers)
# file.write(soup.prettify())
with open('origin.html', 'w', encoding='utf-8') as file:
    file.write(response.text)

# 解析HTML
soup = BeautifulSoup(response.content, 'html.parser')

s = soup.find('span', class_='DS-EntryPoint1-1')
divs = soup.find_all('div', class_='DS-EntryPoint1-1')
# 遍历找到的div元素
for div in divs:
    # 在每个div中查找所有的span元素
    spans = div.find_all('span')
    if len(spans) >= 2: 
        second_span_content = spans[1].get_text()
        print(second_span_content)
```

## 常用API

- **find()**
作用：查找与指定条件匹配的第一个元素。
用法示例：soup.find('tag_name'), soup.find('tag_name', class_='class_name')

- **find_all()**
作用：查找与指定条件匹配的所有元素。
用法示例：soup.find_all('tag_name'), soup.find_all('tag_name', class_='class_name')

- **select()**
作用：使用CSS选择器查找元素。
用法示例：soup.select('tag_name'), soup.select('.class_name'), soup.select('#id_name')

- **select_one()**
作用：使用CSS选择器查找第一个匹配的元素。
用法示例：soup.select_one('.class_name'), soup.select_one('#id_name')

- **find_parent() / find_parents()**
作用：查找元素的父元素（find_parent）或所有父元素（find_parents）。
用法示例：element.find_parent('tag_name'), element.find_parents('tag_name')

- **find_next_sibling() / find_next_siblings()**
作用：查找元素的下一个兄弟元素（find_next_sibling）或所有后续兄弟元素（find_next_siblings）。
用法示例：element.find_next_sibling('tag_name'), element.find_next_siblings('tag_name')

- **find_previous_sibling() / find_previous_siblings()**
作用：查找元素的上一个兄弟元素（find_previous_sibling）或所有之前的兄弟元素（find_previous_siblings）。
用法示例：element.find_previous_sibling('tag_name'), element.find_previous_siblings('tag_name')

- **find_all_next() / find_next()**
作用：查找元素之后的所有符合条件的元素（find_all_next）或下一个符合条件的元素（find_next）。
用法示例：element.find_all_next('tag_name'), element.find_next('tag_name')

- **find_all_previous() / find_previous()**
作用：查找元素之前的所有符合条件的元素（find_all_previous）或上一个符合条件的元素（find_previous）。
用法示例：element.find_all_previous('tag_name'), element.find_previous('tag_name')
