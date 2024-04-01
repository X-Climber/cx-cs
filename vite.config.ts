import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"

export default (configEnv: ConfigEnv): UserConfigExport => {

    return {
        build: {
            rollupOptions: {
                output: {
                  /**
                   * 分块策略
                   * 1. 注意这些包名必须存在，否则打包会报错
                   * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
                   */
                  manualChunks: {
                    vue: ["vue", "vue-router", "pinia"],
                    element: ["element-plus", "@element-plus/icons-vue"],
                    vxe: ["vxe-table", "vxe-table-plugin-element", "xe-utils"]
                  }
                }
              }
        },
        plugins: [vue()]
    }
}