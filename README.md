# 移动端

本分支用于支持移动端开发

集合以下功能：


1、全局自动注册组件（完成）

2、axios请求封装（完成）

3、cdn（完成）

4、gzip（完成）

5、eventBus（完成）当前的封装感觉有点。。。，看个人用法

6、路由守卫封装（完成）

8、采用rem进行页面适配（如有需其它适配方式请自行修改）配置文件在postcss.config.js中，main中引入`amfe-flexible`

9、引入了fastclick 解决移动端点击300ms问题

10、采用better-scroll（2）封装了滚动组件集合down/up (开发中)

11、基于better-scroll（2）封装了个index-list联动滚动组件 （开发中）

12、封装from表单组件集合校验功能 （开发中）

13、封装常用的ui组件（radio，checkbox, switch, slide, swipper, picker，image-preview）等 （开发中）

14、引入vue-lazyload图片懒加载插件


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