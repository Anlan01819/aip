import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Building2, Users, FileText, Loader2 } from 'lucide-react'

interface CreateOrganizationFormProps {
  onSuccess?: (organizationId: string) => void
  onCancel?: () => void
}

export function CreateOrganizationForm({ onSuccess, onCancel }: CreateOrganizationFormProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError('')

    try {
      // 创建组织
      const { data: organization, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: formData.name,
          description: formData.description
        })
        .select()
        .single()

      if (orgError) throw orgError

      // 更新用户的组织ID和角色
      const { error: userError } = await supabase
        .from('users')
        .update({
          organization_id: organization.id,
          role_in_org: 'admin'
        })
        .eq('id', user.id)

      if (userError) throw userError

      onSuccess?.(organization.id)
    } catch (err: any) {
      setError(err.message || '创建组织失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
          <Building2 className="h-6 w-6 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-secondary-900 mb-2">
          创建组织
        </h2>
        <p className="text-secondary-600">
          建立您的团队，开始协作项目
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            组织名称 *
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
            <input
              type="text"
              required
              className="input pl-10"
              placeholder="请输入组织名称"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            组织描述
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-secondary-400" />
            <textarea
              className="input pl-10 min-h-[80px] resize-none"
              placeholder="简要描述您的组织（可选）"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-colors"
            >
              取消
            </button>
          )}
          <button
            type="submit"
            disabled={loading || !formData.name.trim()}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                创建中...
              </>
            ) : (
              <>
                <Users className="h-4 w-4" />
                创建组织
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}