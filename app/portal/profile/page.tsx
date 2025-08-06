'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { User, Mail, Phone, Calendar, MapPin, Award, Clock, Settings } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-gray-600">Manage your account and maker progression</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Alex Martinez</h2>
                <p className="text-sm text-gray-600">Maker Level 3 • Operations Staff</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm">alex.martinez@popcycle.io</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Joined March 2023</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-medium mb-3">Access Permissions</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-purple-100 text-purple-700">Maker Profile</Badge>
                <Badge className="bg-green-100 text-green-700">Operations Dashboard</Badge>
                <Badge className="bg-blue-100 text-blue-700">Partner Reports (TechCorp)</Badge>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Maker Progression */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-purple-600" />
              <span>Maker Progress</span>
            </CardTitle>
            <CardDescription>Skills and achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Assembly Skills</span>
                  <span className="text-sm text-gray-600">Level 3</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Quality Control</span>
                  <span className="text-sm text-gray-600">Level 2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-1/2"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Teaching</span>
                  <span className="text-sm text-gray-600">Level 1</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t">
              <h4 className="font-medium mb-2">Recent Achievements</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-xs">Completed 50 Phone Stands</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-silver rounded-full"></div>
                  <span className="text-xs">Workshop Mentor Badge</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-bronze rounded-full"></div>
                  <span className="text-xs">Quality Inspector Certified</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-600" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>Your latest contributions and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <span className="font-medium text-sm">Completed 8 Phone Stands</span>
                <p className="text-xs text-gray-600">Assembly workshop - Batch BA-8472</p>
              </div>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <span className="font-medium text-sm">Mentored New Maker Workshop</span>
                <p className="text-xs text-gray-600">Teaching basic assembly techniques</p>
              </div>
              <span className="text-xs text-gray-500">5 days ago</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <span className="font-medium text-sm">Quality Control Check</span>
                <p className="text-xs text-gray-600">Reviewed 25 finished products</p>
              </div>
              <span className="text-xs text-gray-500">1 week ago</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <span className="font-medium text-sm">Pickup Route Coordination</span>
                <p className="text-xs text-gray-600">TechCorp and Green Solutions pickups</p>
              </div>
              <span className="text-xs text-gray-500">1 week ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}