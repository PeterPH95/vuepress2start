---
title: 数据库基础操作
sidebar: auto
---

# 数据库学习笔记

## 数据库关键词顺序
- sql中关键字出现的顺序是：`select/from/wshere/group by/having/order by/limit`
- [参考](https://blog.csdn.net/qq_26442553/article/details/79467243)

```sql
SELECT DISTINCT <select_list>
FROM <left_table>
<join_type> JOIN <right_table>
ON <join_condition>
WHERE <where_condition>
GROUP BY <group_by_list>
HAVING <having_condition>
ORDER BY <order_by_condition>
LIMIT <limit_number>
```


## 基础指令

### `SELECT`
- `distinct`去重, `as`改名
- 函数：`sum()`(求和),`max(price)`(最大值),`avg(price)`(均值),`*`(乘法)
- `count(*)`(所有记录)/`count(列)`(列中非空记录),`substring()`(字符串字串)
```sql
-- 去重
select distinct university from user_profile
select university from user_profile group by university
-- 改名
select university as college
-- 求和
select sum(quantity) as items_ordered
from OrderItems
-- 打折（乘法）
select prod_price,prod_price * 0.9 as sale_price
from Products 
-- 最大值（确定 Products 表中价格不超过 10 美元的最贵产品的价格（prod_price））
select max(prod_price) max_price
from Products
where prod_price <= 10
-- 计数（返回每个订单号（order_num）各有多少行数（order_lines））
select order_num,count(*) as order_lines
from OrderItems
group by order_num
```


### `JOIN ... ON`
- 内联结，多表联结
```sql
-- 方法一：将Customers和Orders联结一起
select cust_name,order_num
from Customers
INNER JOIN Orders ON Orders.cust_id=Customers.cust_id
order by cust_name,order_num;

-- 方法二：使用where进行联结
select cust_name,order_num
from Customers,Orders
where Customers.cust_id=Orders.cust_id
order by cust_name,order_num;

-- 三表联结查询
select c.cust_name,os.order_num,sum(os.quantity*os.item_price) OrderTotal 
from Orders o
-- 联结表二 OrderItems
join OrderItems os
on os.order_num=o.order_num
-- 联结表三 Customers
join Customers c
on c.cust_id=o.cust_id

group by c.cust_name,os.order_num
order by c.cust_name,os.order_num;
```


### `WHERE`
- `null`,`like`,`in`,`=`,`>=`,`<=`,`!=`,`between a and b`,`or`的用法
```sql
-- 不为空(年龄不为空)
where age is not null

-- 包含,相等,相似,在一个范围内
where university in ('a','b')
where university = 'a'
where university like 'a%'/* 以 a 开始*/
-- 定位价格在 3 美元到 6 美元之间
where price between 3 and 6

-- 不包含 
where university not in ('a','b')
where university != 'a'
where university not like 'a%'

-- or(找到学校为北大或GPA在3.7以上)
select * from user_profile 
where gpa>3.7 or university="北京大学"

-- 找到gpa在3.5以上(不包括3.5)的山东大学用户 或 gpa在3.8以上(不包括3.8)的复旦大学同学
select * from user_profile
where (university='山东大学' and gpa>3.5 )
or (university="复旦大学" and gpa>3.8);
```


### `GROUP BY` + `HAVING`
- 基于分组之后计算总量
```sql
select order_num
from OrderItems
group by order_num
having sum(quantity) >= 100

-- 多组分组，先基于性别后学校
group by gender, university
```


### `ORDER BY`
- `ASC`：升序，`DESC`：降序，**多属性联合排列**
```sql
select cust_id,order_num 
from Orders 
order by cust_id asc,order_date desc

select quantity,item_price
from OrderItems
-- 可以用1，2代替列名quantity,item_price
order by 1 desc,2 desc;
```


### `LIMIT`
- LIMIT 子句可以被用于强制 SELECT 语句返回指定的记录数。
  - LIMIT 接受一个或两个数字参数。参数必须是一个整数常量。
  - 如果只给定一个参数，它表示返回最大的记录行数目。
  - 如果给定两个参数，第一个参数指定第一个返回记录行的偏移量，第二个参数指定返回记录行的最大数目。
  - 为了检索从某一个偏移量到记录集的结束所有的记录行，可以指定第二个参数为 -1。

```sql
-- 记录行6-10
SELECT * FROM table LIMIT 5,5
-- 记录行11-last
SELECT * FROM table LIMIT 10,-1
-- 记录前五个
SELECT * FROM table LIMIT 5
```


## 进阶

### 子查询
- a表依据b表的结果查询
```sql
-- 多表结合
SELECT DISTINCT cust_id
FROM Orders
-- where和下一级的select的内容一致
WHERE order_num IN (
    SELECT order_num
    FROM OrderItems
    WHERE item_price >= 10
)

-- 两表分属两列
select
  prod_name,
  (
    select
      sum(quantity)
    from
      OrderItems b
    where
      a.prod_id = b.prod_id
  ) as quant_sold
from
  Products a
```