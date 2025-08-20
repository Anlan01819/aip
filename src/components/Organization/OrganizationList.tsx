import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Building2, Star, Users } from 'lucide-react'
import { CreateOrganizationForm } from './CreateOrganizationForm'

// 组织数据接口
interface Organization {
  id: string
  name: string
  description: string
  activeProjects: number
  completedProjects: number
  latestProjects: string[]
}

export function OrganizationList() {
  const [showCreateForm, setShowCreateForm] = useState(false)

  // 模拟组织数据 - 与图片中的内容完全一致
  const organizations: Organization[] = [
    {
      id: '1',
      name: 'AI创新科技公司',
      description: '专注于AI驱动的项目管理解决方案',
      activeProjects: 7,
      completedProjects: 0,
      latestProjects: ['bvv', 'mike分身']
    },
    {
      id: '2',
      name: '法治广场',
      description: '测试用的',
      activeProjects: 2,
      completedProjects: 0,
      latestProjects: ['bbbbbbb', 'cccc']
    },
    {
      id: '3',
      name: '大家不要新建组织了,去二阶段组织里新建项目',
      description: '暂无描述',
      activeProjects: 0,
      completedProjects: 0,
      latestProjects: []
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 页面标题和描述 */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">我的组织</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          管理你所属的组织,选择组织进入对应的工作台
        </p>
      </div>

      {/* 创建组织按钮 */}
      <div className="text-center mb-8">
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          + 创建新组织
        </button>
      </div>

      {/* 组织卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="bg-blue-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            {/* 组织图标 */}
            <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-lg mb-4">
              <Building2 className="h-6 w-6" />
            </div>

            {/* 组织名称 */}
            <h3 className="text-xl font-semibold mb-2">{org.name}</h3>

            {/* 组织描述 */}
            <p className="text-blue-100 mb-6 text-sm">
              {org.description}
            </p>

            {/* 项目统计 */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{org.activeProjects}</div>
                <div className="text-blue-100 text-sm">进行中项目</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{org.completedProjects}</div>
                <div className="text-blue-100 text-sm">已完成项目</div>
              </div>
            </div>

            {/* 最新项目 */}
            {org.latestProjects.length > 0 && (
              <div className="mb-6">
                <h4 className="text-blue-100 text-sm font-medium mb-2">最新项目</h4>
                <div className="space-y-1">
                  {org.latestProjects.map((project, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Star className="h-3 w-3 mr-2 text-yellow-300" />
                      <span>{project}</span>
                    </div>
                  ))}
                  {org.activeProjects > org.latestProjects.length && (
                    <div className="text-blue-100 text-sm">
                      +{org.activeProjects - org.latestProjects.length}个更多项目
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 进入工作台按钮 */}
            <Link
              to={`/projects/${org.id}`}
              className="block w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-center py-3 rounded-lg transition-colors"
            >
              点击进入 {org.name} 工作台
            </Link>
          </div>
        ))}
      </div>

      {/* 创建组织弹窗 */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <CreateOrganizationForm
              onClose={() => setShowCreateForm(false)}
              onSuccess={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      )}

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
