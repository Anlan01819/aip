import React, { useState } from 'react'
import { Plus, Building2, Users, ArrowRight } from 'lucide-react'
import { CreateOrganizationForm } from './CreateOrganizationForm'

// 组织数据接口
interface Organization {
  id: string
  name: string
  description: string
  totalProjects: number
  publicProjects: number
  latestProjects: string[]
}

export function OrganizationExplore() {
  const [showCreateForm, setShowCreateForm] = useState(false)

  // 模拟组织数据 - 与图片中的内容完全一致
  const organizations: Organization[] = [
    {
      id: '1',
      name: '22',
      description: '暂无描述',
      totalProjects: 0,
      publicProjects: 0,
      latestProjects: []
    },
    {
      id: '2',
      name: '米饭星球',
      description: '寻找喜欢吃米饭',
      totalProjects: 0,
      publicProjects: 0,
      latestProjects: []
    },
    {
      id: '3',
      name: '河北师范大学软件学院',
      description: '河北师范大学软件学院AI+PBL教学过程项目管理平台',
      totalProjects: 2,
      publicProjects: 2,
      latestProjects: ['AI智能自习室', '项目1']
    },
    {
      id: '4',
      name: '11',
      description: '暂无描述',
      totalProjects: 0,
      publicProjects: 0,
      latestProjects: []
    },
    {
      id: '5',
      name: 'AIP',
      description: '暂无描述',
      totalProjects: 1,
      publicProjects: 1,
      latestProjects: ['AIP']
    },
    {
      id: '6',
      name: 'AI医疗项目',
      description: 'AI医疗项目开发',
      totalProjects: 0,
      publicProjects: 0,
      latestProjects: []
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 页面标题和描述 */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">探索组织</h1>
          <p className="text-lg text-gray-600">
            浏览所有组织,发现感兴趣的项目并参与协作
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          + 创建组织
        </button>
      </div>

      {/* 组织卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
          >
            {/* 组织图标和成员按钮 */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Users className="h-4 w-4" />
              </button>
            </div>

            {/* 组织名称 */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{org.name}</h3>

            {/* 组织描述 */}
            <p className="text-gray-600 mb-6 text-sm">
              {org.description}
            </p>

            {/* 项目统计 */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{org.totalProjects}</div>
                <div className="text-gray-500 text-sm">项目总数</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{org.publicProjects}</div>
                <div className="text-gray-500 text-sm">公开项目</div>
              </div>
            </div>

            {/* 最新项目 */}
            {org.latestProjects.length > 0 && (
              <div className="mb-4">
                <h4 className="text-gray-700 text-sm font-medium mb-2">最新项目</h4>
                <div className="space-y-1">
                  {org.latestProjects.map((project, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {project}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 加入组织按钮 */}
            <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <ArrowRight className="h-4 w-4 mr-2" />
              加入组织
            </button>
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
