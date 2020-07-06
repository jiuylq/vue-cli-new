# vue-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

https://juejin.im/post/5c3c544c6fb9a049d37f5903#heading-2
https://juejin.im/post/5cab64ce5188251b19486041#heading-5
https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C
https://juejin.im/post/5c4a6fcd518825469414e062#heading-22
https://juejin.im/post/5d130b9a518825670124a721#heading-6
https://juejin.im/post/5d8180f96fb9a06b04723363
https://blog.csdn.net/qq_39953537/article/details/102759821?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight


1、全局自动注册组件（完成）

2、axios请求封装（完成）

3、cdn（完成）

4、gzip（完成）

5、eventBus（完成）

6、路由守卫封装（完成）


```
<!-- cdn引用-暂时不用 -->
    <% if (process.env.NODE_ENV === 'production') { %>
      <% for(var css of htmlWebpackPlugin.options.cdn.css) { %>
        <link href="<%=css%>" rel="preload" as="style">
        <link rel="stylesheet" href="<%=css%>" as="style">
      <% } %>
      <% for(var js of htmlWebpackPlugin.options.cdn.js) { %>
        <link href="<%=js%>" rel="preload" as="script">
        <script src="<%=js%>"></script>
      <% } %>
    <% } %>
```