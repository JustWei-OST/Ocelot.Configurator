# Ocelot演示项目

### 子项目：
- ApiGateway: 网关 （端口：5000）
- 服务Api项目
  - Api.Product:（端口：5001）
  - Api.User: （端口：5002）

### 网关启用的功能：
- 启用了Butterfly Tracing
- 启用了Administration Api
- 启用了Cors


### 启动方式：

- 1。先启动两个Api服务项目
- 2。再启动网关项目

分别访问以下URL:

- http://localhost:5000/api/users
- http://localhost:5000/api/products

Administration基地址
http://localhost:5000/administration

### 测试
启动三个项目后，可以将 Ocelot.postman_collection.json 文件导入到[postman](https://www.getpostman.com/)中进行测试