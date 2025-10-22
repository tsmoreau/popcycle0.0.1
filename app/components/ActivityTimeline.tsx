'use client'

import { useState } from 'react'
import { Plus, Phone, Mail, Calendar, MessageSquare, CheckSquare, X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'

interface Activity {
  id: string
  type: 'email' | 'call' | 'meeting' | 'note' | 'task'
  date: Date
  subject: string
  notes: string
  outcome?: string
  nextAction?: string
  nextActionDate?: Date
  userId?: string
}

interface ActivityTimelineProps {
  activities: Activity[]
  onAddActivity: (activity: Omit<Activity, 'id'>) => void
  onUpdateLastContact?: (date: Date) => void
  readOnly?: boolean
}

export default function ActivityTimeline({ activities = [], onAddActivity, onUpdateLastContact, readOnly = false }: ActivityTimelineProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newActivity, setNewActivity] = useState<Omit<Activity, 'id'>>({
    type: 'note',
    date: new Date(),
    subject: '',
    notes: '',
    outcome: '',
    nextAction: '',
    nextActionDate: undefined,
    userId: ''
  })

  const handleSubmit = () => {
    if (!newActivity.subject || !newActivity.notes) return
    
    onAddActivity(newActivity)
    if (onUpdateLastContact && newActivity.type !== 'task') {
      onUpdateLastContact(newActivity.date)
    }
    
    // Reset form
    setNewActivity({
      type: 'note',
      date: new Date(),
      subject: '',
      notes: '',
      outcome: '',
      nextAction: '',
      nextActionDate: undefined,
      userId: ''
    })
    setShowAddForm(false)
  }

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />
      case 'call': return <Phone className="h-4 w-4" />
      case 'meeting': return <Calendar className="h-4 w-4" />
      case 'note': return <MessageSquare className="h-4 w-4" />
      case 'task': return <CheckSquare className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'email': return 'bg-blue-500'
      case 'call': return 'bg-pop-green'
      case 'meeting': return 'bg-purple-500'
      case 'note': return 'bg-gray-500'
      case 'task': return 'bg-orange-500'
    }
  }

  const sortedActivities = [...activities].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Activity Timeline</h3>
        {!readOnly && (
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            variant="outline"
            size="sm"
            data-testid="button-add-activity"
          >
            {showAddForm ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            {showAddForm ? 'Cancel' : 'Log Activity'}
          </Button>
        )}
      </div>

      {showAddForm && (
        <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Activity Type</label>
              <select
                value={newActivity.type}
                onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value as Activity['type'] })}
                className="w-full border rounded px-3 py-2 text-sm"
                data-testid="select-activity-type"
              >
                <option value="note">Note</option>
                <option value="call">Phone Call</option>
                <option value="email">Email</option>
                <option value="meeting">Meeting</option>
                <option value="task">Task</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <Input
                type="date"
                value={newActivity.date instanceof Date ? newActivity.date.toISOString().split('T')[0] : ''}
                onChange={(e) => setNewActivity({ ...newActivity, date: new Date(e.target.value) })}
                className="text-sm"
                data-testid="input-activity-date"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Subject</label>
            <Input
              value={newActivity.subject}
              onChange={(e) => setNewActivity({ ...newActivity, subject: e.target.value })}
              placeholder="Brief description..."
              className="text-sm"
              data-testid="input-activity-subject"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Notes</label>
            <Textarea
              value={newActivity.notes}
              onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
              placeholder="Detailed notes about this interaction..."
              rows={3}
              className="text-sm"
              data-testid="textarea-activity-notes"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Outcome (Optional)</label>
              <Input
                value={newActivity.outcome || ''}
                onChange={(e) => setNewActivity({ ...newActivity, outcome: e.target.value })}
                placeholder="e.g., Left voicemail, Interested, etc."
                className="text-sm"
                data-testid="input-activity-outcome"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Next Action (Optional)</label>
              <Input
                value={newActivity.nextAction || ''}
                onChange={(e) => setNewActivity({ ...newActivity, nextAction: e.target.value })}
                placeholder="e.g., Follow up on proposal"
                className="text-sm"
                data-testid="input-activity-next-action"
              />
            </div>
          </div>

          {newActivity.nextAction && (
            <div>
              <label className="text-sm font-medium mb-1 block">Next Action Date</label>
              <Input
                type="date"
                value={newActivity.nextActionDate instanceof Date ? newActivity.nextActionDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setNewActivity({ ...newActivity, nextActionDate: new Date(e.target.value) })}
                className="text-sm"
                data-testid="input-activity-next-action-date"
              />
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={!newActivity.subject || !newActivity.notes}
            className="w-full bg-pop-green hover:bg-pop-green/90"
            data-testid="button-save-activity"
          >
            Save Activity
          </Button>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-3">
        {sortedActivities.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm border rounded-lg bg-gray-50">
            No activities logged yet. Click "Log Activity" to add your first interaction.
          </div>
        ) : (
          sortedActivities.map((activity) => (
            <div key={activity.id} className="flex gap-3 border-l-2 border-gray-300 pl-4 pb-3" data-testid={`activity-${activity.id}`}>
              <div className={`${getActivityColor(activity.type)} text-white rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-sm">{activity.subject}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {new Date(activity.date).toLocaleDateString()} at {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mt-2">{activity.notes}</p>
                {activity.outcome && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium text-gray-600">Outcome:</span> {activity.outcome}
                  </div>
                )}
                {activity.nextAction && (
                  <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded p-2 text-sm">
                    <span className="font-medium text-yellow-900">Next Action:</span> {activity.nextAction}
                    {activity.nextActionDate && (
                      <span className="text-yellow-700 ml-2">
                        ({new Date(activity.nextActionDate).toLocaleDateString()})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
