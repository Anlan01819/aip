import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, Users, Globe, CheckCircle, Clock, Users2 } from 'lucide-react'

// 项目数据接口
interface Project {
  id: string
  title: string
  description: string
  date: string
  status: 'completed' | 'in_progress' | 'recruiting'
  isTeamProject: boolean
  isPublicProject: boolean
}

export function ProjectList() {
  const { orgId } = useParams<{ orgId: string }>()
  const [showCreateForm, setShowCreateForm] = useState(false)

  // 模拟项目数据 - 与图片中的内容完全一致
  const projects: Project[] = [
    {
      id: '1',
      title: 'AI伙食官',
      description: '菜单申报、AI规划、采购清单、值班分工、支出结算和公告提醒',
      date: '8月14',
      status: 'completed',
      isTeamProject: true,
      isPublicProject: true
    },
    {
      id: '2',
      title: '卡牌游戏平台',
      description: '基于Web的卡牌游戏平台，支持多种游戏模式',
      date: '8月15',
      status: 'in_progress',
      isTeamProject: true,
      isPublicProject: true
    },
    {
      id: '3',
      title: '统计基础教学软件',
      description: '为统计学基础课程开发的教学辅助软件',
      date: '8月16',
      status: 'in_progress',
      isTeamProject: true,
      isPublicProject: true
    },
    {
      id: '4',
      title: '慧视官网上线',
      description: '慧视科技官方网站的设计与开发',
      date: '8月17',
      status: 'completed',
      isTeamProject: true,
      isPublicProject: true
    },
    {
      id: '5',
      title: '易弗YouTube视频下载器项目-专业版v2.0',
      description: '功能强大的YouTube视频下载工具',
      date: '8月18',
      status: 'recruiting',
      isTeamProject: true,
      isPublicProject: true
    },
    {
      id: '6',
      title: '小惠:一键批量下载YouTube视频的网站',
      description: '支持批量下载YouTube视频的Web应用',
      date: '8月19',
      status: 'in_progress',
      isTeamProject: true,
      isPublicProject: true
    },
    {
      id: '7',
      title: '自动生成AI视频发油管',
      description: '使用AI技术自动生成视频内容并发布到YouTube',
      date: '8月20',
      status: 'recruiting',
      isTeamProject: true,
      isPublicProject: true
    },
    {
      id: '8',
      title: 'convai数字人网页端',
      description: '数字人技术的Web端应用开发',
      date: '8月21',
      status: 'in_progress',
      isTeamProject: true,
      isPublicProject: true
    }
  ]

  // 状态标签组件
  const StatusTag = ({ status }: { status: Project['status'] }) => {
    const statusConfig = {
      completed: {
        label: '已完成',
        className: 'bg-gray-100 text-gray-700'
      },
      in_progress: {
        label: '进行中',
        className: 'bg-green-100 text-green-700'
      },
      recruiting: {
        label: '招募中',
        className: 'bg-green-100 text-green-700'
      }
    }

    const config = statusConfig[status]
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 左侧边栏 */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="flex-1 p-4">
          {/* 侧边栏内容 */}
          <div className="space-y-4">
            <div className="text-sm text-gray-400">组织项目</div>
            <div className="text-xs text-gray-500">您尚未参与的组织项目</div>
          </div>
        </div>
        {/* 调整大小的手柄 */}
        <div className="h-1 bg-gray-700 cursor-ns-resize"></div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部横幅 */}
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
          <div className="text-gray-600">
            暂无任务,点击上万+号添加
          </div>
        </div>

        {/* 项目列表标题 */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            组织项目 ({projects.length})
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            您尚未参与的组织项目
          </p>
        </div>

        {/* 项目网格 */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                {/* 项目标题 */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {project.title}
                </h3>

                {/* 项目描述 */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* 项目元信息 */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">{project.date}</span>
                  <div className="flex items-center space-x-1">
                    {project.isTeamProject && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Users2 className="h-3 w-3 mr-1" />
                        团队项目
                      </div>
                    )}
                    {project.isPublicProject && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Globe className="h-3 w-3 mr-1" />
                        公开项目
                      </div>
                    )}
                  </div>
                </div>

                {/* 状态标签 */}
                <div className="flex justify-between items-center">
                  <StatusTag status={project.status} />
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 浮动操作按钮 */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => setShowCreateForm(true)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
