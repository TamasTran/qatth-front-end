import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Edit2, Eye, Copy, Check, X, Plus } from 'lucide-react'

interface CVTemplate {
  id: string
  name: string
  description: string
  color: string
  preview: string
}

interface CVData {
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
  experience: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
  education: Array<{
    school: string
    degree: string
    field: string
    year: string
  }>
  skills: string[]
}

const templates: CVTemplate[] = [
  {
    id: 'modern',
    name: 'Modern Blue',
    description: 'Thiết kế hiện đại với màu xanh dương chuyên nghiệp',
    color: 'from-brand-600 to-brand-700',
    preview: '📘'
  },
  {
    id: 'elegant',
    name: 'Elegant Minimal',
    description: 'Thiết kế tối giản, thanh lịch với phối màu trung tính',
    color: 'from-slate-700 to-slate-800',
    preview: '🎩'
  },
  {
    id: 'creative',
    name: 'Creative Red',
    description: 'Thiết kế sáng tạo với màu đỏ nổi bật',
    color: 'from-accent-600 to-accent-700',
    preview: '🎨'
  },
  {
    id: 'tech',
    name: 'Tech Dark',
    description: 'Thiết kế công nghệ với giao diện tối',
    color: 'from-slate-900 to-slate-950',
    preview: '💻'
  },
  {
    id: 'ocean',
    name: 'Ocean Wave',
    description: 'Thiết kế tươi mới với gradient xanh biển',
    color: 'from-cyan-500 to-blue-600',
    preview: '🌊'
  },
  {
    id: 'sunset',
    name: 'Sunset Gold',
    description: 'Thiết kế ấm áp với gradient vàng cam',
    color: 'from-amber-500 to-orange-600',
    preview: '🌅'
  },
  {
    id: 'forest',
    name: 'Forest Green',
    description: 'Thiết kế tự nhiên với gradient xanh lá',
    color: 'from-emerald-600 to-green-700',
    preview: '🌲'
  },
  {
    id: 'purple',
    name: 'Purple Dream',
    description: 'Thiết kế hiện đại với gradient tím',
    color: 'from-purple-600 to-pink-600',
    preview: '💜'
  },
]

const defaultCVData: CVData = {
  fullName: 'Tên của bạn',
  email: 'email@example.com',
  phone: '+84 123 456 789',
  location: 'Thành phố, Quốc gia',
  summary: 'Chuyên gia với kinh nghiệm trong lĩnh vực công nghệ thông tin. Có khả năng giải quyết vấn đề tốt và làm việc nhóm hiệu quả.',
  experience: [
    {
      company: 'Công ty ABC',
      position: 'Senior Developer',
      duration: '2022 - Hiện tại',
      description: 'Phát triển ứng dụng web, quản lý dự án, hướng dẫn junior developers'
    },
    {
      company: 'Công ty XYZ',
      position: 'Developer',
      duration: '2020 - 2022',
      description: 'Phát triển backend API, tối ưu hóa hiệu năng, fix bugs'
    }
  ],
  education: [
    {
      school: 'Đại học Công nghệ',
      degree: 'Cử nhân',
      field: 'Công nghệ thông tin',
      year: '2020'
    }
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'SQL', 'Git', 'Docker']
}

export default function CVBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern')
  const [cvData, setCVData] = useState<CVData>(defaultCVData)
  const [isEditing, setIsEditing] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [copied, setCopied] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const [editingExp, setEditingExp] = useState<number | null>(null)
  const [editingEdu, setEditingEdu] = useState<number | null>(null)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>CV - ${cvData.fullName}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; line-height: 1.6; }
          .header { background: linear-gradient(135deg, #475569 0%, #334155 100%); color: white; padding: 20px; margin: -20px -20px 20px -20px; }
          .header h2 { margin: 0; font-size: 28px; }
          .header p { margin: 5px 0; opacity: 0.9; }
          .section { margin-bottom: 20px; }
          .section h3 { border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; margin-bottom: 15px; color: #1e293b; }
          .entry { margin-bottom: 15px; }
          .entry-title { font-weight: bold; color: #1e293b; }
          .entry-subtitle { color: #64748b; }
          .entry-meta { font-size: 12px; color: #64748b; }
          .skills { display: flex; flex-wrap: wrap; gap: 8px; }
          .skill-tag { background: #e2e8f0; color: #475569; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>${cvData.fullName}</h2>
          <p>${cvData.location}</p>
          <p>${cvData.email} | ${cvData.phone}</p>
        </div>
        
        <div class="section">
          <h3>Tóm Tắt</h3>
          <p>${cvData.summary}</p>
        </div>
        
        <div class="section">
          <h3>Kinh Nghiệm Làm Việc</h3>
          ${cvData.experience.map(exp => `
            <div class="entry">
              <div style="display: flex; justify-content: space-between;">
                <div>
                  <div class="entry-title">${exp.position}</div>
                  <div class="entry-subtitle">${exp.company}</div>
                </div>
                <div class="entry-meta">${exp.duration}</div>
              </div>
              <p style="margin: 5px 0; color: #475569; font-size: 14px;">${exp.description}</p>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <h3>Học Vấn</h3>
          ${cvData.education.map(edu => `
            <div class="entry">
              <div class="entry-title">${edu.degree} - ${edu.field}</div>
              <div class="entry-subtitle">${edu.school}</div>
              <div class="entry-meta">${edu.year}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <h3>Kỹ Năng</h3>
          <div class="skills">
            ${cvData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        </div>
      </body>
      </html>
    `
    
    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `CV_${cvData.fullName.replace(/\s+/g, '_')}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setCVData({ ...cvData, skills: [...cvData.skills, newSkill.trim()] })
      setNewSkill('')
    }
  }

  const removeSkill = (index: number) => {
    setCVData({ ...cvData, skills: cvData.skills.filter((_, i) => i !== index) })
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const newExp = [...cvData.experience]
    newExp[index] = { ...newExp[index], [field]: value }
    setCVData({ ...cvData, experience: newExp })
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const newEdu = [...cvData.education]
    newEdu[index] = { ...newEdu[index], [field]: value }
    setCVData({ ...cvData, education: newEdu })
  }

  const template = templates.find(t => t.id === selectedTemplate)

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-700 to-brand-600 bg-clip-text text-transparent mb-3">
          Tạo CV Chuyên Nghiệp
        </h1>
        <p className="text-brand-700 text-lg max-w-2xl mx-auto">
          Chọn template yêu thích và tạo CV của bạn trong vài phút. Tất cả template đều được thiết kế chuyên nghiệp.
        </p>
      </motion.div>

      {/* Template Selection */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 border border-brand-200/60 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-brand-900 mb-6">Chọn Template</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {templates.map((tmpl) => (
            <motion.button
              key={tmpl.id}
              onClick={() => setSelectedTemplate(tmpl.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedTemplate === tmpl.id
                  ? 'border-brand-600 bg-brand-50 shadow-md'
                  : 'border-brand-200/60 bg-white hover:border-brand-300'
              }`}
            >
              <div className={`text-5xl mb-3 bg-gradient-to-r ${tmpl.color} bg-clip-text text-transparent`}>
                {tmpl.preview}
              </div>
              <h3 className="font-bold text-brand-900 mb-1">{tmpl.name}</h3>
              <p className="text-sm text-brand-700">{tmpl.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Editor Panel */}
        {!isPreview && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 border border-brand-200/60 shadow-sm">
              <h3 className="text-lg font-bold text-brand-900 mb-4">Thông Tin Cá Nhân</h3>

              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={cvData.fullName}
                    onChange={(e) => setCVData({ ...cvData, fullName: e.target.value })}
                    placeholder="Họ và tên"
                    className="w-full px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 placeholder-slate-400 bg-white"
                  />
                  <input
                    type="email"
                    value={cvData.email}
                    onChange={(e) => setCVData({ ...cvData, email: e.target.value })}
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 placeholder-slate-400 bg-white"
                  />
                  <input
                    type="tel"
                    value={cvData.phone}
                    onChange={(e) => setCVData({ ...cvData, phone: e.target.value })}
                    placeholder="Số điện thoại"
                    className="w-full px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 placeholder-slate-400 bg-white"
                  />
                  <input
                    type="text"
                    value={cvData.location}
                    onChange={(e) => setCVData({ ...cvData, location: e.target.value })}
                    placeholder="Địa điểm"
                    className="w-full px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 placeholder-slate-400 bg-white"
                  />
                  <textarea
                    value={cvData.summary}
                    onChange={(e) => setCVData({ ...cvData, summary: e.target.value })}
                    placeholder="Tóm tắt chuyên môn"
                    rows={4}
                    className="w-full px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 placeholder-slate-400 bg-white"
                  />
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-brand-900">{cvData.fullName}</p>
                  <p className="text-brand-700">{cvData.email}</p>
                  <p className="text-brand-700">{cvData.phone}</p>
                  <p className="text-brand-700">{cvData.location}</p>
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl p-6 border border-brand-200/60 shadow-sm">
              <h3 className="text-lg font-bold text-brand-900 mb-4">Kỹ Năng</h3>
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      placeholder="Thêm kỹ năng..."
                      className="flex-1 px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 placeholder-slate-400 bg-white"
                    />
                    <button
                      onClick={addSkill}
                      className="btn btn-primary px-3 py-2"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cvData.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-1 px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium">
                        <span>{skill}</span>
                        <button
                          onClick={() => removeSkill(i)}
                          className="hover:text-brand-900 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {cvData.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Preview Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={isPreview ? 'lg:col-span-3' : 'lg:col-span-2'}
        >
          <div className="bg-white rounded-2xl border border-brand-200/60 shadow-sm overflow-hidden">
            {/* Preview Header */}
            <div className={`bg-gradient-to-r ${template?.color} p-6 text-white flex items-start justify-between`}>
              <div>
                <h2 className="text-3xl font-bold">{cvData.fullName}</h2>
                <p className="text-white/90">{cvData.location}</p>
                <div className="text-sm mt-2">
                  <p>{cvData.email}</p>
                  <p>{cvData.phone}</p>
                </div>
              </div>
              {!isPreview && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1 px-3 py-1 text-xs text-white bg-white/20 border border-white/50 rounded-lg hover:bg-white/30 transition-all flex-shrink-0"
                >
                  <Edit2 size={14} />
                  <span className="font-medium">{isEditing ? 'Xong' : 'Sửa'}</span>
                </button>
              )}
            </div>

            {/* Preview Content */}
            <div id="cv-preview" className="p-8 space-y-6">
              {/* Summary */}
              <div>
                <h3 className="text-lg font-bold text-brand-900 mb-2 border-b-2 border-brand-300 pb-2">Tóm Tắt</h3>
                <p className="text-brand-700">{cvData.summary}</p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-lg font-bold text-brand-900 mb-4 border-b-2 border-brand-300 pb-2">Kinh Nghiệm Làm Việc</h3>
                <div className="space-y-4">
                  {cvData.experience.map((exp, i) => (
                    <div key={i} className={isEditing ? 'p-3 border border-brand-200 rounded-lg bg-brand-50/30' : ''}>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => updateExperience(i, 'position', e.target.value)}
                            placeholder="Vị trí"
                            className="w-full px-2 py-1 border border-brand-200 rounded text-slate-900 placeholder-slate-400 bg-white text-sm"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(i, 'company', e.target.value)}
                            placeholder="Công ty"
                            className="w-full px-2 py-1 border border-brand-200 rounded text-slate-900 placeholder-slate-400 bg-white text-sm"
                          />
                          <input
                            type="text"
                            value={exp.duration}
                            onChange={(e) => updateExperience(i, 'duration', e.target.value)}
                            placeholder="Thời gian (2022 - 2023)"
                            className="w-full px-2 py-1 border border-brand-200 rounded text-slate-900 placeholder-slate-400 bg-white text-sm"
                          />
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(i, 'description', e.target.value)}
                            placeholder="Mô tả công việc"
                            rows={2}
                            className="w-full px-2 py-1 border border-brand-200 rounded text-slate-900 placeholder-slate-400 bg-white text-sm"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-brand-900">{exp.position}</p>
                              <p className="text-brand-700">{exp.company}</p>
                            </div>
                            <p className="text-sm text-brand-600">{exp.duration}</p>
                          </div>
                          <p className="text-brand-700 text-sm mt-1">{exp.description}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-lg font-bold text-brand-900 mb-4 border-b-2 border-brand-300 pb-2">Học Vấn</h3>
                <div className="space-y-3">
                  {cvData.education.map((edu, i) => (
                    <div key={i} className={isEditing ? 'p-3 border border-brand-200 rounded-lg bg-brand-50/30' : ''}>
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => updateEducation(i, 'school', e.target.value)}
                            placeholder="Trường học"
                            className="w-full px-2 py-1 border border-brand-200 rounded text-slate-900 placeholder-slate-400 bg-white text-sm"
                          />
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(i, 'degree', e.target.value)}
                            placeholder="Bằng cấp (Cử nhân, Thạc sĩ...)"
                            className="w-full px-2 py-1 border border-brand-200 rounded text-slate-900 placeholder-slate-400 bg-white text-sm"
                          />
                          <input
                            type="text"
                            value={edu.field}
                            onChange={(e) => updateEducation(i, 'field', e.target.value)}
                            placeholder="Chuyên ngành"
                            className="w-full px-2 py-1 border border-brand-200 rounded text-slate-900 placeholder-slate-400 bg-white text-sm"
                          />
                          <input
                            type="text"
                            value={edu.year}
                            onChange={(e) => updateEducation(i, 'year', e.target.value)}
                            placeholder="Năm tốt nghiệp"
                            className="w-full px-2 py-1 border border-brand-200 rounded text-slate-900 placeholder-slate-400 bg-white text-sm"
                          />
                        </div>
                      ) : (
                        <>
                          <p className="font-bold text-brand-900">{edu.degree} - {edu.field}</p>
                          <p className="text-brand-700">{edu.school}</p>
                          <p className="text-sm text-brand-600">{edu.year}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-bold text-brand-900 mb-3 border-b-2 border-brand-300 pb-2">Kỹ Năng</h3>
                <div className="flex flex-wrap gap-2">
                  {cvData.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 flex-wrap">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="btn btn-ghost ring-focus flex-1"
            >
              <Eye size={18} />
              {isPreview ? 'Chỉnh sửa' : 'Xem toàn màn hình'}
            </button>
            <button
              onClick={handleCopy}
              className="btn btn-ghost ring-focus flex-1"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Đã sao chép' : 'Sao chép'}
            </button>
            <button
              onClick={handleDownload}
              className="btn btn-primary ring-focus flex-1"
            >
              <Download size={18} />
              Tải xuống PDF
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
