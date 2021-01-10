# !/usr/bin/python3
# -*- coding: utf-8 -*-

import  json
import mitmproxy

test_header = [(b'user-agent', b'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 QBCore/4.0.1301.400 QQBrowser/9.0.2524.400 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat'), (b'accept', b'image/webp,image/*,*/*;q=0.8'), (b'accept-encoding', b'gzip, deflate'), (b'accept-language', b'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.5;q=0.4'), (b'if-none-match', b'"38209FE10F471EA673CFE61F7FAB24D8"'), (b'if-modified-since', b'Mon, 22 Apr 2019 06:52:57 GMT')]

tup = ('physics', 'chemistry')

# print(test_tup)

def del_http_header(head_tuple_obj):
    result_head_str = ""
    for head_tuple in head_tuple_obj:
        sub_head_tmp = ""
        for index in range(len(head_tuple)):
            sub_head_str = bytes.decode(head_tuple[index])
            sub_head_tmp = index == 0 and (sub_head_tmp + sub_head_str + ": ") or (sub_head_tmp + sub_head_str)
        result_head_str = result_head_str + sub_head_tmp + "\n"
    return result_head_str



# print(del_http_header(test_header))


dict = {'Name': 'Zara', 'Age': 7, 'Class': 'First'}
# print(dict["Name"])

# for dic in dict:
#     print(dic)

# test_str = str("hccc")

str_1 = "fsfklsdjlfktext2/html"
str_2 = "text2/"
ret = str_1.find(str_2)
print(ret)

