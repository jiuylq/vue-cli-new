module.exports = {
    description: '创建页面',
    prompts: [
        {
            type: 'list',
            name: 'type',
            message: '请选择页面类型',
            choices: ['default'],
            default: 'default'
        },
        {
            type: 'input',
            name: 'viewPath',
            message: '请输入页面存放路径(./views/???)',
            when: answers => {
                return answers.type == 'default'
            }
        },
        {
            type: 'input',
            name: 'name',
            message: '请输入页面名称',
            default: 'index',
            validate: v => {
                if (!v || v.trim === '') {
                    return '页面名称不能为空'
                } else {
                    return true
                }
            }
        }
    ],
    actions: data => {
        const path = data.type = `views/${data.viewPath}`
        console.log(path)
        const actions = [
            {
                type: 'add',
                path: `src/${path}/${data.name}.vue`,
                templateFile: 'plop-templates/default/index.hbs',
                data: {
                    name: data.name
                }
            }
        ]
        return actions
    }
}
