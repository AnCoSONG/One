import { ElMessage, ElIcon,ElInput, ElForm, ElPagination} from 'element-plus'
import 'element-plus/lib/theme-chalk/el-icon.css'
// import 'element-plus/lib/theme-chalk/el-message.css'
import 'element-plus/lib/theme-chalk/el-pagination.css'

import { App } from 'vue'

export default function(app: App) {
    app.use(ElPagination)
    app.use(ElIcon)
    app.use(ElInput)
    app.use(ElForm)
}